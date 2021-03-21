import { store } from '@/store'

interface Tokens {
  access_token: string
  refresh_token: string
}

/**
 * 储存获得的token
 * @param tokens
 */
export const handleToken = (tokens: Tokens) => {
  store.commit("upAccessToken", tokens.access_token)
  localStorage.setItem("refreshToken", tokens.refresh_token)
}

export const checkLogin = () => {
  return localStorage.getItem("refreshToken") != null
}
