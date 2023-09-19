import axios from 'axios'
export default defineNuxtPlugin((_) => {
    const config = useRuntimeConfig()
    const cookie = useCookie<string>('token')
    const defaultUrl = config.API_URL
    const api = axios.create({
        baseURL: defaultUrl,
        headers: {
            common: {
                Authorization: `Bearer ${cookie.value}`
            }
        }
    })
    return {
        provide: {
            api
        }
    }
})
