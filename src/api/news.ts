import request from '@/lib/requests'

export interface GetNewsParams {
  page: number
  size: number
  filter?: string
}

export const getNews = (params: GetNewsParams) => {
  return request.get('/news', params)
}

export const deleteNews = (newsId: number) => {
  return request.delete(`/news/${newsId}`)
}

