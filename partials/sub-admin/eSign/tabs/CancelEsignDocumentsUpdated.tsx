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
import { EsignDocumentStatus } from '@utils'

export const CancelEsignDocumentsUpdated = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const allDocuments = CommonApi.ESign.useSubadminEsignList(
        {
            search: `status:${EsignDocumentStatus.CANCELLED}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )
    return (
        <Card>
            {allDocuments?.isError && <TechnicalError />}
            {allDocuments?.isLoading || allDocuments?.isFetching ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : allDocuments?.data?.data && allDocuments?.data?.data.length ? (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-medium">Cancel Documents</p>
                        <div className="flex items-center gap-x-4 justify-end">
                            <PageSize
                                itemPerPage={itemPerPage}
                                setItemPerPage={setItemPerPage}
                                records={allDocuments.data?.data?.length}
                            />
                            <Pagination
                                pagination={allDocuments?.data?.pagination}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5 mt-5">
                        {allDocuments?.data?.data?.map((document: any) => (
                            <EsignListRowCard document={document} />
                        ))}
                    </div>
                    <div className="flex items-center gap-x-4 justify-end">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            records={allDocuments.data?.data?.length}
                        />
                        <Pagination
                            pagination={allDocuments?.data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                </>
            ) : (
                allDocuments?.isSuccess && (
                    <EmptyData
                        title={'No Cancel Documents!'}
                        description={'You have not any cancel document yet!'}
                        height={'50vh'}
                    />
                )
            )}
        </Card>
    )
}
