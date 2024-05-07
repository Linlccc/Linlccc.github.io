---
# 标题
title: "在 Vue 中使用 Axios"
# 描述
description: ""
# 摘要
Summary: ""
# 标签
tags: []
# 显示权重（越小显示越靠前）
weight: 1000

# 撰写日期
date: "2024-05-07 18:20:22"
---

## axios.ts

~~~ ts
import axios from 'axios'

// 文档：https://github.com/axios/axios#request-config

// axios 全局默认配置
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || 'https://api.apiopen.top/';//设置默认请求路径
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 自定义实例配置
const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || 'https://api.apiopen.top/'
  // timeout: 60 * 1000, // 超时
  // withCredentials: true, // 检查跨域访问控制
}

axios.create(config)

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    console.log('请求全局拦截')
    // 请求之前处理
    return config
  },
  error => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 处理响应数据
    return response
  },
  error => {
    // 处理响应错误
    return Promise.reject(error)
  }
)

export { axios }

export default (app: any) => {
  app.config.globalProperties.$axios = axios
}

~~~

## main.ts

~~~ ts
// 导入封装的axios
import installAxios from './axios'

const app = createApp(App)
installAxios(app)// 使用axios
~~~

## api.ts

- 使用 axios 制定接口函数

~~~ ts
// 导入封装的axios
import { axios } from './axios'

// 调用接口1
export const api1 = async (params: any) => {
  return axios.get('/api/api1', { params: params })
}

export const api2 = async (params: any) => {
  return axios.post('/api/api2', { params: params })
}
~~~

## test.vue

- 调用接口

~~~ ts
// 导入api
import { api1 } from './api'

api1(params).then(res=>console.log(res));
~~~
