import { reactive, ref, Ref } from 'vue'
import { GetNewsParams, getNews, postNews, putNews, deleteNews, NewsModel } from '@/api/news'
import { message } from 'ant-design-vue'

interface Tags {
  tag: string
  tag_id: number
  create_time: string
  update_time: string
}

interface News {
  comments_count: number
  content: string
  create_time: string
  news_id: number
  tag: Tags
  tag_id: number
  title: string
  update_time: string
  views: number
}

export const getNewsHook = () => {
  const searchKey = ref('')

  const getNewsParams = reactive<GetNewsParams>({
    page: 1,
    size: 10
  })

  const news = ref<News[]>([])

  const fetchNews = async (loading: Ref<boolean>, total: Ref<number>) => {
    loading.value = true
    if (searchKey.value === "") {
      delete getNewsParams.filter
    } else {
      getNewsParams.filter = searchKey.value
    }
    const data = await getNews(getNewsParams)
    news.value = data.items
    total.value = data.total
    loading.value = false
  }

  return { getNewsParams, news, searchKey, fetchNews }
}

export const postNewHook = (form: NewsModel) => {
  const onPostNews = () => {
    postNews(form)
    message.success("添加新闻成功")
  }
  return { onPostNews }
}

export const putNewHook = (newsId: Ref<number>, form: NewsModel) => {
  const onPutNews = () => {
    putNews(newsId.value, form)
    message.success("修改新闻成功")
  }
  return { onPutNews }
}

export const deleteNewsHook = (
  fetchNews: (loading: Ref<boolean>, total: Ref<number>) => void,
  loading: Ref<boolean>, total: Ref<number>
) => {

  const onDeleteNews = async (newsId: number) => {
    await deleteNews(newsId)
    message.success('新闻删除成功')
    fetchNews(loading, total)
  }

  return { onDeleteNews }
}
