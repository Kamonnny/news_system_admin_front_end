import request from '@/lib/requests'

export const getTags = () => {
  return request.get('/news/tags', { size: 10, page: 1 })
}

export const postTags = (tag: string) => {
  return request.post('/news/tags', { tag })
}

export const deleteTag = (tagId: number) => {
  return request.delete(`/news/tags/${tagId}`)
}

export const putTags = (tagId: number, tag: string) => {
  return request.put(`/news/tags/${tagId}`, { tag })
}
