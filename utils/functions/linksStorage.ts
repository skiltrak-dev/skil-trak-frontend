import { QueryType, queryToUrl } from './getFilterQueries'
import { isBrowser } from '../browser-supported'
import { NextRouter } from 'next/router'

export const setLink = (key: string, router: NextRouter) => {
    const query = queryToUrl(router.query as QueryType)
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
