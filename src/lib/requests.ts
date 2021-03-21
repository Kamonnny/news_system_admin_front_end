import axios from 'axios'
import router from "@/router"
import { store } from "@/store"
import { handleToken } from "@/lib/token"
import { AxiosRequestConfig } from 'axios'
import { message } from "ant-design-vue"

interface ApiResponse {
  code: number
  msg: string
  data: any
  now_ts: number
}

const network = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 30000,
})

/**
 * 请求拦截器
 */
network.interceptors.request.use(
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
network.interceptors.response.use(
  response => {
    if (response.data.code === 401) {
      return axios({
        // 请求刷新token
        url: `http://127.0.0.1:5000/oauth`,
        method: "PUT",
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

          // 跳转登录页面
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

/**
 * 接口返回数据处理，此处只针对有返回情况
 * @param response 接口返回消息
 */
const handlerData = (response: ApiResponse) => {
  if (response.code === 200) {
    return response.data
  } else {
    message.error(response.msg)
    throw response
  }
}

/**
 * 上面77-82
 */
export default {
  async get(url: string, params: any = {}, config: AxiosRequestConfig = {}) {
    const { data } = await network({ url, method: "GET", params, ...config })
    return handlerData(data)
  },
  async post(url: string, json: any = {}, config: AxiosRequestConfig = {}) {
    const { data } = await network({ url, method: "POST", data: json, ...config })
    return handlerData(data)
  },
  async put(url: string, json: any = {}, config: AxiosRequestConfig = {}) {
    const { data } = await network({ url, method: "PUT", data: json, ...config })
    return handlerData(data)
  },
}
