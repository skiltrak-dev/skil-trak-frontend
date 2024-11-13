import { SubAdminApi } from '@queries'
import { SectorCardHeader } from './SectorCardHeader'
import { SectorList } from './SectorList'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingAnimation, NoData } from '@components'

export const CourseManagement = () => {
    // Call api here
    const [itemPerPage, setItemPerPage] = useState<any>(50)
    const [page, setPage] = useState(1)
    const router = useRouter()
    const { data, isLoading, isError, isFetching } =
        SubAdminApi.Industry.useIndustryRequestedCourses(
            {
                id: router.query.id,
                params: {
                    search: `status:approved`,
                    skip: itemPerPage * page - itemPerPage,
                    limit: itemPerPage,
                },
            },
            {
                skip: !router.query.id,
                refetchOnMountOrArgChange: true,
            }
        )
    return (
        <div className="p-6">
            <SectorCardHeader />
            <div className="overflow-auto custom-scrollbar h-[400px] mt-4">
                {isError && <NoData text="Something went wrong" />}
                {isLoading ? (
                    <LoadingAnimation height="h-20" />
                ) : data?.data?.length > 0 ? (
                    <>
                        {data?.data?.map((course: any, i: number) => (
                            <SectorList
                                keys={course?.id}
                                requestList={course}
                            />
                        ))}
                    </>
                ) : (
                    !isError && <NoData text="No data found" />
                )}
            </div>
        </div>
    )
}
