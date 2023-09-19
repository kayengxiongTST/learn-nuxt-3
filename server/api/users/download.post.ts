import axios from 'axios'
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const user: any = await readBody(event)
        const { data } = await axios.get(config.public.CDN + user.profile, {
            responseType: 'arraybuffer',
        })
        return data
    } catch (error: any) {
        return false
    }
})
