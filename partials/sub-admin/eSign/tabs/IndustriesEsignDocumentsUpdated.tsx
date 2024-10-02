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

export const IndustriesEsignDocumentsUpdated = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const industriesDocuments = CommonApi.ESign.useSubadminEsignList(
        {
            search: `role:${ListingEnum.INDUSTRY}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

    return (
        <Card>
            {industriesDocuments?.isError && <TechnicalError />}
            {industriesDocuments?.isLoading ||
            industriesDocuments?.isFetching ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : industriesDocuments?.data?.data &&
              industriesDocuments?.data?.data.length ? (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-medium">
                            Industry Documents
                        </p>
                        <div className="flex items-center gap-x-4 justify-end">
                            <PageSize
                                itemPerPage={itemPerPage}
                                setItemPerPage={setItemPerPage}
                                records={industriesDocuments.data?.data?.length}
                            />
                            <Pagination
                                pagination={
                                    industriesDocuments?.data?.pagination
                                }
                                setPage={setPage}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5 mt-5">
                        {industriesDocuments?.data?.data?.map(
                            (document: any) => (
                                <EsignListRowCard document={document} />
                            )
                        )}
                    </div>
                    <div className="flex items-center gap-x-4 justify-end">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            records={industriesDocuments.data?.data?.length}
                        />
                        <Pagination
                            pagination={industriesDocuments?.data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                </>
            ) : (
                industriesDocuments?.isSuccess && (
                    <EmptyData
                        title={'No Industry Documents!'}
                        description={'You have not any industry document yet!'}
                        height={'50vh'}
                    />
                )
            )}
        </Card>
    )
}
