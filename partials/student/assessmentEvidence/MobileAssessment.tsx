import {
    CourseCard,
    LoadingAnimation,
    NoData,
    Typography,
    AssessmentFolderCard,
} from '@components'
import { AssessmentFolderDetailX } from '@components/sections/student/AssessmentsContainer'
import { Actions } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/components/Actions'
import { Result } from '@constants'
import { IoIosArrowRoundBack } from 'react-icons/io'

export const MobileAssessment = ({
    result,
    selectedFolder,
    selectedCourse,
    setSelectedCourse,
    setSelectedFolder,
    assessmentsFolders,
    assessmentsCourses,
    isFilesUploaded,
}: {
    result: any
    selectedFolder: any
    selectedCourse: any
    assessmentsCourses: any
    assessmentsFolders: any
    setSelectedCourse: Function
    setSelectedFolder: Function
    isFilesUploaded: any
}) => {
    return (
        <div>
            {!selectedFolder && !selectedCourse && (
                <div className="mb-3">
                    {assessmentsCourses.isLoading ? (
                        <div className="flex flex-col items-center">
                            <LoadingAnimation size={50} />
                            <Typography variant={'subtitle'}>
                                Course Loading
                            </Typography>
                        </div>
                    ) : assessmentsCourses?.data &&
                      assessmentsCourses?.data?.length > 0 ? (
                        <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {assessmentsCourses?.data?.map((course: any) => (
                                <CourseCard
                                    key={course?.id}
                                    course={course}
                                    result={course?.results?.reduce(
                                        (a: any, b: any) =>
                                            a.totalSubmission >
                                            b.totalSubmission
                                                ? a
                                                : b,
                                        {
                                            result: Result.NotSubmitted,
                                        }
                                    )}
                                    selectedCourseId={selectedCourse?.id}
                                    onClick={() => {
                                        setSelectedCourse(course)
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <NoData text={'No Course Were Found'} />
                    )}
                </div>
            )}

            {/* folders */}
            {selectedCourse && !selectedFolder && (
                <>
                    <div
                        className={
                            'group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-muted hover:text-muted-dark rounded-lg cursor-pointer'
                        }
                        onClick={() => setSelectedCourse(null)}
                    >
                        <IoIosArrowRoundBack className="transition-all inline-flex text-base group-hover:-translate-x-1" />
                        <span className="ml-2">{'Back To Courses'}</span>
                    </div>
                    <Typography variant="label" color="text-black">
                        {selectedCourse?.title}
                    </Typography>
                    <div className="w-full md:w-1/3 h-full ">
                        <div className="flex items-center gap-x-1 mb-1">
                            <Typography variant="label" color="text-black">
                                Assessment Submission -
                            </Typography>
                            <Typography variant="muted" color="text-gray-500">
                                Submission #
                                {result?.totalSubmission
                                    ? result?.totalSubmission + 1
                                    : 1}
                            </Typography>
                        </div>
                        <div className="bg-white border-r min-h-[400px]">
                            {assessmentsFolders.isError && (
                                <NoData text={'There is Some Network Issue'} />
                            )}
                            {assessmentsFolders.isLoading ? (
                                <div className="flex flex-col items-center pt-12">
                                    <LoadingAnimation size={50} />
                                    <Typography variant={'subtitle'}>
                                        Assessment Folders Loading
                                    </Typography>
                                </div>
                            ) : (
                                assessmentsFolders.isSuccess && (
                                    <>
                                        <div className="p-2 bg-white border-b border-gray-200">
                                            <Typography
                                                variant={'xs'}
                                                color={'text-gray-500'}
                                            >
                                                Submission For
                                            </Typography>
                                            <Typography variant={'label'}>
                                                {
                                                    assessmentsFolders?.data[0]
                                                        ?.course?.title
                                                }
                                            </Typography>
                                        </div>
                                        {assessmentsFolders?.data &&
                                        assessmentsFolders?.data?.length > 0 ? (
                                            assessmentsFolders?.data?.map(
                                                (folder: any) => (
                                                    <AssessmentFolderCard
                                                        key={folder.id}
                                                        id={folder.id}
                                                        isAgreement={
                                                            folder?.isAgreement
                                                        }
                                                        name={folder.name}
                                                        isActive={
                                                            folder.isActive
                                                        }
                                                        response={
                                                            folder
                                                                ?.studentResponse[0]
                                                        }
                                                        selectedFolderId={
                                                            selectedFolder?.id
                                                        }
                                                        onClick={() => {
                                                            setSelectedFolder(
                                                                folder
                                                            )
                                                        }}
                                                        assessment
                                                    />
                                                )
                                            )
                                        ) : (
                                            <NoData
                                                text={'No Folders Were Found'}
                                            />
                                        )}
                                    </>
                                )
                            )}
                        </div>
                    </div>

                    {isFilesUploaded ? (
                        selectedCourse?.results?.length > 0 ? (
                            (result?.totalSubmission < 3 ||
                                result?.isManualSubmission) &&
                            (result?.result === Result.ReOpened ||
                                result?.result === Result.NotCompetent) ? (
                                <Actions
                                    selectedCourseId={selectedCourse?.id}
                                    results={selectedCourse?.results}
                                    isFilesUploaded={isFilesUploaded}
                                />
                            ) : null
                        ) : (
                            <Actions
                                selectedCourseId={selectedCourse?.id}
                                results={selectedCourse?.results}
                                isFilesUploaded={isFilesUploaded}
                            />
                        )
                    ) : null}
                </>
            )}

            {selectedCourse && selectedFolder && (
                <>
                    <div
                        className={
                            'group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-muted hover:text-muted-dark rounded-lg cursor-pointer'
                        }
                        onClick={() => setSelectedFolder(null)}
                    >
                        <IoIosArrowRoundBack className="transition-all inline-flex text-base group-hover:-translate-x-1" />
                        <span className="ml-2">{'Back To Folders'}</span>
                    </div>
                    <AssessmentFolderDetailX
                        fileUpload
                        folder={selectedFolder}
                    />
                </>
            )}

            <div className="my-2">
                <Typography variant="muted" color="text-neutral-500">
                    *You will be able to submit assessment request after you
                    upload at least one attachment to each folder mentioned
                    above.
                </Typography>
            </div>
        </div>
    )
}
