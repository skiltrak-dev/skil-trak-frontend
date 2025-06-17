import { useState } from 'react'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import { SectorCardHeader } from './SectorCardHeader'

import { CourseCard, PendingCourseCard } from './CourseCard'
import { Waypoint } from 'react-waypoint'
import { LoadingAnimation, NoData } from '@components'
import { Industry } from '@types'
import { PendingCourses } from './PendingCourses'

export const CourseManagement = ({ industry }: { industry: Industry }) => {
    const router = useRouter()
    const [isEntered, setIsEntered] = useState<boolean>(false)
    const [toggleTab, setToggleTab] = useState<'pending' | 'approved'>(
        'approved'
    )

    const { data, isLoading, isError, isFetching } =
        SubAdminApi.Industry.useIndustryRequestedCourses(
            {
                id: router.query.id,
                params: {
                    search: `status:approved`,
                    skip: 50 * 1 - 50,
                    limit: 50,
                },
            },
            {
                skip: !router.query.id || !isEntered,
                refetchOnMountOrArgChange: true,
            }
        )
    const pendingCourses = SubAdminApi.Industry.useIndustryRequestedCourses(
        {
            id: router.query.id,
            params: {
                search: `status:pending`,
                skip: 50 * 1 - 50,
                limit: 50,
            },
        },
        {
            skip: !router.query.id,
            refetchOnMountOrArgChange: true,
        }
    )
    const industryPreviousCourses =
        SubAdminApi.Industry.usePreviousIndustryCourses(router.query.id, {
            skip: !router.query.id,
        })
    const allEmpty = industryPreviousCourses?.data?.every(
        (item: any) =>
            item.courses.length === 0 &&
            item.industryCourseApprovals.length === 0
    )
    const onClickTab = () => {
        setToggleTab((prev) => (prev === 'approved' ? 'pending' : 'approved'))
    }
    return (
        <Waypoint
            onEnter={() => setIsEntered(true)}
            onLeave={() => setIsEntered(false)}
        >
            <div className="p-6">
                <SectorCardHeader />
                {(data?.data?.length > 0 || !allEmpty) &&
                pendingCourses?.data?.data?.length > 0 ? (
                    <>
                        <div className="flex items-center gap-x-2">
                            <div
                                className={`cursor-pointer  ${
                                    toggleTab === 'approved'
                                        ? 'text-link border-b-2 border-b-link font-semibold'
                                        : 'text-gray-500'
                                }`}
                                onClick={onClickTab}
                            >
                                Approved
                            </div>{' '}
                            <div
                                className={`cursor-pointer ${
                                    toggleTab === 'pending'
                                        ? 'text-link border-b-2 border-b-link font-semibold'
                                        : 'text-gray-500'
                                }`}
                                onClick={onClickTab}
                            >
                                Pending
                            </div>
                        </div>
                        {toggleTab === 'pending' && (
                            <>
                                <PendingCourses />
                            </>
                        )}
                        {toggleTab === 'approved' && (
                            <>
                                {(isError ||
                                    industryPreviousCourses.isError) && (
                                    <NoData text={'Something went wrong'} />
                                )}
                                <div className="max-h-[380px] min-h-[370px] overflow-auto custom-scrollbar">
                                    {isLoading ||
                                    industryPreviousCourses.isLoading ||
                                    pendingCourses?.data.isLoading ? (
                                        <LoadingAnimation height="32" />
                                    ) : data?.data?.length === 0 && allEmpty ? (
                                        <>
                                            {pendingCourses?.data?.data
                                                ?.length > 0 && (
                                                <div className="flex flex-col gap-y-3">
                                                    {pendingCourses?.data?.data?.map(
                                                        (item: any) => {
                                                            console.log(
                                                                'item',
                                                                item
                                                            )
                                                            return item?.industryCourseApprovals?.map(
                                                                (
                                                                    approval: any
                                                                ) => (
                                                                    // <PendingCourseCard
                                                                    //     // key={item.id}
                                                                    //     pendingCourse={approval}
                                                                    // />
                                                                    <CourseCard
                                                                        key={
                                                                            item?.id
                                                                        }
                                                                        data={
                                                                            item
                                                                        }
                                                                        industry={
                                                                            industry
                                                                        }
                                                                        isPending
                                                                    />
                                                                )
                                                            )
                                                        }
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    ) : data?.data?.length > 0 ||
                                      industryPreviousCourses?.data?.length >
                                          0 ? (
                                        <div className="flex flex-col gap-y-3">
                                            {industryPreviousCourses?.data?.map(
                                                (item: any) => (
                                                    <CourseCard
                                                        key={item.id}
                                                        data={item}
                                                        isPreviousCourses={true}
                                                    />
                                                )
                                            )}
                                            {data?.data?.map((item: any) => (
                                                <CourseCard
                                                    key={item?.id}
                                                    data={item}
                                                    industry={industry}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        !isError &&
                                        !industryPreviousCourses.isError && (
                                            <NoData text={'No Data Found'} />
                                        )
                                    )}
                                    {/* Pending Course */}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {(isError || industryPreviousCourses.isError) && (
                            <NoData text={'Something went wrong'} />
                        )}
                        <div className="max-h-[380px] min-h-[370px] overflow-auto custom-scrollbar">
                            {isLoading ||
                            industryPreviousCourses.isLoading ||
                            pendingCourses?.data.isLoading ? (
                                <LoadingAnimation height="32" />
                            ) : data?.data?.length === 0 && allEmpty ? (
                                <>
                                    {pendingCourses?.data?.data?.length > 0 && (
                                        <div className="flex flex-col gap-y-3">
                                            {pendingCourses?.data?.data?.map(
                                                (item: any) => {
                                                    console.log('item', item)
                                                    return item?.industryCourseApprovals?.map(
                                                        (approval: any) => (
                                                            // <PendingCourseCard
                                                            //     // key={item.id}
                                                            //     pendingCourse={approval}
                                                            // />
                                                            <CourseCard
                                                                key={item?.id}
                                                                data={item}
                                                                industry={
                                                                    industry
                                                                }
                                                                isPending
                                                            />
                                                        )
                                                    )
                                                }
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : data?.data?.length > 0 ||
                              industryPreviousCourses?.data?.length > 0 ? (
                                <div className="flex flex-col gap-y-3">
                                    {industryPreviousCourses?.data?.map(
                                        (item: any) => (
                                            <CourseCard
                                                key={item.id}
                                                data={item}
                                                isPreviousCourses={true}
                                            />
                                        )
                                    )}
                                    {data?.data?.map((item: any) => (
                                        <CourseCard
                                            key={item?.id}
                                            data={item}
                                            industry={industry}
                                        />
                                    ))}
                                </div>
                            ) : (
                                !isError &&
                                !industryPreviousCourses.isError && (
                                    <NoData text={'No Data Found'} />
                                )
                            )}
                            {/* Pending Course */}
                        </div>
                    </>
                )}
            </div>
        </Waypoint>
    )
}
