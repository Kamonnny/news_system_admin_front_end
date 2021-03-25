<template>
  <a-page-header
    :title="$route.meta.title"
    :sub-title="$route.meta.subTitle"
    style="background: #fff"
    @back="() => $router.go(-1)"
  >
    <template #extra>
      <a-input-search style="min-width: 240px"
        placeholder="搜索评论，请输入新闻标题"
        v-model:value="searchKey"
        @search="fetchComment"
      />
    </template>
  </a-page-header>

  <div class="main-container">
    <a-table
      :dataSource="comments"
      :pagination="pagination"
      :loading="loading"
      :columns="columns"
      rowKey="comment_id"
      @change="onChange"
    >
      <template #operation="{ record }">
        <a-popconfirm title="确认删除?" @confirm="onDelete(record.comment_id)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script lang=ts>
import { defineComponent, onMounted, ref, reactive } from 'vue'
import { GetCommentParams, getComment, deleteComment } from '@/api/comment'
import { message } from 'ant-design-vue'

interface PaginationChange {
  current: number
  pageSize: number
}

export default defineComponent({
  name: 'Comment',
  setup() {
    const columns = [
      {
        title: '新闻',
        dataIndex: 'news',
      },
      {
        title: '用户',
        dataIndex: 'username',
      },
      {
        title: '评论',
        dataIndex: 'comment',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
      },
    ]

    const comments = ref([])
    const loading = ref(false)
    const searchKey = ref('')
    const total = ref(0)
    const current = ref(1)

    const params = reactive<GetCommentParams>({
      page: 1,
      size: 10,
    })

    const pagination = reactive({
      total,
      current,
      showQuickJumper: true,
      showSizeChanger: true,
      defaultPageSize: 10,
      pageSizeOptions: ['5', '10', '20', '50'],
      showTotal: (total: number) => `共 ${total} 条数据`,
    })

    const fetchComment = async () => {
      loading.value = true
      if (searchKey.value === '') {
        delete params.filter
      } else {
        params.filter = searchKey.value
      }
      const data = await getComment(params)
      total.value = data.total
      comments.value = data.items
      loading.value = false
    }

    onMounted(() => fetchComment())

    const onDelete = async (commentId: number) => {
      const hide = message.loading('删除评论', 0)
      try {
        await deleteComment(commentId)
        hide()
        message.success('删除成功')
        await fetchComment()
      } catch (error) {
        hide()
      }
    }

    const onChange = async (thePagination: PaginationChange) => {
      pagination.current = thePagination.current
      params.page = thePagination.current
      params.size = thePagination.pageSize
      fetchComment()
    }

    return {
      columns,
      comments,
      loading,
      searchKey,
      pagination,
      onDelete,
      onChange,
      fetchComment
    }
  },
})
</script>

<style>
</style>
