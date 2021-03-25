import request from '@/lib/requests'

export interface GetCommentParams {
  page: number
  size: number
  filter?: string
}

export const getComment = (params: GetCommentParams) => request.get('/news/comments', params)

export const deleteComment = (commentsId: number) => request.delete(`/news/comments/${commentsId}`)
