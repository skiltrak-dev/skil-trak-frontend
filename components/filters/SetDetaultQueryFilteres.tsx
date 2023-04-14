import { getFilterQuery, removeEmptyValues } from '@utils'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'

export const SetDetaultQueryFilteres = ({
    filterKeys,
    setFilter,
}: {
    filterKeys: string[]
    setFilter: (query: any) => void
}) => {
    const router = useRouter()
    const query = getFilterQuery({ router, filterKeys })

    const debounceValue = useCallback(
        debounce((query) => setFilter(removeEmptyValues(query)), 700),
        []
    )
    useEffect(() => {
        debounceValue(query)
    }, [router])
    return null
}
