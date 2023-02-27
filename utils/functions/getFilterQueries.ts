export const getFilterQuery = ({
    router,
    filterKeys,
}: {
    router: any
    filterKeys: string[]
}) => {
    const query = { ...router.query }
    const queryKeys = Object.keys(router.query)
    const filteredData = queryKeys.filter((key) => !filterKeys.includes(key))
    filteredData.forEach((q) => {
        delete query[q]
    })
    return Object.keys(query)?.length > 0 ? query : {}
}

export const queryToUrl = (query: any) => {
    return Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
}

export const setFilterValues = ({
    router,
    filter,
}: {
    router: any
    filter: any
}) => {
    let getValueQuery: any = {}
    const queryFilters = { ...router.query, ...filter }
    Object.entries(queryFilters)?.forEach(([key, value]) => {
        if (value) {
            getValueQuery[key] = value
        }
    })
    const queryUrl = queryToUrl(getValueQuery)
    return queryUrl
}
