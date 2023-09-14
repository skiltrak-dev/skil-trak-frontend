import { getFilterQuery, removeEmptyValues } from '@utils'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'

export const SetDetaultQueryFilteres = <Type,>({
    filterKeys,
    setFilter,
}: {
    filterKeys: string[]
    setFilter: (query: Type) => void
}) => {
    const router = useRouter()
    const query = getFilterQuery<Type>({ router, filterKeys })

    const debounceValue = useCallback(
        debounce((query) => setFilter(removeEmptyValues(query)), 700),
        []
    )
    useEffect(() => {
        debounceValue(query)
    }, [router])
    return null
}
