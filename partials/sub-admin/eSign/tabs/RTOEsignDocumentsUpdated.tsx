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
import { ListingEnum } from '../enums'

export const RTOEsignDocumentsUpdated = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const rtoDocuments = CommonApi.ESign.useSubadminEsignList(
        {
            search: `role:${ListingEnum.RTO}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

    return (
        <Card>
            {rtoDocuments?.isError && <TechnicalError />}
            {rtoDocuments?.isLoading || rtoDocuments?.isFetching ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : rtoDocuments?.data?.data && rtoDocuments?.data?.data.length ? (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-medium">RTO Documents</p>
                        <div className="flex items-center gap-x-4 justify-end">
                            <PageSize
                                itemPerPage={itemPerPage}
                                setItemPerPage={setItemPerPage}
                                records={rtoDocuments.data?.data?.length}
                            />
                            <Pagination
                                pagination={rtoDocuments?.data?.pagination}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5 mt-5">
                        {rtoDocuments?.data?.data?.map((document: any) => (
                            <EsignListRowCard document={document} />
                        ))}
                    </div>
                    <div className="flex items-center gap-x-4 justify-end">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            records={rtoDocuments.data?.data?.length}
                        />
                        <Pagination
                            pagination={rtoDocuments?.data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                </>
            ) : (
                rtoDocuments?.isSuccess && (
                    <EmptyData
                        title={'No Rto Documents!'}
                        description={'You have not any rto document yet!'}
                        height={'50vh'}
                    />
                )
            )}
        </Card>
    )
}
