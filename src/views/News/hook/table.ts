import { ref, reactive, Ref } from 'vue'
import { GetNewsParams } from '@/api/news'

interface PaginationChange {
  current: number
  pageSize: number
}

export const table = (
  fetchNews: (loading: Ref<boolean>, total: Ref<number>) => void,
  getNewsParams: GetNewsParams
) => {
  const total = ref(0)
  const current = ref(1)
  const loading = ref(false)

  const columns = [
    {
      title: '新闻',
      dataIndex: 'title',
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: "40%",
    },
    {
      title: '标签',
      dataIndex: 'tag.tag',
    },
    {
      title: '操作',
      width: "140px",
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
    },
  ]

  const pagination = reactive({
    total,
    current,
    showQuickJumper: true,
    showSizeChanger: true,
    defaultPageSize: 10,
    pageSizeOptions: ["5", "10", "20", "50"],
    showTotal: (total: number) => `共 ${total} 条数据`,
  })

  const onChange = async (thePagination: PaginationChange) => {
    pagination.current = thePagination.current
    getNewsParams.page = thePagination.current
    getNewsParams.size = thePagination.pageSize
    fetchNews(loading, total)
  }

  return { columns, loading, pagination, total, onChange }
}
