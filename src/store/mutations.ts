import { State } from './state'

interface User {
  username: string
  email: string
}

export const mutations: any = {
  upAccessToken(state: State, token: string) {
    state.accessToken = token
  },
  upUser(state: State, user: User) {
    state.username = user.username
    state.email = user.email
  },
}
