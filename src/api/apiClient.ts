import type JQueryStatic from 'jquery'

type RequestParams = JQueryStatic['ajaxSetup'] & {
  /**
   * @default 5 минут
   */
  cacheTime?: number
  cache?: 'no-cache' | 'default'
}

const cache = new Map<string, { data: unknown; cacheTime: number; time: number }>()

const apiClient = {
  get: async <T>(
    url: string,
    {
      cache: cacheRule = 'default',
      cacheTime = 5 * 1000 * 60,
      ...params
    }: RequestParams = {} as RequestParams
  ) => {
    const cachedResponse = cache.get(url)

    if (
      cachedResponse &&
      cacheRule === 'default' &&
      cachedResponse.time + cachedResponse.cacheTime > +new Date()
    ) {
      return cachedResponse.data as T
    }

    const res = (await window.$.ajax(url, {
      ...params,
      method: 'GET',
      // eslint-disable-next-line no-undef
    })) as T

    if (res) {
      cache.set(url, {
        data: res,
        time: +new Date(),
        cacheTime,
      })
    }

    return res
  },
}

export default apiClient
