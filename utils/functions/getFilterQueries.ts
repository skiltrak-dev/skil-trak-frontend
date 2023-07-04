import { NextRouter } from 'next/router'

export interface QueryType {
    [key: string]: string
}

export const getFilterQuery = <Type>({
    router,
    filterKeys,
}: {
    router: NextRouter
    filterKeys: string[]
}) => {
    const query = { ...router.query }
    const queryKeys = Object.keys(router.query)
    const filteredData = queryKeys.filter((key) => !filterKeys.includes(key))

    filteredData.forEach((q) => {
        delete query[q]
    })
    return Object.keys(query)?.length > 0 ? (query as Type | QueryType) : {}
}

export const queryToUrl = (query: QueryType) => {
    return Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
}

export const setFilterValues = <T>({
    router,
    filter,
}: {
    router: NextRouter
    filter: T
}) => {
    let getValueQuery: QueryType = {}
    const queryFilters = { ...router.query, ...filter }
    Object.entries(queryFilters)?.forEach(([key, value]) => {
        if (value) {
            getValueQuery[key] = value as string
        }
    })
    return queryToUrl(getValueQuery)
}
