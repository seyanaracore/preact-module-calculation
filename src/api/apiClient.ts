import type JQueryStatic from 'jquery'

type RequestParams = JQueryStatic['ajaxSettings']

const apiClient = {
  get: <T>(url: string, params?: RequestParams) =>
    window.$.ajax(url, { ...params, method: 'GET' }) as Promise<T>,
}

export default apiClient
