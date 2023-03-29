import { Button } from '@components'
import { Card } from '@components/cards'
import { removeEmptyValues, setFilterValues } from '@utils'
import debounce from 'lodash/debounce'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { MdCancel } from 'react-icons/md'

interface FilterProps {
    component: any
    initialValues: any
    setFilterAction: Function
    setFilter: Function
    filterKeys?: string[] | undefined
}
export const Filter = ({
    component,
    initialValues,
    setFilterAction,
    setFilter,
    filterKeys,
}: FilterProps) => {
    const router = useRouter()

    const [expanded, setExpanded] = useState(false)
    const [filters, setFilters] = useState(initialValues)

    // on Clear Filter
    const query = { ...router.query, page: 1, pageSize: 50 }
    const queryKeys = Object.keys(router.query)
    const filteredData = queryKeys.filter((key) => filterKeys?.includes(key))
    filteredData.forEach((q) => {
        delete query[q as keyof typeof query]
    })
    const clearFilterUrl = Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')

    const Component = component

    useEffect(() => {
        if (Object.values(initialValues)?.length > 0) {
            setExpanded(true)
            setFilters(initialValues)
        }
    }, [initialValues])

    useEffect(() => {
        setFilterAction(
            <Button
                variant={'action'}
                Icon={expanded ? IoClose : FaFilter}
                onClick={() => {
                    onFilterButtonClick()
                }}
            >
                {expanded ? 'Clear' : 'Filter'}
            </Button>
        )
    }, [expanded, filters, setFilterAction])

    const delayedSearch = useCallback(
        debounce((values) => setFilter(removeEmptyValues(values)), 700),
        []
    )

    const onFilterChange = (filter: any) => {
        setFilters(filter)
        delayedSearch(filter)
    }

    const onFilterClear = () => {
        setFilters({})
        setFilter({})
    }

    const onRemoveFilter = (key: string) => {
        setFilters({ ...filters, [key]: '' })
    }

    const onFilterButtonClick = () => {
        if (expanded) {
            onFilterClear()
            setExpanded(false)
            router.push(`${router.pathname}?${clearFilterUrl}`)
        } else {
            setExpanded(true)
        }
    }

    return expanded ? (
        <Card>
            <div>
                <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium flex items-center gap-x-2 text-gray-400">
                        <FaFilter />
                        Filter
                    </p>
                    <button
                        className="text-xl text-gray-500 hover:text-gray-700"
                        title="Close Filter"
                        onClick={onFilterButtonClick}
                    >
                        <IoClose />
                    </button>
                </div>
                <div>
                    <Component
                        onFilterChange={onFilterChange}
                        filter={filters}
                    />
                </div>
                <div className="flex flex-wrap gap-x-2">
                    {Object.keys(filters).map(
                        (key) =>
                            filters[key] && (
                                <div
                                    key={key}
                                    className="flex items-center justify-between border text-xs shadow rounded"
                                >
                                    <div className="mr-2">
                                        <span className="px-1 bg-gray-100 text-[11px] capitalize h-full py-0.5 inline-block">
                                            {key}:
                                        </span>{' '}
                                        <span className="font-medium">
                                            {filters[key]}
                                        </span>
                                    </div>
                                    <span
                                        onClick={() => onRemoveFilter(key)}
                                        className="cursor-pointer text-sm text-gray-300 hover:text-gray-400"
                                    >
                                        <MdCancel />
                                    </span>
                                </div>
                            )
                    )}
                </div>
            </div>
        </Card>
    ) : null
}
