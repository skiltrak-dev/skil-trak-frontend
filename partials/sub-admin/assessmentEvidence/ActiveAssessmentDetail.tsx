import download from 'downloadjs'
import JSZip from 'jszip'
import { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import BeatLoader from 'react-spinners/BeatLoader'
import PuffLoader from 'react-spinners/PuffLoader'
import axios from 'axios'
//components
import {
    NoData,
    Button,
    Checkbox,
    CourseCard,
    FinalResult,
    LoadingAnimation,
    AssessmentResponse,
    AssessmentFolderCard,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { Actions, SubmitSubmissionForAssessment } from './components'

// queries
import { getDocType } from '@components/sections/student/AssessmentsContainer'
import { UploadFile } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/AssessmentFolderDetailX/UploadFile'
import { Result } from '@constants'
import { FileUpload } from '@hoc'
import { useDownloadAssessment, useNotification } from '@hooks'
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
    ThemeColors,
    WorkplaceCurrentStatus,
    ellipsisText,
    getCourseResult,
    getUserCredentials,
} from '@utils'
import { useRouter } from 'next/router'
import { AiFillDelete } from 'react-icons/ai'
import { FaDownload } from 'react-icons/fa'
import { SignAgreement } from '../workplace/components/Industries/components/Actions/components'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const AgreementFile = 'agreementFile'

export const ActiveAssessmentDetail = ({
    studentId,
    studentUserId,
}: {
    studentId: number
    studentUserId: number
}) => {
    const router = useRouter()

    const { course } = router.query

    const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)
    const [manualReOpen, setManualReOpen] = useState<boolean>(false)
    const [editAssessment, setEditAssessment] = useState<boolean>(false)
    const { isAssessmentDownloading, setIsAssessmentDownloading } =
        useDownloadAssessment()

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

    const latestWorkplace = workplace?.data?.reduce(
        (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
        {
            currentStatus: WorkplaceCurrentStatus.NotRequested,
        }
    )

    const appliedIndustry = latestWorkplace?.industries?.find(
        (industry: any) => industry?.applied
    )

    const [uploadDocs, uploadDocsResult] =
        SubAdminApi.AssessmentEvidence.uploadDocs()

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

    const getAgrementFile = useGetAgrementFileQuery(
        { studentId: Number(studentId) },
        { skip: !studentId || selectedFolder?.id !== AgreementFile }
    )

    const viewAgreement = CommonApi.Agreement.viewAgreement({
        course: selectedCourse?.id,
        industry: appliedIndustry?.industry?.id,
        student: Number(studentId),
    })

    const [manullyReopenSubmission, manuallyReopenSubmissionResult] =
        useMaulallyReopenSubmissionRequestMutation()
    const [downloadFiles, downloadFilesResult] =
        SubAdminApi.AssessmentEvidence.downloadFiles()

    useEffect(() => {
        setEditAssessment(false)
    }, [selectedCourse])

    useEffect(() => {
        if (downloadFilesResult.isSuccess) {
            async function createZip(urls: string[]) {
                setIsAssessmentDownloading(true)
                const zip = new JSZip()

                for (let i = 0; i < urls.length; i++) {
                    try {
                        const response = await axios.get(urls[i], {
                            responseType: 'arraybuffer',
                        })
                        const fileName = urls[i]?.split('/')?.reverse()?.[0]
                        zip.file(`${fileName}`, response.data) // You might want to adjust the filename and extension
                    } catch (error) {
                        console.error(
                            `Error fetching or adding file ${i}:`,
                            error
                        )
                        // Optionally, you can log or handle the error here
                    }
                }
                try {
                    const zipContent = await zip.generateAsync({
                        type: 'blob',
                    })
                    const zipUrl = URL.createObjectURL(zipContent)
                    const link = document.createElement('a')
                    link.href = zipUrl
                    link.download = `${studentProfile?.data?.user?.name} Assessment Files`
                    link.click()
                } catch (err) {
                } finally {
                    setIsAssessmentDownloading(false)
                    notification.success({
                        title: 'Successfully Downloaded Shuunr',
                        description: 'Documents Downloading Successfully',
                    })
                }
            }

            createZip(downloadFilesResult?.data)
            // router.push(downloadFilesResult?.data?.url)
            const downloadAssessmentAllFiles = async () => {
                setIsAssessmentDownloading(true)

                const files = [...downloadFilesResult?.data]
                files?.splice(5, 4)

                const zip = new JSZip()
                // const img = new Image()

                // Fetch the images and add them to the zip
                const fetchPromises =
                    downloadFilesResult?.data &&
                    downloadFilesResult?.data?.length > 0 &&
                    downloadFilesResult?.data
                        ?.filter((url: string) => {
                            const img = new Image()
                            img.src = url
                            let isFileWorking = true

                            img.onerror = () => {
                                isFileWorking = false
                                // The image is available, you can perform any action here.
                            }

                            if (isFileWorking && url) {
                                return url
                            }
                        })
                        ?.map(async (url: string, index: number) => {
                            const response = await fetch(url)
                            const fileName = url?.split('/')?.reverse()?.[0]
                            if (response) {
                                const arrayBuffer = await response.arrayBuffer()
                                zip.file(`${fileName}`, arrayBuffer)
                            }
                        })

                await Promise.all(fetchPromises)

                // Generate the zip file
                try {
                    const content = await zip.generateAsync({ type: 'blob' })

                    const strMimeType = 'application/zip'
                    const blob = new Blob([content], { type: strMimeType })
                    // Download the zip file
                    download(
                        blob,
                        `${studentProfile?.data?.user?.name} Assessment Files`
                    )
                } catch (err) {
                } finally {
                    setIsAssessmentDownloading(false)
                    notification.success({
                        title: 'Successfully Downloaded',
                        description: 'Documents Downloading Successfully',
                    })
                }
            }
            // downloadAssessmentAllFiles()
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
                    : //   for subadmin portal assessment submission page
                    course
                    ? studentCourses?.data?.find((c: any) => c?.id == course)
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

        const filteredDocs = [...docs]?.filter((doc) => {
            const docSize = doc?.size / 1024 / 1024
            return docSize <= 150
        })

        if (filteredDocs?.length < docs?.length) {
            notification.warning({
                title: 'Files Removed',
                description: `${docs?.length - filteredDocs?.length} ${
                    docs?.length - filteredDocs?.length === 1
                        ? 'File was'
                        : 'Files were'
                } Removed because its size was greater than 50mb, try to upload the file which has less then 50mb size`,
            })
        }

        filteredDocs.forEach((doc: any) => {
            formData.append(
                selectedFolder?.id === AgreementFile
                    ? 'file'
                    : `${selectedFolder?.name}`,
                doc
            )
        })

        if (filteredDocs?.length)
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
            <ShowErrorNotifications result={uploadDocsResult} />
            <ShowErrorNotifications result={archiveFileResult} />
            <ShowErrorNotifications result={downloadFilesResult} />

            {/* {downloadFilesResult?.isSuccess && (
                <Image
                    src={downloadFilesResult?.data?.[0]}
                    alt={''}
                    width={50}
                    height={50}
                />
            )} */}
            <div className="flex justify-between items-center mb-6">
                {/* <div>
                    {!selectedCourse?.results?.length && (
                        <NotificationMessage
                            title={`No Submission For ${selectedCourse?.title}`}
                            subtitle={
                                'Student didn,t Submitted an assessment request'
                            }
                        />
                    )}
                    {selectedCourse?.results[0]?.result === 'pending' &&
                        results?.totalSubmission === 1 &&
                        !results?.isManualSubmission && (
                            <NotificationMessage
                                title={`New Request For ${selectedCourse?.title}`}
                                subtitle={
                                    'Student Submitted a assessment request'
                                }
                            />
                        )}
                    {selectedCourse?.results[0]?.result === 'pending' &&
                        results?.totalSubmission > 1 &&
                        !results?.isManualSubmission && (
                            <NotificationMessage
                                title={`Request Resubmitted For ${selectedCourse?.title}`}
                                subtitle={
                                    'Student Re-Submitted a assessment request'
                                }
                            />
                        )}
                    {selectedCourse?.results[0]?.result === 'reOpened' &&
                        !results?.isManualSubmission && (
                            <NotificationMessage
                                title={`Student Request Reopened for ${selectedCourse?.title}`}
                                subtitle={
                                    'You hve reopened the student request'
                                }
                            />
                        )}
                    {selectedCourse?.results[0]?.result === 'competent' &&
                        !results?.isManualSubmission && (
                            <NotificationMessage
                                title={`Student is Competent for ${selectedCourse?.title}`}
                                subtitle={
                                    'Student has successfully passed the Assessment'
                                }
                            />
                        )}
                    {selectedCourse?.results[0]?.result === 'notCompetent' &&
                        !results?.isManualSubmission && (
                            <NotificationMessage
                                title={`Student has failed in ${selectedCourse?.title}`}
                                subtitle={
                                    'Student has failed the assessment on this course'
                                }
                            />
                        )}
                    {results?.isManualSubmission && (
                        <NotificationMessage
                            title={`You have manually reopend the student request on ${selectedCourse?.title}`}
                            subtitle={`You have manually reopend the student request on ${selectedCourse?.title}`}
                        />
                    )}
                </div> */}
            </div>
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
                            <Button
                                text={''}
                                variant={'action'}
                                disabled={
                                    downloadFilesResult.isLoading ||
                                    isAssessmentDownloading
                                }
                                {...(!downloadFilesResult.isLoading &&
                                !isAssessmentDownloading
                                    ? { Icon: FaDownload }
                                    : {})}
                                onClick={onDownloadFiles}
                            >
                                {downloadFilesResult.isLoading ||
                                isAssessmentDownloading ? (
                                    <div className=" flex items-center justify-center">
                                        <BeatLoader
                                            size={13}
                                            color={ThemeColors.primary.DEFAULT}
                                        />
                                    </div>
                                ) : (
                                    'Download Files '
                                )}
                            </Button>
                            {/* <Link
                                className="text-xs font-medium uppercase transition-all duration-300 rounded-md border px-4 py-2 shadow focus:outline-none focus:ring-4 bg-white text-dark hover:bg-secondary-dark border-transparent ring-primary-light"
                                href={`${
                                    process.env.NEXT_PUBLIC_END_POINT
                                }/shared/files/download/${Number(studentId)}/${
                                    selectedCourse?.id
                                }`}
                                download
                                referrerPolicy="no-referrer"
                                target="_blank"
                            >
                                <div className="flex items-center gap-x-2">
                                    <FaDownload />
                                    <span>Download Files</span>
                                </div>
                            </Link> */}
                            {/* <FileUpload
                                onChange={onUploadDocs}
                                name={'folder?.name'}
                                component={AddFileButton}
                                multiple
                                limit={
                                    selectedFolder?.id === AgreementFile
                                        ? 10
                                        : Number(selectedFolder?.capacity) -
                                          Number(
                                              selectedFolder?.studentResponse
                                                  ?.length > 0
                                                  ? selectedFolder
                                                        ?.studentResponse[0]
                                                        ?.files?.length
                                                  : 0
                                          )
                                }
                                acceptTypes={getDocType(selectedFolder?.type)}
                            /> */}
                            {results?.result !== Result.Competent && (
                                <div className="flex items-center gap-x-2 mb-1">
                                    <div>
                                        {selectedFolder &&
                                            results !== Result.NotSubmitted &&
                                            (selectedFolder?.id ===
                                            AgreementFile ? (
                                                <SignAgreement
                                                    studentId={Number(
                                                        studentProfile?.data?.id
                                                    )}
                                                    appliedIndustryId={
                                                        appliedIndustry?.id
                                                    }
                                                    student={
                                                        studentProfile?.data
                                                    }
                                                    courses={
                                                        latestWorkplace?.courses
                                                    }
                                                />
                                            ) : selectedFolder ? (
                                                <FileUpload
                                                    onChange={onUploadDocs}
                                                    name={'folder?.name'}
                                                    component={AddFileButton}
                                                    multiple
                                                    limit={
                                                        selectedFolder?.id ===
                                                        AgreementFile
                                                            ? 10
                                                            : Number(
                                                                  selectedFolder?.capacity
                                                              ) -
                                                              Number(
                                                                  selectedFolder
                                                                      ?.studentResponse
                                                                      ?.length >
                                                                      0
                                                                      ? selectedFolder
                                                                            ?.studentResponse[0]
                                                                            ?.files
                                                                            ?.length
                                                                      : 0
                                                              )
                                                    }
                                                    acceptTypes={getDocType(
                                                        selectedFolder?.type
                                                    )}
                                                />
                                            ) : null)}
                                    </div>
                                </div>
                            )}
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
                        <div>
                            {/* <SubmitSubmissionForAssessment
                                student={studentProfile?.data}
                                selectedCourseId={selectedCourse?.id}
                            /> */}
                            {!getFolders.isLoading &&
                            !getFolders.isFetching &&
                            getFolders.isSuccess &&
                            getFolders?.data &&
                            getFolders?.data?.length > 0
                                ? selectedCourse?.results?.length > 0
                                    ? results?.totalSubmission < 3
                                        ? (results?.result ===
                                              Result.ReOpened ||
                                              results?.result ===
                                                  Result.ReOpened ||
                                              results?.result ===
                                                  Result.NotCompetent) && (
                                              <SubmitSubmissionForAssessment
                                                  selectedCourseId={
                                                      selectedCourse?.id
                                                  }
                                                  student={studentProfile?.data}
                                                  isFilesUploaded={
                                                      isFilesUploaded
                                                  }
                                                  results={
                                                      selectedCourse?.results
                                                  }
                                                  isResubmittedFiles={
                                                      isResubmittedFiles
                                                  }
                                                  test={1}
                                              />
                                          )
                                        : !getFolders.isLoading &&
                                          !getFolders.isFetching &&
                                          getFolders.isSuccess &&
                                          results?.isManualSubmission && (
                                              <SubmitSubmissionForAssessment
                                                  selectedCourseId={
                                                      selectedCourse?.id
                                                  }
                                                  student={studentProfile?.data}
                                                  isFilesUploaded={
                                                      isFilesUploaded
                                                  }
                                                  results={
                                                      selectedCourse?.results
                                                  }
                                                  isResubmittedFiles={
                                                      isResubmittedFiles
                                                  }
                                                  test={2}
                                              />
                                          )
                                    : !getFolders.isLoading &&
                                      !getFolders.isFetching &&
                                      getFolders.isSuccess &&
                                      selectedCourse && (
                                          <SubmitSubmissionForAssessment
                                              selectedCourseId={
                                                  selectedCourse?.id
                                              }
                                              student={studentProfile?.data}
                                              isFilesUploaded={isFilesUploaded}
                                              results={selectedCourse?.results}
                                              isResubmittedFiles={
                                                  isResubmittedFiles
                                              }
                                              test={3}
                                          />
                                      )
                                : null}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 h-[450px]">
                        <div className="border border-gray-300 border-r-transparent h-[inherit] overflow-hidden">
                            <div className="bg-white h-[inherit] overflow-y-scroll custom-scrollbar">
                                {latestWorkplace?.courses &&
                                    appliedIndustry &&
                                    latestWorkplace?.courses[0]?.id ===
                                        selectedCourse?.id &&
                                    !getFolders?.data?.find((folder: any) =>
                                        folder?.name
                                            ?.split(' ')
                                            .includes('Agreement')
                                    ) && (
                                        <AssessmentFolderCard
                                            id={AgreementFile}
                                            name={'Agreement'}
                                            // isActive={folder.isActive}
                                            selectedFolderId={
                                                selectedFolder?.id
                                            }
                                            // response={{
                                            //     files: [viewAgreement?.data?.length],
                                            // }}
                                            onClick={() => {
                                                setSelectedFolder({
                                                    id: AgreementFile,
                                                })
                                            }}
                                            assessment
                                        />
                                    )}
                                {getFolders?.isError && (
                                    <NoData
                                        text={
                                            'There is some network issue,Try reload'
                                        }
                                    />
                                )}
                                {getFolders?.isLoading ||
                                getFolders.isFetching ? (
                                    <div className="flex flex-col justify-center items-center gap-y-2 py-5">
                                        <LoadingAnimation size={50} />
                                        <Typography variant={'label'}>
                                            Folders Loading
                                        </Typography>
                                    </div>
                                ) : getFolders?.data &&
                                  getFolders?.data?.length > 0 &&
                                  getFolders.isSuccess ? (
                                    getFolders?.data?.map((assessment: any) => (
                                        <AssessmentFolderCard
                                            key={assessment?.id}
                                            id={assessment?.id}
                                            name={assessment?.name}
                                            isAgreement={
                                                assessment?.isAgreement
                                            }
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
                                            assessment
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

                            {/* <AddFolderComment
                                getAssessmentResponse={getAssessmentResponse}
                                folder={selectedFolder}
                                studentId={Number(studentId)}
                                result={results}
                            /> */}
                        </div>
                    </div>
                    {/* {selectedCourse?.results
                        ?.map((result: any) => result.result)
                        .includes('pending') && (
                            )} */}

                    {/* {results?.finalComment && ( */}
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
                    {role === 'admin' &&
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

                    {Result.NotSubmitted ? (
                        <div className="mt-4">
                            <p className="text-xs text-orange-600 bg-orange-100 py-2 px-4">
                                *You will be able to submit assessment evidence
                                result when student will submit the assessment
                                submissions.
                            </p>
                        </div>
                    ) : (
                        !allCommentsAdded && (
                            <div className="mt-4">
                                <p className="text-xs text-orange-500 bg-orange-200 py-2 px-4">
                                    *You will be able to submit assessment
                                    evidence result after you add a comment to
                                    each folder mentioned above.
                                </p>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    )
}
