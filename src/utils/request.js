/**
 * 根据axios封装的接口数据请求工具
 */
import axios from 'axios'
import { message } from 'antd'

const CancelToken = axios.CancelToken // eslint-disable-line

/**
 * POST
 * opts.url
 * opts.data
 * opts.success
 * opts.failed
 */
function post(opts) {
  const params = opts.data || opts.body || {}
  const msg = params.successTip
  const rSymbol = opts.rSymbol || params.rSymbol
  Reflect.deleteProperty(params, 'successTip')
  Reflect.deleteProperty(params, 'rSymbol')
  if (process.env.NODE_ENV === 'development') {
    const name = opts.url.slice(1).split('/').join('_')
    const res = require('../mock/' + name).data; // eslint-disable-line
    console.log('%c [post] ==> ' + opts.url + '\n', 'color: green', '-req-', opts.data || opts.body, '\n -res-', res) // eslint-disable-line
    return new Promise((resolve) => {
      const mockReq = setTimeout(() => {
        if (msg) {
          message.success(msg)
        }
        resolve(res)
        return opts.success ? opts.success(res.data) : res.data
      }, (Math.random() * 1000) + 500)
      GLOBAL.requestSymbols[rSymbol] = () => { clearTimeout(mockReq) }
    })
  }
  const { token, cancel } = CancelToken.source()
  if (rSymbol) {
    GLOBAL.requestSymbols[rSymbol] = cancel
  }
  return axios.post(opts.url, params, {
    timeout: 1000 * 60,
    cancelToken: token,
  }).then((res) => {
    if (res.data.status === 'success') {
      if (opts.success && msg) {
        message.success(msg)
      }
      return opts.success ? opts.success(res.data.data || []) : res.data.data || []
    } else if (res.data.header && res.data.header.code === 401) {
      nav2Login()
      return Promise.reject()
    }
    opts.failed ? opts.failed(res.data) : message.error(res.data.reason) // eslint-disable-line
    return false
  }, (err) => {
    opts.failed ? opts.failed(err) : console.log(err) // eslint-disable-line
    return false
  }).catch((e) => {
    if (axios.isCancel(e)) {
      console.log('Request canceled', e.message) // eslint-disable-line
    } else {
      message.error('请求数据错误')
      console.log(`Error happened:${e}`) // eslint-disable-line
    }
    return false
  })
}

/**
 * GET
 * opts.url
 * opts.data
 * opts.success
 * opts.failed
 */
function get(opts) {
  const params = opts.data || opts.body || {}
  const msg = params.successTip
  const rSymbol = opts.rSymbol || params.rSymbol
  Reflect.deleteProperty(params, 'successTip')
  Reflect.deleteProperty(params, 'rSymbol')
  if (process.env.NODE_ENV === 'development') {
    const name = opts.url.slice(1).split('/').join('_')
    const res = require('../mock/' + name).data; // eslint-disable-line
    console.log('%c [post] ==> ' + opts.url + '\n', 'color: green', '-req-', opts.data || opts.body, '\n -res-', res) // eslint-disable-line
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res)
      }, (Math.random() * 1000) + 500)
    }).catch((err) => {
      opts.failed ? opts.failed(err) : console.error(err) // eslint-disable-line
      return Promise.reject(err)
    })
  }
  const { token, cancel } = CancelToken.source()
  if (rSymbol) {
    GLOBAL.requestSymbols[rSymbol] = cancel
  }
  return axios.get(opts.url, {
    params,
  }, {
    timeout: 1000 * 60,
    cancelToken: token,
  }).then((res) => {
    if (res.data.status === 'success') {
      if (opts.success && msg) {
        message.success(msg)
      }
      return opts.success ? opts.success(res.data.data || []) : res.data.data || []
    } else if (res.data.header && res.data.header.code === 401) {
      nav2Login()
      return Promise.reject()
    }
    opts.failed ? opts.failed(res.data) : message.error(res.data.reason) // eslint-disable-line
    return false
  }).catch((err) => {
    if (axios.isCancel(err)) {
      console.log('Request canceled', err.message) // eslint-disable-line
      return Promise.reject(err) // 停止继续执行await/yield后代码
    }
    opts.failed ? opts.failed(err) : console.error(err) // eslint-disable-line
    message.error('系统异常，请稍后重试')
    return false
  })
}

function download(opts) {
  const { url, data } = opts
  const createForm = document.createElement('form')
  createForm.id = 'form'
  createForm.style.display = 'none'
  createForm.action = url
  createForm.method = 'post'
  for (const [k, v] of Object.entries(data)) {
    const queryInput = document.createElement('input')
    queryInput.style.display = 'none'
    queryInput.name = k
    queryInput.setAttribute('value', JSON.stringify(v))
    createForm.appendChild(queryInput)
  }
  document.body.appendChild(createForm)
  createForm.submit()
  createForm.remove()
  return true
}

export const makePost = (url, body, rSymbol) => post({
  url,
  data: body,
  rSymbol,
})

export const makeGet = (url, body, rSymbol) => get({
  url,
  data: body,
  rSymbol,
})

export const makeDownload = (url, body) => download({
  url,
  data: body,
})

/**
 * 某些get请求只应该返回最后一次请求的结果
 * post请求由于涉及到数据修改，不能停止
 */
export default {
  post,
  get,
  download,
}
