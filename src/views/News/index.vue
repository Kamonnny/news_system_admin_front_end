<template>
  <a-page-header
    :title="$route.meta.title"
    :sub-title="$route.meta.subTitle"
    style="background: #fff"
    @back="() => $router.go(-1)"
  >
    <template #extra>
      <a-space size="small">
        <a-input-search
          placeholder="搜索新闻"
          v-model:value="searchKey"
          @search="onSearch"
        />
        <a-button type="primary" @click="showModal()"> 添加新闻 </a-button>
      </a-space>
    </template>
  </a-page-header>

  <div class="main-container">
    <a-table
      :dataSource="news"
      :loading="loading"
      :columns="columns"
      :pagination="pagination"
      rowKey="news_id"
      @change="onChange"
    >
      <template #operation="{ record }">
        <a @click="showModal(true, record.news_id)">修改</a>&nbsp;
        <a-popconfirm title="确认删除?" @confirm="onDeleteNews(record.news_id)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>

  <a-modal
    v-model:visible="visible"
    width="900px"
    :title="isEdit ? '修改新闻' : '新增新闻'"
    @ok="onOk"
    :confirmLoading="confirmLoading"
  >
    <a-form :model="form" :wrapper-col="{ span: 14 }" :label-col="{ span: 4 }">
      <a-form-item label="新闻">
        <a-input v-model:value="form.title" placeholder="请输入新闻标题" />
      </a-form-item>
      <a-form-item label="标签">
        <a-select v-model:value="form.tag_id" placeholder="请选择新闻标签">
          <a-select-option
            v-for="item in tags"
            :value="item.tag_id"
            :key="item.tag_id"
          >
            {{ item.tag }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="内容">
        <a-textarea
          v-model:value="form.content"
          placeholder="请输入新闻内容"
          :rows="8"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang=ts>
import { defineComponent, onMounted } from 'vue'
import { table } from '@/views/News/hook/table'
import { getNewsHook, deleteNewsHook } from '@/views/News/hook/news'
import { modal } from '@/views/News/hook/modal'

export default defineComponent({
  name: 'News',
  setup() {
    const {
      isEdit,
      visible,
      form,
      tags,
      confirmLoading,
      showModal,
      fetchTags,
    } = modal()
    const { getNewsParams, news, searchKey, fetchNews } = getNewsHook()
    const { columns, loading, pagination, total, onChange } = table(
      fetchNews,
      getNewsParams
    )
    const { onDeleteNews } = deleteNewsHook(fetchNews, loading, total)

    onMounted(() => {
      fetchNews(loading, total)
      fetchTags()
    })
    const onSearch = () => fetchNews(loading, total)

    return {
      columns,
      news,
      searchKey,
      pagination,
      loading,
      isEdit,
      visible,
      form,
      tags,
      confirmLoading,
      onChange,
      onSearch,
      onDeleteNews,
      showModal,
    }
  },
})
</script>

