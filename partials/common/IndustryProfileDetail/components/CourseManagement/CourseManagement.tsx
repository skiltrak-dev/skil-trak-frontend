import { LoadingAnimation, NoData } from '@components'
import { SubAdminApi } from '@queries'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { CourseCard } from './CourseCard'
import { PendingCourses } from './PendingCourses'
import { SectorCardHeader } from './SectorCardHeader'
import { RenderCourseList, RenderTabButton } from './components'
import { courseManagementTabs } from './data'
import { useCourseManagement } from './hooks'

export const CourseManagement = ({ industry }: { industry: Industry }) => {
    const { computedData, toggleTab, toggleTabHandler } = useCourseManagement()

    const renderContent = () => {
        if (computedData.showTabs) {
            return (
                <>
                    <div className="flex items-center gap-x-2">
                        {courseManagementTabs?.map((tab) => (
                            <RenderTabButton
                                key={tab?.tab}
                                {...tab}
                                onClick={() => toggleTabHandler(tab?.tab)}
                                toggleTab={toggleTab}
                            />
                        ))}
                    </div>

                    {toggleTab === 'pending' ? (
                        <PendingCourses />
                    ) : (
                        <div className="max-h-[380px] min-h-[370px] overflow-auto custom-scrollbar">
                            <RenderCourseList industry={industry} />
                        </div>
                    )}
                </>
            )
        }

        return (
            <div className="max-h-[380px] min-h-[370px] overflow-auto custom-scrollbar">
                <RenderCourseList industry={industry} />
            </div>
        )
    }

    return (
        <div className="p-6">
            <SectorCardHeader />
            {renderContent()}
        </div>
    )
}

export const CourseManagements = ({ industry }: { industry: Industry }) => {
    const router = useRouter()
    const [isEntered, setIsEntered] = useState<boolean>(false)
    const [toggleTab, setToggleTab] = useState<'pending' | 'approved'>(
        'approved'
    )

    const { data, isLoading, isError } =
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
                                            <NoData
                                                text={
                                                    'No Data Found asdasdadaccccc'
                                                }
                                            />
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
                                                    return (
                                                        <CourseCard
                                                            key={item?.id}
                                                            data={item}
                                                            industry={industry}
                                                            isPending
                                                        />
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
                                    <NoData text={'No Data Found sdf'} />
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
