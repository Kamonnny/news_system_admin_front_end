import request from '@/lib/requests'

export interface GetNewsParams {
  page: number
  size: number
  filter?: string
}

export interface NewsModel {
  title: string
  content: string
  tag_id: number | null
}

export const getNews = (params: GetNewsParams) => request.get('/news', params)

export const getTheNews = (newsId: number) => request.get(`/news/${newsId}`)

export const postNews = (json: NewsModel) => request.post('/news', json)

export const putNews = (newsId: number, json: NewsModel) => request.put(`/news/${newsId}`, json)

export const deleteNews = (newsId: number) => request.delete(`/news/${newsId}`)

