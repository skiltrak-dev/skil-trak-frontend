import { setFilterValues } from '@utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface SetQueryFiltersProp<T> {
    filter: T
}

export const SetQueryFilters = <T,>({ filter }: SetQueryFiltersProp<T>) => {
    const router = useRouter()
    const queryUrl = setFilterValues<T>({ router, filter })

    useEffect(() => {
        router.push(`${router.pathname}?${queryUrl}`)
    }, [queryUrl])

    return null
}
