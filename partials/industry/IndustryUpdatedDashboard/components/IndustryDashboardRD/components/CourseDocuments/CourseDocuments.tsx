import { ReactElement, useState } from 'react'
import { PuffLoader } from 'react-spinners'

// Icons
import { GiEmptyHourglass } from 'react-icons/gi'

// components
import { Button, Typography } from '@components'
import { CustomDocInput } from './CustomDocInput'
import { DocumentInputField } from './DocumentInputField'

// redux
import { useGetIndustryDocumentsQuery } from '@queries'
import { Course } from '@types'
import { CustomRequirementForm } from '../../forms'
import { AddCustomRequirementModal } from '../../modal'

export const CourseDocuments = ({ course }: { course: Course }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { data, isSuccess, isLoading } = useGetIndustryDocumentsQuery({
        course: course.id,
    })

    const [showCustomRequirementForm, setShowCustomRequirementForm] =
        useState(false)

    const showCustomRequirements = () => {
        const filtered = data?.filter(
            ({ folder_isCustom, folder_courseId }: any) =>
                folder_isCustom && folder_courseId === course.id
        )

        return filtered.length > 0
    }

    const getRelatedData = () =>
        data?.filter(
            ({ folder_courseId }: any) => folder_courseId === course.id
        )

    const getCustomRelatedData = () =>
        data?.filter(
            ({ folder_isCustom, folder_courseId }: any) =>
                folder_isCustom && folder_courseId === course.id
        )

    const onCancelModal = () => setModal(null)

    const onAddCustomRequirements = () => {
        setModal(
            <AddCustomRequirementModal
                onCancel={() => onCancelModal()}
                courseId={course.id}
            />
        )
    }

    return (
        <>
            {modal}
            {isLoading ? (
                <div className="w-full h-36 flex items-center justify-center">
                    <PuffLoader />
                </div>
            ) : (
                <div>
                    <div>
                        <Typography variant="label" medium>
                            Please select the documents required from the
                            student.
                        </Typography>
                        <Typography variant={'small'}>
                            Only selected documents will be required
                        </Typography>
                    </div>
                    <div className="flex items-start gap-x-2 py-3">
                        <Button
                            variant="info"
                            onClick={() => {
                                onAddCustomRequirements()
                            }}
                        >
                            <span className="whitespace-pre">Add Custom</span>
                        </Button>
                    </div>

                    {/* Checkboxes */}
                    {getRelatedData().length ? (
                        <div className="relative">
                            <div className="grid grid-cols-1 gap-x-7 gap-y-2 my-2 column-border">
                                {getRelatedData()?.map(
                                    ({
                                        folder_id,
                                        folder_name,
                                        documents_checked,
                                        folder_isRequired,
                                        folder_isCustom,
                                        documents_id,
                                        folder_courseId,
                                    }: any) =>
                                        !folder_isCustom && (
                                            <DocumentInputField
                                                key={folder_id}
                                                name={folder_name}
                                                checked={documents_checked}
                                                required={folder_isRequired}
                                                folder={{
                                                    folderId: folder_id,
                                                    documentId: documents_id,
                                                    courseId: folder_courseId,
                                                    isCustom: folder_isCustom,
                                                }}
                                            />
                                        )
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="my-4 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed w-fit p-16 mx-auto rounded text-gray-300">
                            <div className="mb-4 text-3xl ">
                                <GiEmptyHourglass />
                            </div>
                            <p className="text-sm font-semibold">
                                No Current Courses Here
                            </p>
                        </div>
                    )}

                    {isSuccess && !isLoading && showCustomRequirements() && (
                        <>
                            <div className="mt-4 mb--2">
                                <Typography variant={'muted'} color={'gray'}>
                                    Custom Requirements
                                </Typography>
                            </div>

                            <div className="text-xs font-semibold flex justify-between py-1 mt-1">
                                <span className="w-2/5 flex-grow">Folder</span>
                                <span className="w-1/5 text-center">
                                    Is Required
                                </span>
                                <span className="w-1/5 text-center">Type</span>
                                <span className="w-1/5 text-center">
                                    Actions
                                </span>
                            </div>

                            <div className="">
                                {getCustomRelatedData().map(
                                    ({
                                        folder_id,
                                        folder_name,
                                        documents_checked,
                                        folder_isRequired,
                                        folder_isCustom,
                                        documents_id,
                                        folder_courseId,
                                        folder_type,
                                    }: any) => (
                                        <CustomDocInput
                                            key={folder_id}
                                            name={folder_name}
                                            checked={documents_checked}
                                            required={folder_isRequired}
                                            type={folder_type}
                                            folder={{
                                                folderId: folder_id,
                                                documentId: documents_id,
                                                courseId: folder_courseId,
                                                isCustom: folder_isCustom,
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
