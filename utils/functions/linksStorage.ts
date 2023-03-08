import { queryToUrl } from './getFilterQueries'
import { isBrowser } from '../browser-supported'

export const setLink = (key: string, router: any) => {
    const query = queryToUrl(router.query)
    if (isBrowser()) {
        sessionStorage.setItem(
            key,
            `${router.pathname?.split('/')?.slice(1)?.join('/')}?${query}`
        )
    }
}

export const getLink = (key: string) => {
    if (isBrowser()) {
        return sessionStorage.getItem(key)
    }
    return null
}
