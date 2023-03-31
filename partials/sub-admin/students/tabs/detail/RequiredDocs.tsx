import { useEffect, useState } from 'react'

//components
import {
    AssessmentFolderCard,
    CourseCard,
    LoadingAnimation,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'

// queries
import { useNotification } from '@hooks'
import { AssessmentResponse } from '@components'
import {
    SubAdminApi,
    useStudentAssessmentCoursesQuery,
    useUploadRequiredDocsMutation,
    useGetSubAdminStudentWorkplaceQuery,
} from '@queries'
import { getUserCredentials } from '@utils'
import { FileUpload } from '@hoc'
import { UploadFile } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/AssessmentFolderDetailX/UploadFile'
import { getDocType } from '@components/sections/student/AssessmentsContainer'
import { useRouter } from 'next/router'

export const RequiredDocs = ({
    studentId,
    studentUserId,
    industry,
}: {
    studentId: string | string[] | undefined
    studentUserId: string | string[] | undefined
    industry: any
}) => {
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)

    const { notification } = useNotification()

    // query
    const workplace = useGetSubAdminStudentWorkplaceQuery(Number(studentId), {
        skip: !studentId,
    })
    const studentCourses = useStudentAssessmentCoursesQuery(Number(studentId), {
        skip: !studentId,
        refetchOnMountOrArgChange: true,
    })
    const getFolders = SubAdminApi.Docs.useRequiredFolders(
        {
            industryId: industry?.id,
            courseId: Number(selectedCourse?.id),
        },
        {
            skip: !selectedCourse || !industry,
        }
    )

    const getRequiredDocsResponse = SubAdminApi.Docs.useRequiredDocsResponse(
        {
            selectedFolderId: Number(selectedFolder?.id),
            studentId: Number(studentUserId),
        },
        { skip: !selectedFolder || !studentUserId }
    )

    const [uploadIndustryChecks, uploadIndustryChecksResult] =
        useUploadRequiredDocsMutation()

    useEffect(() => {
        if (studentCourses.isSuccess) {
            setSelectedCourse(
                selectedCourse
                    ? studentCourses?.data?.find(
                          (c: any) => c?.id === selectedCourse?.id
                      )
                    : studentCourses?.data[0]
            )
        }
    }, [studentCourses])

    useEffect(() => {
        if (getFolders.isSuccess) {
            setSelectedFolder(selectedFolder || getFolders?.data[0])
        }
    }, [getFolders])

    useEffect(() => {
        if (uploadIndustryChecksResult.isSuccess) {
            notification.success({
                title: 'Files Uploded',
                description: 'Files uploaded successfully',
            })
        }
    }, [uploadIndustryChecksResult])

    const AddFileButton = ({ name }: { name: string }) => {
        return (
            <UploadFile
                name={name}
                loading={uploadIndustryChecksResult.isLoading}
            />
        )
    }

    const onUploadDocs = (docs: any) => {
        const formData = new FormData()
        docs.forEach((doc: any) => {
            formData.append(`${selectedFolder?.folder?.name}`, doc)
        })

        uploadIndustryChecks({
            id: selectedFolder?.id,
            workplaceId: workplace?.data[0]?.id,
            user: studentUserId,
            body: formData,
        })
    }

    return (
        <div className="mb-10 mt-5">
            <ShowErrorNotifications result={uploadIndustryChecksResult} />
            {studentCourses?.isLoading ? (
                <div className="flex flex-col justify-center items-center gap-y-2">
                    <LoadingAnimation size={60} />
                    <Typography variant={'label'}>
                        Required Docs Loading
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
                            onClick={() => {
                                setSelectedCourse(course)
                            }}
                        />
                    ))}
                </div>
            ) : (
                <NoData
                    text={
                        'No Required Docs Were Found or No Submission from Student recived yet'
                    }
                />
            )}

            {/* Assessment Evidence Folders */}
            {studentCourses?.data && studentCourses?.data?.length > 0 && (
                <div>
                    {/*  */}
                    <div className="grid grid-cols-3 h-[450px]">
                        <div className="border border-gray-300 border-r-transparent h-full overflow-hidden">
                            <div className="p-2">
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-700'}
                                >
                                    Selected Folder
                                </Typography>
                                <Typography variant={'label'}>
                                    {selectedFolder?.folder?.name ||
                                        'No Folder Selected'}
                                </Typography>
                            </div>

                            <div className="bg-white h-full overflow-auto">
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
                                            id={assessment?.folder?.id}
                                            name={assessment?.folder?.name}
                                            // isActive={folder.isActive}
                                            selectedFolderId={
                                                selectedFolder?.folder?.id
                                            }
                                            response={{
                                                files: assessment?.response,
                                            }}
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
                        {/* <div> */}
                        <div className="col-span-2 border border-gray-300 overflow-hidden">
                            <div className="flex justify-end m-2">
                                <div>
                                    <FileUpload
                                        onChange={onUploadDocs}
                                        name={'folder?.name'}
                                        component={AddFileButton}
                                        multiple
                                        limit={Number(
                                            selectedFolder?.folder?.capacity
                                        )}
                                        acceptTypes={getDocType(
                                            selectedFolder?.type
                                        )}
                                    />
                                </div>
                            </div>
                            <AssessmentResponse
                                getAssessmentResponse={getRequiredDocsResponse}
                                folder={selectedFolder?.folder}
                                studentId={studentId}
                                assessmentEvidenceView={false}
                            />
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            )}
        </div>
    )
}
