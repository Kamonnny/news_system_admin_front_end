<template>
  <a-page-header
    :title="$route.meta.title"
    :sub-title="$route.meta.subTitle"
    style="background: #fff"
    @back="() => $router.go(-1)"
  >
    <template #extra>
      <a-space size="small">
        <a-button type="primary" @click="showModal()"> 添加标签 </a-button>
      </a-space>
    </template>
  </a-page-header>

  <div class="main-container">
    <a-table :dataSource="tags" :pagination="false" :columns="columns">
      <template #operation="{ record }">
        <a @click="showModal(true, record.tag_id, record.tag)">修改</a>&nbsp;
        <a-popconfirm title="确认删除?" @confirm="onDelete(record.tag_id)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>

  <a-modal
    v-model:visible="visible"
    width="900px"
    :title="isEdit ? '修改标签' : '新增标签'"
    @ok="onOk()"
    :confirmLoading="confirmLoading"
  >
    <a-form :wrapper-col="{ span: 14 }" :label-col="{ span: 4 }">
      <a-form-item label="标签" name="tag">
        <a-input v-model:value="tag" placeholder="请输入标签" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang=ts>
import { defineComponent, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { deleteTag, getTags } from '@/api/tag'

interface Tags {
  tag: string
  tag_id: number
  create_time: string
  update_time: string
}

export default defineComponent({
  name: 'Tag',
  setup() {
    const tag = ref('')
    const tags = ref<Tags[]>([])

    const visible = ref(false)
    const confirmLoading = ref(false)

    const isEdit = ref(false)
    const theTagId = ref(0)

    const columns = [
      {
        title: '标签',
        dataIndex: 'tag',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'tag_id',
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        key: 'tag_id',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
      },
    ]

    const fetchTags = async () => {
      const data = await getTags()
      tags.value = data.items
    }

    onMounted(() => fetchTags())

    const onDelete = async (tag_id: number) => {
      const hide = message.loading('删除标签', 0)
      try {
        await deleteTag(tag_id)
        await fetchTags()
        hide()
        message.success('删除成功')
      } catch (error) {
        hide()
      }
    }

    const showModal = (
      edit: boolean = false,
      tagId: number = 0,
      value: string = ''
    ) => {
      isEdit.value = edit
      theTagId.value = tagId
      tag.value = value
      visible.value = true
    }

    return {
      tag,
      tags,
      isEdit,
      visible,
      confirmLoading,
      columns,
      onDelete,
      showModal,
    }
  },
})
</script>

<style>
</style>
