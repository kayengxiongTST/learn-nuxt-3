import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

import { useToast } from 'vue-toastification'
export function useServer<T>(url: string, options: UseFetchOptions<T> = {}) {
    const toast = useToast()
    const token = useCookie('token')
    let hder = {}
    if (process.server) {
        hder = useRequestHeaders()
    }
    const defaults: UseFetchOptions<T> = {
        baseURL: '/api/',
        // cache request
        key: url,

        // set user token if connected
        headers: {
            Authorization: token.value ? `Bearer ${token.value}` : 'token',
            ...hder,
        },

        onResponse(_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },

        onResponseError(_ctx) {
            // throw new myBusinessError()
            switch (_ctx.response.status) {
                case 401:
                    toast.error('ຜີດພາດ 401')
                    break
                case 403:
                    toast.error('ຜີດພາດ 403')
                    break
                case 404:
                    toast.error('ຜີດພາດ 404')
                    break
                case 500:
                    toast.error('ຜີດພາດ 500')
                    break
                case 503:
                    toast.error('ຜີດພາດ 503')
                    break
                default:
                    break
            }
        },
    }

    // for nice deep defaults, please use unjs/defu
    const params = defu(options, defaults)
    return useFetch(url, params)
}
