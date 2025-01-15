import { EmptyData, TechnicalError } from '@components/ActionAnimations'
import { LoadingAnimation } from '@components/LoadingAnimation'
import React, { ReactNode } from 'react'

export const LoadedDataView = ({
    data,
    children,
    emptyData,
    dataType = 'paginatedData',
}: {
    data: any
    dataType?: 'paginatedData' | 'withoutPaginatedData' | 'simpleData'
    children: ReactNode
    emptyData?: {
        title: string
        description?: string
    }
}) => {
    const showData = () => {
        switch (dataType) {
            case 'paginatedData':
                return data?.data?.data && data?.data?.data?.length > 0
            case 'withoutPaginatedData':
                return data?.data && data?.data?.length > 0

            default:
                return data?.data
        }
    }
    return (
        <>
            {data?.isError && <TechnicalError />}
            {data?.isLoading || data?.isFetching ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : data?.isSuccess ? (
                showData() ? (
                    children
                ) : (
                    <EmptyData {...emptyData} height={'50vh'} />
                )
            ) : null}
        </>
    )
}
