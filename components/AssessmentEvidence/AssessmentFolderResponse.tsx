import { ChangeEvent, useEffect, useState } from 'react'

// components
import {
    AssessmentFolderFileCard,
    Badge,
    FileViewModal,
    LoadingAnimation,
    NoData,
    Select,
    ShowErrorNotifications,
    Typography,
} from '@components'

import { Button } from '@components/buttons'
import { TextInput } from '@components/inputs'

// query
import { Result } from '@constants'
import { DocumentsView, useNotification } from '@hooks'
import { useAddCommentOnAssessmentMutation } from '@queries'
import { AddCommentEnum, OptionType } from '@types'
import moment from 'moment'

export const AssessmentResponse = ({
    folder,
    studentId,
    getAssessmentResponse,
    assessmentEvidenceView,
    result,
    header = true,
    deleteAction,
    activeAssessment,
    editAssessment,
}: {
    folder?: any
    studentId?: number
    getAssessmentResponse?: any
    assessmentEvidenceView?: boolean
    header?: boolean
    result?: any
    deleteAction?: any
    activeAssessment?: boolean
    editAssessment?: boolean
}) => {
    const [comment, setComment] = useState<string>('')
    const [commentType, setCommentType] = useState<OptionType | null>(null)

    const [selected, setSelected] = useState<any>(null)

    const [modal, setModal] = useState<any>(null)

    const { onFileClicked, documentsViewModal } = DocumentsView()

    const { notification } = useNotification()

    // query
    const [addComment, addCommentResult] = useAddCommentOnAssessmentMutation()

    const onModalCancel = () => {
        setModal(null)
    }

    const getImageViewModal = (file: any) => {
        return (
            <FileViewModal
                title=""
                subtitle=""
                url={file?.file}
                onCancelButtonClick={onModalCancel}
            >
                <div className="max-w-[650px] relative">
                    <img src={file?.file} alt="" className="max-w-full" />
                </div>
            </FileViewModal>
        )
    }

    // const onFileClicked = (file: any) => {
    //     setSelected(file)

    //     if (
    //         ['jpg', 'jpeg', 'png', 'jfif'].includes(
    //             file?.extension?.toLowerCase()
    //         )
    //     ) {
    //         setModal(getImageViewModal(file))
    //     } else if (
    //         ['pdf', 'document'].includes(file?.extension?.toLowerCase())
    //     ) {
    //         // const fileSplit = file.file.split('https://')
    //         // const url = `https://www.${fileSplit[1]}`
    //         const url = `${file?.file}`
    //         setModal(
    //             <PdfViewModal
    //                 url={url}
    //                 downloadUrl={file?.file}
    //                 onCancelButtonClick={onModalCancel}
    //                 extension={file?.extension}
    //             />
    //         )
    //     } else if (
    //         ['mp4', 'mkv', 'avi', 'mpeg', 'quicktime', 'mov'].includes(
    //             file?.extension?.toLowerCase()
    //         )
    //     ) {
    //         // const fileSplit = file.file.split('https://')
    //         // const url = `https://www.${fileSplit[1]}`
    //         setModal(
    //             <VideoPlayModal
    //                 // url={url}
    //                 url={file?.file}
    //                 downloadUrl={file?.file}
    //                 onCancelButtonClick={onModalCancel}
    //             />
    //         )
    //     }
    // }

    const getResultBadge = () => {
        switch (result?.result) {
            case Result.Competent:
                return <Badge text="Competent" variant="success" />

            case Result.NotCompetent:
                return <Badge text="Not Competent" variant="error" />
            case Result.ReOpened:
                return <Badge text="Re-Opened" variant="info" />
            case Result.Pending:
                return <Badge text="Submitted" variant="info" />
            default:
                return <Badge text={result?.result} variant="muted" />
        }
    }

    useEffect(() => {
        setComment('')
    }, [folder, getAssessmentResponse])

    useEffect(() => {
        if (getAssessmentResponse?.data) {
            if (getAssessmentResponse?.data?.comment) {
                setComment(getAssessmentResponse?.data?.comment)
            }
            if (commentType?.value === AddCommentEnum.Approved) {
                setComment(
                    getAssessmentResponse?.data?.assessmentFolder
                        ?.positiveComment
                )
            } else if (commentType?.value === AddCommentEnum.Rejected) {
                setComment(
                    getAssessmentResponse?.data?.assessmentFolder
                        ?.negativeComment
                )
            }
        }
    }, [getAssessmentResponse, commentType])

    useEffect(() => {
        if (addCommentResult.isSuccess) {
            setComment('')
            setCommentType(null)
            notification.success({
                title: 'Comment Added',
                description: 'Comment Added Successfully',
            })
        }
    }, [addCommentResult])

    console.log({ folder })

    // query

    const filteredFiles = getAssessmentResponse?.data?.files?.filter(
        (file: any) => file
    )

    console.log(
        `Saad`,
        result?.result !== Result.Competent &&
            result?.result !== Result.NotCompetent
    )

    return (
        <>
            <ShowErrorNotifications result={addCommentResult} />
            {modal && modal}
            {documentsViewModal}
            <div className="h-full bg-white flex flex-col justify-between">
                <div className="h-full overflow-scroll remove-scrollbar">
                    {header && (
                        <div className="w-full bg-slate-50 border-b px-2 py-2 flex justify-between items-center">
                            <div>
                                <Typography variant={'title'}>
                                    {folder?.name}
                                </Typography>
                                <Typography
                                    variant={'label'}
                                    color={'text-gray-500'}
                                >
                                    Uploaded{' '}
                                    {getAssessmentResponse?.data?.files
                                        ?.length || 0}
                                    /{folder?.capacity || 10}
                                </Typography>
                            </div>
                            {assessmentEvidenceView && (
                                <div className="flex flex-col gap-y-1 items-end">
                                    {result && getResultBadge()}

                                    {result?.assessor &&
                                        result?.assessor?.createdAt && (
                                            <p className="text-xs text-gray-500">
                                                Assessed On:{' '}
                                                {moment(
                                                    result?.assessor?.createdAt
                                                ).format('Do MMM YYYY')}
                                            </p>
                                        )}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="bg-white">
                        {getAssessmentResponse.isError && (
                            <NoData
                                text={'There is some network issue, Try reload'}
                            />
                        )}
                        {getAssessmentResponse.isLoading ||
                        getAssessmentResponse.isFetching ? (
                            <div className="flex flex-col justify-center items-center gap-y-2">
                                <LoadingAnimation size={50} />
                                <Typography variant="label">
                                    Assessment Files Loading
                                </Typography>
                            </div>
                        ) : filteredFiles && filteredFiles?.length > 0 ? (
                            // <div className="p-2 grid grid-cols-6 gap-x-2  overflow-hidden">
                            <div className="p-2 flex flex-wrap gap-x-2 gap-y-2 items-end  overflow-hidden">
                                {filteredFiles?.map((file: any, i: number) => (
                                    <AssessmentFolderFileCard
                                        key={file?.id}
                                        file={file}
                                        index={i}
                                        filename={file?.filename}
                                        fileUrl={file?.file}
                                        type={file?.type}
                                        selected={selected?.id === file?.id}
                                        onClick={onFileClicked}
                                        deleteAction={deleteAction}
                                    />
                                ))}
                            </div>
                        ) : (
                            !getAssessmentResponse.isError && (
                                <div className="p-3">
                                    <NoData
                                        text={'No Uploaded Files were found'}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
                {((activeAssessment &&
                    assessmentEvidenceView &&
                    getAssessmentResponse?.data &&
                    result?.result !== Result.Competent &&
                    result?.result !== Result.NotSubmitted &&
                    !getAssessmentResponse.isError) ||
                    (result?.result !== Result.Competent &&
                        folder?.isAgreement) ||
                    editAssessment) && (
                    <div className="flex justify-between gap-x-2 mt-3 mx-3">
                        <div className="grid grid-cols-3 gap-x-2 w-full">
                            <div className="w-full">
                                <Select
                                    name={'type'}
                                    menuPlacement={'top'}
                                    // value={commentType}
                                    options={[
                                        {
                                            label: 'Approve',
                                            value: AddCommentEnum.Approved,
                                        },
                                        {
                                            label: 'Reject',
                                            value: AddCommentEnum.Rejected,
                                        },
                                    ]}
                                    value={commentType}
                                    onChange={(e: OptionType) => {
                                        setCommentType(e)
                                    }}
                                />
                            </div>
                            <div className="col-span-2">
                                <TextInput
                                    name="comment"
                                    value={comment}
                                    placeholder={'Write your comment'}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setComment(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                variant={'success'}
                                outline
                                text={'Submit'}
                                onClick={() => {
                                    addComment({
                                        folderId:
                                            getAssessmentResponse?.data?.id,
                                        comment,
                                        resultId: result?.id,
                                        status: commentType?.value as AddCommentEnum,
                                        assessmentFolderId:
                                            getAssessmentResponse?.data
                                                ?.assessmentFolder?.id,
                                        std: Number(studentId),
                                    })
                                }}
                                loading={addCommentResult?.isLoading}
                                disabled={
                                    addCommentResult?.isLoading || !comment
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
