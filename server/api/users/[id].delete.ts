import axios from 'axios'

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const headers = getHeaders(event)
        const newHeader = {
            'sec-ch-ua': headers['sec-ch-ua'],
            'sec-ch-ua-mobile': headers['sec-ch-ua'],
            Authorization: headers['authorization'],
            'user-agent': headers['user-agent'],
            'sec-ch-ua-platform': headers['sec-ch-ua-platform'],
            accept: headers['accept'],
            origin: headers['origin'],
            'sec-fetch-site': headers['sec-fetch-site'],
            'sec-fetch-mode': headers['sec-fetch-site'],
            'sec-fetch-dest': headers['sec-fetch-dest'],
            referer: headers['referer'],
            'accept-encoding': headers['accept-encoding'],
            'accept-language': headers['accept-language'],
            'x-forwarded-for': headers['x-forwarded-for'],
            'x-forwarded-port': headers['x-forwarded-port'],
            'x-forwarded-proto': headers['x-forwarded-proto'],
        }

        const { id } = getRouterParams(event)

        // query string
        const { data } = await axios.delete(
            `${config.API_URL}/api/v1/users/${id}`,
            {
                headers: newHeader,
            },
        )
        return data
    } catch (error: any) {
        return error?.response?.data
    }
})
