import axios from 'axios'
// import { getToken } from 'someUtilsFunctions'
import { AuthUtils } from '@utils'

const BASE_URL = process.env.NEXT_PUBLIC_HOST
const client = axios.create({ baseURL: BASE_URL })

const request =  ({ ...options }) => {
    if (AuthUtils.getToken())
        client.defaults.headers.common.Authorization = `Bearer ${AuthUtils.getToken()}`

    const onSuccess = (response: any) => response
    const onError = (error: any) => {
        // optionaly catch errors and add some additional logging here
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}

export default request
