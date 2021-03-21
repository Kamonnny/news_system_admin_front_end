import axios from 'axios'
import router from "@/router"
import { store } from "@/store"
import { handleToken } from "@/lib/token"

const requests = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 30000,
})

/**
 * 请求拦截器
 */
requests.interceptors.request.use(
  config => {
    // 给每个请求加上token
    config.headers.Authorization = `Bearer ${store.state.accessToken}`
    return config
  },
  error => {
    // do something with request error
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
requests.interceptors.response.use(
  response => {
    if (response.data.code === 401) {
      return axios({
        url: `http://127.0.0.1:5000/oauth`,
        method: "put",
        data: {
          refresh_token: localStorage.getItem("refreshToken")
        },
        timeout: 30000,
      }).then(res => {
        if (res.data.code === 200) {
          const tokens = res.data.data
          handleToken(tokens)

          // 重新请求401的接口
          response.config.headers.Authorization = `Bearer ${tokens.access_token}`
          return axios(response.config)
        } else {
          localStorage.clear()
          const next = `${document.location.pathname}${document.location.hash}`
          router.push({ path: "/login", query: { next } })
          return response
        }
      })
    } else {
      return response
    }
  }
)


export default requests
