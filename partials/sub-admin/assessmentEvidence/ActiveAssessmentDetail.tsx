import { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'
//components
import {
    AssessmentFolderCard,
    AssessmentResponse,
    Button,
    Checkbox,
    CourseCard,
    FinalResult,
    LoadingAnimation,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'
import {
    Actions,
    AssessmentFolders,
    DownloadFiles,
    FolderFilesUpload,
    ShowSubmittionButton,
    SubmissionMessage,
} from './components'

// queries
import { Result, UserRoles } from '@constants'
import { useNotification } from '@hooks'
import {
    CommonApi,
    SubAdminApi,
    useGetAgrementFileQuery,
    useGetAssessmentEvidenceDetailQuery,
    useGetAssessmentResponseQuery,
    useGetSubAdminStudentDetailQuery,
    useGetSubAdminStudentWorkplaceQuery,
    useMaulallyReopenSubmissionRequestMutation,
    useStudentAssessmentCoursesQuery,
} from '@queries'
import {
    WorkplaceCurrentStatus,
    ellipsisText,
    getCourseResult,
    getUserCredentials,
} from '@utils'
import { useRouter } from 'next/router'
import { AiFillDelete } from 'react-icons/ai'

const AgreementFile = 'agreementFile'

export const ActiveAssessmentDetail = ({
    studentId,
    studentUserId,
}: {
    studentId: number
    studentUserId: number
}) => {
    const router = useRouter()

    const { course, folder } = router.query

    const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)
    const [manualReOpen, setManualReOpen] = useState<boolean>(false)
    const [editAssessment, setEditAssessment] = useState<boolean>(false)

    const results = getCourseResult(selectedCourse?.results)

    const { notification } = useNotification()

    // query
    const studentProfile = useGetSubAdminStudentDetailQuery(Number(studentId), {
        skip: !studentId,
        refetchOnMountOrArgChange: true,
    })
    const studentCourses = useStudentAssessmentCoursesQuery(Number(studentId), {
        skip: !studentId,
        refetchOnMountOrArgChange: true,
    })
    const getFolders = useGetAssessmentEvidenceDetailQuery(
        { courseId: Number(selectedCourse?.id), studentId: Number(studentId) },
        {
            skip: !selectedCourse,
        }
    )
    const workplace = useGetSubAdminStudentWorkplaceQuery(Number(studentId), {
        skip: !studentId,
    })
    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: !UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
    })

    const latestWorkplace = workplace?.data?.reduce(
        (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
        {
            currentStatus: WorkplaceCurrentStatus.NotRequested,
        }
    )

    // const latestWorkplace = workplace?.data?.reduce(
    //     (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
    //     {
    //         currentStatus: WorkplaceCurrentStatus.NotRequested,
    //     }
    // )

    const appliedIndustry = latestWorkplace?.industries?.find(
        (industry: any) => industry?.applied
    )

    const getAssessmentResponse = useGetAssessmentResponseQuery(
        {
            selectedFolder: Number(selectedFolder?.id),
            student: Number(studentUserId),
        },
        {
            skip:
                !selectedFolder ||
                !studentUserId ||
                selectedFolder?.id === AgreementFile,
        }
    )

    const viewAgreement = CommonApi.Agreement.viewAgreement({
        course: selectedCourse?.id,
        industry: appliedIndustry?.industry?.id,
        student: Number(studentId),
    })

    const [manullyReopenSubmission, manuallyReopenSubmissionResult] =
        useMaulallyReopenSubmissionRequestMutation()

    useEffect(() => {
        setEditAssessment(false)
    }, [selectedCourse])

    useEffect(() => {
        if (
            studentCourses.isSuccess ||
            manuallyReopenSubmissionResult.isSuccess
        ) {
            setSelectedCourse(
                selectedCourse
                    ? studentCourses?.data?.find(
                          (c: any) => c?.id === selectedCourse?.id
                      )
                    : //   for subadmin portal assessment submission page
                    course
                    ? studentCourses?.data?.find(
                          (c: any) => c?.id == Number(course)
                      )
                    : studentCourses?.data && studentCourses?.data[0]
            )
        }
    }, [studentCourses, manuallyReopenSubmissionResult, course])

    useEffect(() => {
        if (getFolders.isSuccess) {
            setSelectedFolder(
                selectedFolder
                    ? getFolders?.data?.find(
                          (folder: any) => folder?.id === selectedFolder?.id
                      )
                    : folder
                    ? getFolders?.data?.find(
                          (f: any) => f?.id === Number(folder)
                      )
                    : getFolders?.data[0]
            )
        }
    }, [getFolders])

    useEffect(() => {
        if (manuallyReopenSubmissionResult.isSuccess) {
            notification.success({
                title: 'Successfully Opened Request Manually',
                description: 'Successfully Opened Request Manually',
            })
        }
    }, [manuallyReopenSubmissionResult])

    const allCommentsAdded = getFolders?.data?.every(
        (f: any) => f?.studentResponse[0]?.comment
    )

    const onManuallyReopen = (event: any) => {
        manullyReopenSubmission(results?.id)
    }

    const role = getUserCredentials()?.role

    const [archiveFile, archiveFileResult] =
        SubAdminApi.AssessmentEvidence.archiveUploadedFile()

    useEffect(() => {
        if (archiveFileResult.isSuccess) {
            notification.success({
                title: 'File Removed',
                description: 'File Removed Successfully',
            })
        }
    }, [archiveFileResult])

    const deleteUploadedFileAction = (fileId: number) => {
        return (
            <div
                className="bg-white p-1 rounded-full shadow-md cursor-pointer"
                onClick={() => {
                    archiveFile(fileId)
                }}
            >
                {archiveFileResult?.isLoading &&
                archiveFileResult?.originalArgs === fileId ? (
                    <PulseLoader size={3} />
                ) : (
                    <AiFillDelete className="text-red-500 text-sm" />
                )}
            </div>
        )
    }

    const isFilesUploaded =
        !getFolders.isLoading &&
        !getFolders.isFetching &&
        getFolders.isSuccess &&
        getFolders?.data?.every(
            (f: any) => f?.studentResponse[0]?.files?.length > 0
        )

    const files = getFolders?.data
        ?.map((f: any) => f?.studentResponse?.[0]?.files?.length > 0)
        ?.filter((f: any) => f)?.length

    const rejectedFolderes = getFolders?.data?.filter(
        (f: any) => f?.studentResponse?.[0]?.status === 'rejected'
    )?.length

    const resubmitFiles = getFolders?.data?.filter(
        (f: any) => f?.studentResponse?.[0]?.reSubmitted
    )?.length

    const isResubmittedFiles =
        !getFolders.isLoading &&
        !getFolders.isFetching &&
        getFolders.isSuccess &&
        rejectedFolderes === resubmitFiles &&
        Number(files) > 0

    return (
        <div className="mb-10">
            <ShowErrorNotifications result={archiveFileResult} />

            {studentCourses?.isLoading ? (
                <div className="flex flex-col justify-center items-center gap-y-2">
                    <LoadingAnimation size={60} />
                    <Typography variant={'label'}>
                        Student Assessment Course Loading
                    </Typography>
                </div>
            ) : studentCourses?.data && studentCourses?.data?.length > 0 ? (
                <div className="mb-3 grid grid-cols-3 gap-2">
                    {studentCourses?.data?.map((course: any) => (
                        <CourseCard
                            key={course.id}
                            selectedCourseId={selectedCourse?.id}
                            course={course}
                            result={course?.results?.reduce(
                                (a: any, b: any) =>
                                    a?.createdAt > b?.createdAt ? a : b,
                                {
                                    result: Result.NotSubmitted,
                                }
                            )}
                            onClick={() => {
                                setSelectedCourse(course)
                            }}
                        />
                    ))}
                </div>
            ) : (
                <NoData
                    text={
                        'No Assessment Courses Were Found or No Submission from Student received yet'
                    }
                />
            )}

            {/* Assessment Evidence Folders */}
            {studentCourses?.data && studentCourses?.data?.length > 0 && (
                <div>
                    <div className="flex justify-between items-center">
                        <Typography variant={'label'} color={'text-gray-700'}>
                            <span className="font-bold text-black">
                                Assessment Submission
                            </span>{' '}
                            - Submission #{results?.totalSubmission || 0}
                        </Typography>
                        <div className="flex items-center gap-x-1">
                            <Typography
                                variant={'label'}
                                color={'text-gray-500'}
                            >
                                Assessor:{' '}
                                <span className="font-semibold text-black">
                                    {results?.assessor?.name || 'Not Assessesd'}
                                </span>
                            </Typography>

                            <DownloadFiles
                                studentId={studentId}
                                studentProfile={studentProfile}
                                selectedCourse={selectedCourse}
                            />

                            <FolderFilesUpload
                                results={results}
                                studentId={studentId}
                                AgreementFile={AgreementFile}
                                appliedIndustry={appliedIndustry}
                                selectedFolder={selectedFolder}
                                studentProfile={studentProfile}
                                latestWorkplace={latestWorkplace}
                            />
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex justify-between items-center">
                        <div className="p-2">
                            <Typography
                                variant={'small'}
                                color={'text-gray-700'}
                            >
                                Selected Course
                            </Typography>
                            <Typography variant={'label'}>
                                {/* {selectedFolder?.name ||
                                        'No Folder Selected'} */}
                                {ellipsisText(selectedCourse?.title, 30) ||
                                    'None Selected'}
                            </Typography>
                        </div>
                        <ShowSubmittionButton
                            results={results}
                            getFolders={getFolders}
                            selectedCourse={selectedCourse}
                            studentProfile={studentProfile}
                            isFilesUploaded={isFilesUploaded}
                            isResubmittedFiles={isResubmittedFiles}
                        />
                    </div>
                    <div className="grid grid-cols-3 h-[450px]">
                        <div className="border border-gray-300 border-r-transparent h-[inherit] overflow-hidden">
                            <AssessmentFolders
                                getFolders={getFolders}
                                AgreementFile={AgreementFile}
                                selectedFolder={selectedFolder}
                                selectedCourse={selectedCourse}
                                latestWorkplace={latestWorkplace}
                                appliedIndustry={appliedIndustry}
                                setSelectedFolder={setSelectedFolder}
                            />
                        </div>

                        {/* Assessment Response */}
                        <div className="col-span-2 bg-white border border-gray-300 overflow-auto">
                            <AssessmentResponse
                                getAssessmentResponse={
                                    selectedFolder?.id === AgreementFile
                                        ? {
                                              ...viewAgreement,
                                              data: {
                                                  files: [
                                                      ...viewAgreement?.data?.map(
                                                          (agreement: any) => ({
                                                              ...agreement,
                                                              type: 'docs',
                                                              agreement: true,
                                                          })
                                                      ),
                                                  ],
                                              },
                                          }
                                        : getAssessmentResponse
                                }
                                folder={selectedFolder}
                                studentId={studentId}
                                assessmentEvidenceView={true}
                                result={results}
                                deleteAction={deleteUploadedFileAction}
                                activeAssessment={
                                    selectedFolder?.id !== AgreementFile
                                }
                                editAssessment={editAssessment}
                                isAgreement={selectedFolder?.isAgreement}
                                studentData={studentProfile?.data}
                                courseId={selectedCourse?.id}
                            />
                        </div>
                    </div>

                    {results?.isAssessed && !editAssessment && (
                        <div className="flex my-3">
                            <Button
                                text={'Change Result'}
                                onClick={() => {
                                    setEditAssessment(true)
                                }}
                                variant={'info'}
                            />
                        </div>
                    )}

                    {((allCommentsAdded &&
                        ((results?.result !== Result.Competent &&
                            results?.isSubmitted) ||
                            manualReOpen)) ||
                        editAssessment) && (
                        <Actions
                            studentId={studentId}
                            result={results}
                            setEditAssessment={setEditAssessment}
                            course={selectedCourse}
                        />
                    )}
                    <FinalResult
                        results={selectedCourse?.results}
                        folders={getFolders?.data}
                        courseName={selectedCourse?.title}
                    />
                    {/* <Actions result={results} /> */}
                    {(role === UserRoles.ADMIN || subadmin?.data?.isAdmin) &&
                        results?.totalSubmission >= 3 &&
                        results?.result !== Result.Pending &&
                        !results?.isManualSubmission && (
                            <div className="mt-5 flex flex-col gap-y-1">
                                <Typography variant={'small'}>
                                    Student Has Submitted 3 times, now you can
                                    manually reopen the submit request on
                                    request on Student
                                </Typography>
                                <Checkbox
                                    label={'Manual Re Open'}
                                    name={'manualReOpen'}
                                    loading={
                                        manuallyReopenSubmissionResult?.isLoading
                                    }
                                    onChange={(e: any) => {
                                        onManuallyReopen(e)
                                        // setManualReOpen(e.target.checked)
                                    }}
                                />
                            </div>
                        )}

                    <SubmissionMessage
                        allCommentsAdded={allCommentsAdded as boolean}
                    />
                </div>
            )}
        </div>
    )
}
