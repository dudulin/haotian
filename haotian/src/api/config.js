'use strict'
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'

Vue.use(ElementUI)

import qs from 'qs'
axios.interceptors.request.use(config => { // 这里的config包含每次请求的内容
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus(url, response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 ||
      response.status === 400)) {
    return response.data
  } else {
    if (response.status === 401) {
      window.location.href = '/'
      return false
    } else {
      Vue.prototype.$alert(`接口：${url}网络错误，错误码为${response.status}`, {
        confirmButtonText: '确定'
      }).catch(res => {})
      return false
    }
  }
}

function checkCode(url, res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  // res.stateCode = 30200
  if (!res.statusCode) {
    return res
  }
  if (res.statusCode === 30200) {
    window.location.href = '/login'
    return false
  } else if (res.statusCode !== 30200 && res.statusCode !== 20000 && res.statusCode !== 40103 && res.statusCode !== 40101 && res.statusCode !== 40000) {
    if (res.responseInfo) {
      Vue.prototype.$alert(`接口：${url}错误，错误码为${res.statusCode};错误信息为：${res.responseInfo}`, {
        confirmButtonText: '确定'
      })
    }
    return false
  } else {
    return res
  }
  // else {
  //   if (res.data[0].result) {
  //     Vue.prototype.$alert(`接口：${url}，返回码为${res.data[0].result};返回信息为：${res.data[0].result_info}`, {
  //       confirmButtonText: '确定'
  //     })
  //   }
  // }
}
// 请求方式的配置
export default {
  post(url, data) { //  post
    data = JSON.stringify(data)
    return axios({
      method: 'post',
      baseURL: '',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(
      (response) => {
        return response
      }
    ).then(
      (res) => {
        return res
      }
    )

  },
  delete(url, data) { //  post
    return axios({
      methods: 'post',
      baseURL: '',
      url,
      data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(
      (response) => {
        if (response) {
          return checkStatus(url, response)
        }
        return false
      }
    ).then(
      (res) => {
        return checkCode(url, res)
      }
    )
  },
  put(url, data) { //  post
    url = locationBase + url

    return axios({
      methods: 'put',
      baseURL: '',
      url,
      data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(
      (response) => {
        if (response) {
          return checkStatus(url, response)
        }
        return false
      }
    ).then(
      (res) => {
        return checkCode(url, res)
      }
    )
  },
  get(url, params) { // get
    url = locationBase + url
    return axios.get(url).then(
      (response) => {
        return response
      }
    ).then(
      (res) => {
        return res
      }
    )
  }
}
