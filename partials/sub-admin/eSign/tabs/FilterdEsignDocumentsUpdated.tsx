import {
    Card,
    EmptyData,
    LoadingAnimation,
    PageSize,
    Pagination,
    TechnicalError,
    Typography,
} from '@components'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { CommonApi } from '@queries'
import { EsignListRowCard } from '../components'

export const FilterdEsignDocumentsUpdated = ({
    setPage,
    itemPerPage,
    eSign,
    setItemPerPage,
}: {
    setPage: any
    itemPerPage: any
    eSign: any
    setItemPerPage: any
}) => {
    return (
        <Card>
            {eSign?.isError && <TechnicalError />}
            {eSign?.isLoading || eSign?.isFetching ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : eSign?.data?.data && eSign?.data?.data.length ? (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-medium">
                            Filtered Documents
                        </p>
                        <div className="flex items-center gap-x-4 justify-end">
                            <PageSize
                                itemPerPage={itemPerPage}
                                setItemPerPage={setItemPerPage}
                                records={eSign.data?.data?.length}
                            />
                            <Pagination
                                pagination={eSign?.data?.pagination}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5 mt-5">
                        {eSign?.data?.data?.map((document: any) => (
                            <EsignListRowCard document={document} />
                        ))}
                    </div>
                    <div className="flex items-center gap-x-4 justify-end">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            records={eSign.data?.data?.length}
                        />
                        <Pagination
                            pagination={eSign?.data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                </>
            ) : (
                eSign?.isSuccess && (
                    <EmptyData
                        title={'No Filtered Document!'}
                        description={'No document found you have searched'}
                        height={'50vh'}
                    />
                )
            )}
        </Card>
    )
}
