// useDepartmentCoursesRequestList
import { ReactElement, useState } from 'react'
import { NextPageWithLayout } from '@types'
import { SubAdminLayout } from '@layouts'
import { SubAdminApi } from '@queries'
import {
    EmptyData,
    LoadingAnimation,
    PageSize,
    Pagination,
    TechnicalError,
    Typography,
} from '@components'
import { CourseRequestCard } from '@partials/sub-admin'

const CourseRequest: NextPageWithLayout = () => {
    const [itemPerPage, setItemPerPage] = useState<any>(10)
    const [page, setPage] = useState(1)

    const { data, isError, isLoading } =
        SubAdminApi.SubAdmin.useDepartmentCoursesRequestList(
            {
                search: ``,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )
    return (
        <div className="mx-auto max-w-7xl mb-5 ">
            {isError && <TechnicalError />}

            {isLoading ? (
                <LoadingAnimation />
            ) : data?.data && data?.data?.length ? (
                <>
                    <div className="flex items-center gap-x-4 justify-end mb-4">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            records={data?.data?.length}
                        />
                        <Pagination
                            pagination={data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-5 max-h-[40rem] mb-2 overflow-y-auto remove-scrollbar">
                        {data?.data?.map((request: any) => (
                            <CourseRequestCard
                                key={request?.id}
                                request={request}
                            />
                        ))}
                    </div>
                </>
            ) : (
                !isError && (
                    <EmptyData
                        title="No Course Request"
                        description="No course request found yet"
                    />
                )
            )}
        </div>
    )
}

CourseRequest.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Courses Request List' }}>
            {page}
        </SubAdminLayout>
    )
}

export default CourseRequest
