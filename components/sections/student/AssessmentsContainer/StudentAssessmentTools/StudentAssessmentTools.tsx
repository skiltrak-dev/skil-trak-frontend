import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
// components
import {
    Button,
    Card,
    Desktop,
    LoadingAnimation,
    Mobile,
    NoData,
    Typography,
} from '@components'
import { AssessmentCourse, DownloadableFile } from '..'
// queries
import {
    useGetStudentAssessmentToolQuery,
    useGetStudentCoursesQuery,
} from '@queries'

type Props = {
    role: 'RTO' | 'Student'
    actions?: Function | undefined
}

export const StudentAssessmentTools = ({ role, actions }: Props) => {
    const router = useRouter()
    const [selectedCourseId, setSelectedCourseId] = useState<any | null>(null)
    const {
        data: coursesData,
        isLoading,
        isError,
        isSuccess,
    } = useGetStudentCoursesQuery()

    const getAssessmentTools = useGetStudentAssessmentToolQuery(
        selectedCourseId,
        {
            skip: !selectedCourseId,
        }
    )

    useEffect(() => {
        if (isSuccess && !selectedCourseId) {
            setSelectedCourseId(
                selectedCourseId
                    ? coursesData?.find(
                          (c: any) => c?.id === selectedCourseId?.id
                      )?.id
                    : coursesData[0]?.id
            )
        }
    }, [coursesData, isSuccess])

    console.log('coursesData', coursesData)

    return (
        <div>
            <div className="mb-2">
                <Typography variant="muted" color="text-gray-400">
                    *You can access all your assessment tools by clicking on
                    download button for your placement unit you are currently
                    enrolled in.
                </Typography>
            </div>
            <Desktop>
                <Card noPadding>
                    <div className="flex">
                        <div className="w-[25%] border-r">
                            <div className={`p-3.5`}>
                                <Typography variant="label" color="text-black">
                                    Select a Course
                                </Typography>
                            </div>
                            {isError && <NoData text={'Network Issue'} />}
                            {isLoading ? (
                                <LoadingAnimation size={60} />
                            ) : (
                                <>
                                    {coursesData?.map((course: any) => (
                                        <AssessmentCourse
                                            key={course.id}
                                            code={course?.code}
                                            name={course?.title}
                                            id={course.id}
                                            onClick={() =>
                                                setSelectedCourseId(course?.id)
                                            }
                                            selectedCourseId={selectedCourseId}
                                        />
                                    ))}
                                    <AssessmentCourse
                                        code={'-'}
                                        name={'Miscellaneous'}
                                        id={0}
                                        onClick={() => setSelectedCourseId(-1)}
                                        selectedCourseId={selectedCourseId?.id}
                                    />
                                </>
                            )}
                        </div>
                        <div className="w-[75%]">
                            {role === 'RTO' && (
                                <>
                                    <div className="flex justify-end gap-x-2.5 p-4">
                                        <Button
                                            variant="primary"
                                            text="ADD ASSESSMENT"
                                        />
                                        <Button
                                            variant="dark"
                                            text="VIEW ARCHIVED"
                                            onClick={() => {
                                                router.push(
                                                    `/portals/sub-admin/users/rtos/profile/7?tab=archived-assessments`
                                                )
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                            <div
                                className={`${
                                    role === 'RTO'
                                        ? 'border-b border-t'
                                        : 'border-b'
                                } p-4`}
                            >
                                <div className="flex justify-between">
                                    <Typography
                                        variant="label"
                                        color="text-black"
                                    >
                                        Description
                                    </Typography>
                                    <Typography
                                        variant="label"
                                        color="text-black"
                                    >
                                        Action
                                    </Typography>
                                </div>
                            </div>
                            <div className="p-2 min-h-[260px]">
                                {getAssessmentTools.isError && (
                                    <NoData text={'Network Issue'} />
                                )}
                                {getAssessmentTools.isLoading ||
                                getAssessmentTools.isFetching ? (
                                    <LoadingAnimation size={80} />
                                ) : getAssessmentTools?.data &&
                                  getAssessmentTools?.data?.length > 0 &&
                                  !getAssessmentTools.isError ? (
                                    getAssessmentTools?.data?.map(
                                        (assessment: any) => (
                                            <DownloadableFile
                                                key={assessment.id}
                                                actions={() =>
                                                    actions
                                                        ? actions(assessment)
                                                        : () => {}
                                                }
                                                name={assessment?.title}
                                                archivedView={false}
                                            />
                                        )
                                    )
                                ) : (
                                    !getAssessmentTools.isError && (
                                        <NoData
                                            text={
                                                selectedCourseId
                                                    ? 'No Assessment were found'
                                                    : 'No Course Selected'
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </Desktop>
            <Mobile>
                {!selectedCourseId && (
                    <div className="w-full md:w-[25%] border-r bg-white px-3 pt-2 pb-5 rounded-md">
                        <div className={`p-3.5`}>
                            <Typography variant="label" color="text-black">
                                Select a Course
                            </Typography>
                        </div>

                        {isError && <NoData text={'Network Issue'} />}
                        {isLoading ? (
                            <LoadingAnimation size={50} />
                        ) : coursesData &&
                          coursesData?.length > 0 &&
                          !isError ? (
                            coursesData?.map((course: any, index: any) => (
                                <>
                                    <AssessmentCourse
                                        code={course?.course?.code}
                                        name={course?.title}
                                        id={course.id}
                                        onClick={() =>
                                            setSelectedCourseId(course)
                                        }
                                        selectedCourseId={selectedCourseId?.id}
                                    />
                                </>
                            ))
                        ) : (
                            !isError && (
                                <NoData text={'No Courses were found'} />
                            )
                        )}
                    </div>
                )}

                {selectedCourseId && (
                    <>
                        <div
                            className={
                                'group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-muted hover:text-muted-dark rounded-lg cursor-pointer'
                            }
                            onClick={() => setSelectedCourseId(null)}
                        >
                            <IoIosArrowRoundBack className="transition-all inline-flex text-base group-hover:-translate-x-1" />
                            <span className="ml-2">{'Back To Folders'}</span>
                        </div>
                        <Typography variant="label" color="text-black">
                            Course : {selectedCourseId?.title}
                        </Typography>

                        <div className="bg-white rounded-md p-3">
                            <div
                                className={`${
                                    role === 'RTO'
                                        ? 'border-b border-t'
                                        : 'border-b'
                                } p-4`}
                            >
                                <div className="flex justify-between">
                                    <Typography
                                        variant="label"
                                        color="text-black"
                                    >
                                        Description
                                    </Typography>
                                    <Typography
                                        variant="label"
                                        color="text-black"
                                    >
                                        Action
                                    </Typography>
                                </div>
                            </div>
                            <div className="p-2 min-h-[260px]">
                                {isLoading ? (
                                    <LoadingAnimation size={50} />
                                ) : getAssessmentTools?.data &&
                                  getAssessmentTools?.data?.length > 0 ? (
                                    getAssessmentTools?.data?.map(
                                        (assessment: any) => (
                                            <DownloadableFile
                                                key={assessment.id}
                                                actions={() =>
                                                    actions
                                                        ? actions(
                                                              //   assessment?.id
                                                              assessment
                                                          )
                                                        : () => {}
                                                }
                                                name={assessment?.title}
                                                archivedView={false}
                                            />
                                        )
                                    )
                                ) : (
                                    <NoData text={'No Assessment were found'} />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </Mobile>
            {/* <div className="mt-6">
                <Typography variant="label" color="text-black">
                    What you want to do here?
                </Typography>
            </div>
            <div>
                <Typography variant="label" color="text-blue-500">
                    <Link legacyBehavior href="#">
                        I want to access my assessment tool for enrolled course
                    </Link>
                </Typography>
            </div> */}
        </div>
    )
}
