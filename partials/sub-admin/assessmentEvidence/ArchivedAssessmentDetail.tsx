import { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'

//components
import {
    NoData,
    Checkbox,
    PageTitle,
    CourseCard,
    Typography,
    FinalResult,
    LoadingAnimation,
    AssessmentResponse,
    AssessmentFolderCard,
    Button,
    ShowErrorNotifications,
    ActionButton,
} from '@components'
import { Actions } from './components'

// queries
import { useNotification } from '@hooks'
import {
    useGetArchivedAssessmentEvidenceDetailQuery,
    useGetArchivedAssessmentResponseQuery,
    useMaulallyReopenSubmissionRequestMutation,
    useStudentAssessmentCoursesQuery,
    SubAdminApi,
} from '@queries'
import { ellipsisText, getCourseResult, getUserCredentials } from '@utils'
import { FileUpload } from '@hoc'
import { UploadFile } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/AssessmentFolderDetailX/UploadFile'
import { getDocType } from '@components/sections/student/AssessmentsContainer'
import { useRouter } from 'next/router'
import { AiFillDelete } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import { Result } from '@constants'

export const ArchivedAssessmentDetail = ({
    studentId,
    studentUserId,
}: {
    studentId: string | string[] | undefined
    studentUserId: string | string[] | undefined
}) => {
    const router = useRouter()

    const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)
    const [manualReOpen, setManualReOpen] = useState<boolean>(false)

    const results = getCourseResult(selectedCourse?.results)

    const { notification } = useNotification()

    // query
    const studentCourses = useStudentAssessmentCoursesQuery(Number(studentId), {
        skip: !studentId,
        refetchOnMountOrArgChange: true,
    })
    const getFolders = useGetArchivedAssessmentEvidenceDetailQuery(
        { courseId: Number(selectedCourse?.id), studentId: Number(studentId) },
        {
            skip: !selectedCourse,
        }
    )
    const [uploadDocs, uploadDocsResult] =
        SubAdminApi.AssessmentEvidence.uploadDocs()

    const getArchivedAssessmentResponse = useGetArchivedAssessmentResponseQuery(
        {
            selectedFolder: Number(selectedFolder?.id),
            student: Number(studentUserId),
        },
        { skip: !selectedFolder || !studentUserId }
    )
    const [manullyReopenSubmission, manuallyReopenSubmissionResult] =
        useMaulallyReopenSubmissionRequestMutation()
    const [downloadFiles, downloadFilesResult] =
        SubAdminApi.AssessmentEvidence.downloadArchiveFiles()

    useEffect(() => {
        if (downloadFilesResult.data) {
            window.open(downloadFilesResult?.data?.url)
        }
    }, [downloadFilesResult])

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
                    : studentCourses?.data[0]
            )
        }
    }, [studentCourses, manuallyReopenSubmissionResult])

    useEffect(() => {
        if (getFolders.isSuccess) {
            setSelectedFolder(selectedFolder || getFolders?.data[0])
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

    useEffect(() => {
        if (uploadDocsResult.isSuccess) {
            notification.success({
                title: 'Document Uploaded',
                description: 'Document Uploaded Successfully',
            })
        }
    }, [uploadDocsResult])

    const allCommentsAdded = getFolders?.data?.every(
        (f: any) => f?.studentResponse[0]?.comment
    )

    const onManuallyReopen = (event: any) => {
        manullyReopenSubmission(results?.id)
    }

    const role = getUserCredentials()?.role

    const AddFileButton = ({ name }: { name: string }) => {
        return <UploadFile name={name} loading={uploadDocsResult.isLoading} />
    }

    const onUploadDocs = (docs: any) => {
        const formData = new FormData()
        docs.forEach((doc: any) => {
            formData.append(`${selectedFolder?.name}`, doc)
        })

        uploadDocs({
            studentId,
            body: formData,
            folderId: selectedFolder?.id,
        })
    }

    const onDownloadFiles = () => {
        downloadFiles({
            studentId: Number(studentId),
            courseId: selectedCourse?.id,
        })
    }

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

    return (
        <div className="mb-10">
            <ShowErrorNotifications result={downloadFilesResult} />
            <ShowErrorNotifications result={archiveFileResult} />
            <div className="flex justify-between items-center mb-6"></div>
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
                            id={course.id}
                            code={course.code}
                            title={course.title}
                            isActive={course.isActive}
                            coordinator={getUserCredentials()?.name}
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
                                Archived Assessment Submission
                            </span>{' '}
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
                            <Button
                                text={'Download Archived Files'}
                                variant={'info'}
                                onClick={onDownloadFiles}
                                loading={downloadFilesResult.isLoading}
                                disabled={downloadFilesResult.isLoading}
                            />
                        </div>
                    </div>
                    {/*  */}
                    <div className="p-2">
                        <Typography variant={'small'} color={'text-gray-700'}>
                            Selected Course
                        </Typography>
                        <Typography variant={'label'}>
                            {/* {selectedFolder?.name ||
                                        'No Folder Selected'} */}
                            {ellipsisText(selectedCourse?.title, 30) ||
                                'None Selected'}
                        </Typography>
                    </div>
                    <div className="grid grid-cols-3 h-[450px]">
                        <div className="border border-gray-300 border-r-transparent h-[inherit] overflow-hidden">
                            <div className="bg-white h-[inherit] overflow-y-scroll custom-scrollbar">
                                {getFolders?.isLoading ||
                                getFolders.isFetching ? (
                                    <div className="flex flex-col justify-center items-center gap-y-2 py-5">
                                        <LoadingAnimation size={50} />
                                        <Typography variant={'label'}>
                                            Folders Loading
                                        </Typography>
                                    </div>
                                ) : getFolders?.data &&
                                  getFolders?.data?.length > 0 ? (
                                    getFolders?.data?.map((assessment: any) => (
                                        <AssessmentFolderCard
                                            key={assessment?.id}
                                            id={assessment?.id}
                                            name={assessment?.name}
                                            // isActive={folder.isActive}
                                            selectedFolderId={
                                                selectedFolder?.id
                                            }
                                            response={
                                                assessment?.studentResponse[0]
                                            }
                                            onClick={() => {
                                                setSelectedFolder(assessment)
                                            }}
                                        />
                                    ))
                                ) : (
                                    <NoData text={'No Assessment were found'} />
                                )}
                            </div>
                        </div>

                        {/* Assessment Response */}
                        <div className="col-span-2 bg-white border border-gray-300 overflow-auto">
                            <AssessmentResponse
                                getAssessmentResponse={
                                    getArchivedAssessmentResponse
                                }
                                folder={selectedFolder}
                                studentId={studentId}
                                assessmentEvidenceView={true}
                                result={results}
                                deleteAction={deleteUploadedFileAction}
                            />
                        </div>
                    </div>

                    <FinalResult
                        results={selectedCourse?.results}
                        folders={getFolders?.data}
                        courseName={selectedCourse?.title}
                    />
                </div>
            )}
        </div>
    )
}
