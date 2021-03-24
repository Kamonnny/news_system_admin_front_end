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
        <a @click="showModal(true, record.tag_id, record.tag)">修改</a>&nbsp;
        <a-popconfirm title="确认删除?" @confirm="onDeleteNews(record.news_id)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script lang=ts>
import { defineComponent, onMounted } from 'vue'
import { table } from '@/views/News/hook/table'
import { getNewsHook, deleteNewsHook } from '@/views/News/hook/news'

export default defineComponent({
  name: 'News',
  setup() {
    const { getNewsParams, news, searchKey, fetchNews } = getNewsHook()
    const { columns, loading, pagination, total, onChange } = table(
      fetchNews,
      getNewsParams
    )
    const { onDeleteNews } = deleteNewsHook(fetchNews, loading, total)

    onMounted(() => fetchNews(loading, total))

    const onSearch = () => {
      fetchNews(loading, total)
    }

    return {
      columns,
      news,
      searchKey,
      pagination,
      loading,
      onChange,
      onSearch,
      onDeleteNews,
    }
  },
})
</script>

<style>
</style>
