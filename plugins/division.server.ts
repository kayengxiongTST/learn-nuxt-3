import { useDivisionStore } from '~/stores/division'
export default defineNuxtPlugin(async (nuxtApp) => {
    try {
        const header = useRequestHeaders()
        const cookie = header.cookie
        const ck = cookie
            .split(';')
            ?.find((c) => c.trim().startsWith('token='))
            ?.trim()
        const token = ck?.slice(6, ck.length)
        if (token) {
            useDivisionStore().setDivisions()
        }
    } catch (error) {}
})
