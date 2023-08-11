import { EmptyData, PageSize, Pagination, TechnicalError } from '@components'
import { useEffect, useState } from 'react'
import { CurrentStudentCard } from './components'

// query
import { LoadingAnimation } from '@components/LoadingAnimation'
import { IndustryApi } from '@queries'
import { useRouter } from 'next/router'

export const PendingStudents = () => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(20)

    const router = useRouter()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 20))
    }, [router])

    // query
    const industryWorkplace = IndustryApi.Workplace.usePendingWorkplaces(
        {
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { refetchOnMountOrArgChange: true }
    )

    return (
        <>
            <div className="flex items-center justify-between py-7">
                <PageSize
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}
                    records={industryWorkplace.data?.data?.length}
                />
                <Pagination
                    pagination={industryWorkplace?.data?.pagination}
                    setPage={setPage}
                />
            </div>

            {industryWorkplace.isError && <TechnicalError />}
            {industryWorkplace.isLoading && industryWorkplace.isFetching ? (
                <LoadingAnimation />
            ) : industryWorkplace.data?.data &&
              industryWorkplace.data?.data?.length > 0 ? (
                <div className="flex flex-col gap-y-2">
                    {industryWorkplace?.data?.data?.map((workplace: any) => (
                        <CurrentStudentCard
                            key={workplace.id}
                            workplace={workplace}
                        />
                    ))}
                </div>
            ) : (
                !industryWorkplace.isError && (
                    <EmptyData
                        title={'There is no any Pending Student'}
                        description={'There is no any Pending Student'}
                    />
                )
            )}
            {industryWorkplace.data?.data?.length > 5 && (
                <div className="flex items-center justify-between py-7">
                    <PageSize
                        itemPerPage={itemPerPage}
                        setItemPerPage={setItemPerPage}
                        records={industryWorkplace.data?.data?.length}
                    />
                    <Pagination
                        pagination={industryWorkplace?.data?.pagination}
                        setPage={setPage}
                    />
                </div>
            )}
        </>
    )
}
