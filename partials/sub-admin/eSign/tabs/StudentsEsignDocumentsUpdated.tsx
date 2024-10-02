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

export const StudentsEsignDocumentsUpdated = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const studentDocuments = CommonApi.ESign.useSubadminEsignList(
        {
            search: `role:${ListingEnum.STUDENT}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

    return (
        <Card>
            {studentDocuments?.isError && <TechnicalError />}
            {studentDocuments?.isLoading || studentDocuments?.isFetching ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : studentDocuments?.data?.data &&
              studentDocuments?.data?.data.length ? (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-medium">Student Documents</p>
                        <div className="flex items-center gap-x-4 justify-end">
                            <PageSize
                                itemPerPage={itemPerPage}
                                setItemPerPage={setItemPerPage}
                                records={studentDocuments.data?.data?.length}
                            />
                            <Pagination
                                pagination={studentDocuments?.data?.pagination}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5 mt-5">
                        {studentDocuments?.data?.data?.map((document: any) => (
                            <EsignListRowCard document={document} />
                        ))}
                    </div>
                    <div className="flex items-center gap-x-4 justify-end">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            records={studentDocuments.data?.data?.length}
                        />
                        <Pagination
                            pagination={studentDocuments?.data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                </>
            ) : (
                studentDocuments?.isSuccess && (
                    <EmptyData
                        title={'No Students Documents!'}
                        description={'You have not any student document yet!'}
                        height={'50vh'}
                    />
                )
            )}
        </Card>
    )
}
