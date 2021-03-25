import { ref, reactive } from 'vue'
import { NewsModel, getTheNews } from '@/api/news'
import { getTags } from '@/api/tag'

interface Tags {
  tag: string
  tag_id: number
  create_time: string
  update_time: string
}

export const modal = () => {
  const isEdit = ref(false)
  const visible = ref(false)
  const confirmLoading = ref(false)
  const tags = ref<Tags[]>([])
  const newsId = ref(0)

  const form = reactive<NewsModel>({
    title: '',
    content: '',
    tag_id: null
  })

  const fetchTags = async () => {
    const data = await getTags()
    tags.value = data.items
  }

  const showModal = async (
    edit: boolean = false,
    theNewsId: number
  ) => {
    isEdit.value = edit
    if (edit) {
      const data = await getTheNews(theNewsId)
      form.title = data.title
      form.content = data.content
      form.tag_id = data.tag_id
      newsId.value = theNewsId
    } else {
      form.title = ''
      form.content = ''
      form.tag_id = null
    }
    visible.value = true
  }

  return { isEdit, visible, form, newsId, tags, confirmLoading, showModal, fetchTags }
}
