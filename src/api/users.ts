import request from '@/lib/requests'

export const getUsers = () => {
  return request.get('/users')
}
