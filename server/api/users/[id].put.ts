import axios from 'axios'
import FormData from "form-data";

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

        // get id
        const { id } = getRouterParams(event)
        
    //get body
    const body: Array<any> = <Array<any>>await readMultipartFormData(event);

    const formData: FormData = new FormData();

    for (const data of body) {
      formData.append(
        data.name,
        data.type && data.filename ? data.data : data.data.toString(),
        data.filename,
      );
    }
        const { data } = await axios.put(
            `${config.API_URL}/api/v1/users/${id}`,
            formData,
            {
                headers: newHeader,
            },
        )
        return data
    } catch (error: any) {
        return error?.response?.data
    }
})
