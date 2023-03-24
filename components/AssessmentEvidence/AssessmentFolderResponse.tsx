import { ChangeEvent, useEffect, useState } from 'react'

// components
import {
    AssessmentFolderFileCard,
    Badge,
    FileViewModal,
    LoadingAnimation,
    NoData,
    PdfViewModal,
    Select,
    SelectOption,
    Typography,
    VideoPlayModal,
} from '@components'

import { Button } from '@components/buttons'
import { TextInput } from '@components/inputs'

// query
import { Result } from '@constants'
import { useAddCommentOnAssessmentMutation } from '@queries'
import moment from 'moment'

export const AssessmentResponse = ({
    folder,
    studentId,
    getAssessmentResponse,
    assessmentEvidenceView,
    result,
    header = true,
    deleteAction,
}: {
    folder?: any
    studentId?: any
    getAssessmentResponse?: any
    assessmentEvidenceView?: boolean
    header?: boolean
    result?: any
    deleteAction?: any
}) => {
    const [comment, setComment] = useState<string>('')
    const [commentType, setCommentType] = useState<SelectOption | null>(null)

    const [selected, setSelected] = useState<any>(null)

    const [modal, setModal] = useState<any>(null)

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

    const onFileClicked = (file: any) => {
        setSelected(file)

        if (
            ['jpg', 'jpeg', 'png', 'jfif'].includes(
                file.extension.toLowerCase()
            )
        ) {
            setModal(getImageViewModal(file))
        } else if (['pdf'].includes(file.extension.toLowerCase())) {
            // const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            const url = `${file?.file}`
            setModal(
                <PdfViewModal
                    url={url}
                    downloadUrl={file?.file}
                    onCancelButtonClick={onModalCancel}
                />
            )
        } else if (
            ['mp4', 'mkv', 'avi', 'mpeg', 'quicktime', 'mov'].includes(
                file.extension.toLowerCase()
            )
        ) {
            // const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            setModal(
                <VideoPlayModal
                    // url={url}
                    url={file?.file}
                    downloadUrl={file?.file}
                    onCancelButtonClick={onModalCancel}
                />
            )
        }
    }

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
            if (commentType?.value === 'approved') {
                setComment(
                    getAssessmentResponse?.data?.assessmentFolder
                        ?.positiveComment
                )
            } else if (commentType?.value === 'rejected') {
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
        }
    }, [addCommentResult])

    // query

    return (
        <>
            {modal && modal}
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
                                    /{folder?.capacity}
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
                        {getAssessmentResponse.isLoading ||
                        getAssessmentResponse.isFetching ? (
                            <div className="flex flex-col justify-center items-center gap-y-2">
                                <LoadingAnimation size={50} />
                                <Typography variant="label">
                                    Assessment Files Loading
                                </Typography>
                            </div>
                        ) : getAssessmentResponse?.data?.files &&
                          getAssessmentResponse?.data?.files?.length > 0 ? (
                            // <div className="p-2 grid grid-cols-6 gap-x-2  overflow-hidden">
                            <div className="p-2 flex flex-wrap gap-x-2 gap-y-2 items-end  overflow-hidden">
                                {getAssessmentResponse?.data?.files.map(
                                    (file: any, i: number) => (
                                        <AssessmentFolderFileCard
                                            key={file.id}
                                            file={file}
                                            index={i}
                                            filename={file.filename}
                                            fileUrl={file.file}
                                            type={folder?.type}
                                            selected={selected?.id === file.id}
                                            onClick={onFileClicked}
                                            deleteAction={deleteAction}
                                        />
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="p-3">
                                <NoData text={'No Uploaded Files were found'} />
                            </div>
                        )}
                    </div>
                </div>
                {result?.result !== 'Not Submitted' &&
                    assessmentEvidenceView &&
                    getAssessmentResponse?.data &&
                    result?.result !== 'competent' && (
                        <div className="flex justify-between gap-x-2 mt-3 mx-3">
                            <div className="grid grid-cols-3 gap-x-2 w-full">
                                <div className="w-full">
                                    <Select
                                        name={'type'}
                                        menuPlacement={'top'}
                                        options={[
                                            {
                                                label: 'Approve',
                                                value: 'approved',
                                            },
                                            {
                                                label: 'Reject',
                                                value: 'rejected',
                                            },
                                        ]}
                                        value={commentType}
                                        onChange={(e: any) => {
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
                                            status: commentType?.value,
                                            assessmentFolderId:
                                                getAssessmentResponse?.data
                                                    ?.assessmentFolder?.id,
                                            std: studentId,
                                        })
                                    }}
                                    loading={
                                        addCommentResult?.isLoading &&
                                        addCommentResult?.originalArgs
                                            ?.status === 'approved'
                                    }
                                    disabled={addCommentResult?.isLoading}
                                />
                            </div>
                        </div>
                    )}
            </div>
        </>
    )
}
