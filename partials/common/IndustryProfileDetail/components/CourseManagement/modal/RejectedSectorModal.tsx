import { LoadingAnimation, NoData, Typography } from '@components'
import React, { useState } from 'react'
import { TextInfo } from '../TextInfo'
import { useRouter } from 'next/router'
import { SubAdminApi } from '@queries'

export const RejectedSectorModal = () => {
    const [itemPerPage, setItemPerPage] = useState<any>(50)
    const [page, setPage] = useState(1)
    const router = useRouter()
    const { data, isLoading, isError, isFetching } =
        SubAdminApi.Industry.useIndustryRequestedCourses(
            {
                id: router.query.id,
                params: {
                    search: `status:rejected`,
                    skip: itemPerPage * page - itemPerPage,
                    limit: itemPerPage,
                },
            },
            {
                skip: !router.query.id,
                refetchOnMountOrArgChange: true,
            }
        )

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }

    return (
        <div className="min-w-96">
            <Typography variant="h4">Rejected Industry</Typography>

            <div className="flex flex-col gap-y-4 w-full mt-4">
                {isError && <NoData text="Something went wrong" />}
                {isLoading ? (
                    <LoadingAnimation height="h-20" />
                ) : data?.data?.length > 0 ? (
                    <>
                        {data?.data?.map((item: any) => (
                            <div
                                key={item.id}
                                className="border border-[#6B7280] p-4 rounded-md bg-[#95C6FB26] bg-opacity-15 mt-4 w-full"
                            >
                                <div className="flex justify-between gap-x-12 items-center w-full">
                                    <TextInfo
                                        title="Industry Name"
                                        text={item?.industry?.user?.name}
                                    />
                                    <TextInfo
                                        title="Sector"
                                        text={item?.courses?.[0]?.sector?.name}
                                    />
                                    <div className="">
                                        <Typography
                                            variant="muted"
                                            color="text-gray-500"
                                        >
                                            Courses
                                        </Typography>
                                        <div className="flex items-center gap-x-1 relative gap-y-2 flex-wrap mt-2">
                                            {item?.courses?.map(
                                                (course: any) => (
                                                    <div
                                                        key={course.id}
                                                        className="group relative mb-2"
                                                    >
                                                        <div className="size-2 bg-gray-500 rounded-full cursor-pointer"></div>
                                                        <div className="invisible group-hover:visible transform -translate-x-1/2 absolute left-1/2 top-2 bottom-full mb-2 z-10">
                                                            <div className="bg-white border rounded-md px-2 py-1 shadow-lg whitespace-nowrap">
                                                                <Typography variant="small">
                                                                    {
                                                                        course?.title
                                                                    }{' '}
                                                                    -{' '}
                                                                    {
                                                                        course?.code
                                                                    }
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <TextInfo
                                        title="Department HOD"
                                        text={item?.actionBy?.name ?? 'NA'}
                                    />
                                </div>

                                <div className="mt-4 bg-red-900 text-white rounded-lg p-4">
                                    {/* <Typography variant="subtitle" color="text-white">
                                    Description
                                </Typography>
    
                                <Typography variant="small" color="text-white">
                                    {item.description}
                                </Typography> */}

                                    {item?.note && (
                                        <div className="">
                                            <Typography
                                                variant="subtitle"
                                                color="text-white"
                                            >
                                                Rejection Note
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="text-white"
                                            >
                                                {item?.note}
                                            </Typography>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-center text-xs mt-2">
                                    DATE:{' '}
                                    <span className="font-semibold ml-1">
                                        {formatDate(item?.createdAt)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    !isError && <NoData text="No data found" />
                )}
            </div>
        </div>
    )
}
