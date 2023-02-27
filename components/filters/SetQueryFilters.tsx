import { setFilterValues } from '@utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const SetQueryFilters = ({ filter }: { filter: any }) => {
    const router = useRouter()
    const queryUrl = setFilterValues({ router, filter })

    useEffect(() => {
        router.push(`${router.pathname}?${queryUrl}`)
    }, [queryUrl])

    return null
}
