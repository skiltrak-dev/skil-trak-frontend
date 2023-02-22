import { ChangeEvent, useEffect, useState } from 'react'

// components
import {
    Badge,
    FileViewModal,
    LoadingAnimation,
    NoData,
    PdfViewModal,
    Select,
    Typography,
    VideoPlayModal,
} from '@components'

import { Button } from '@components/buttons'
import { TextInput } from '@components/inputs'
import { AssessmentFolderFileCard } from '@components/sections/student/AssessmentsContainer'

// query
import { useAddCommentOnAssessmentMutation } from '@queries'
import moment from 'moment'
import { getCourseResult } from '@utils'

export const AssessmentResponse = ({
    folder,
    studentId,
    getAssessmentResponse,
    assessmentEvidenceView,
    result,
    header = true,
}: {
    folder?: any
    studentId?: any
    getAssessmentResponse?: any
    assessmentEvidenceView?: boolean
    header?: boolean
    result?: any
}) => {
    // const [comment, setComment] = useState<string>('')
    // const [commentType, setCommentType] = useState<string>('')

    const [selected, setSelected] = useState<any>(null)

    const [modal, setModal] = useState<any>(null)

    const onModalCancel = () => {
        setModal(null)
    }

    const getImageViewModal = (file: any) => {
        return (
            <FileViewModal
                title=""
                subtitle=""
                onCancelButtonClick={onModalCancel}
            >
                <div className="max-w-[650px] relative">
                    <img src={file.file} alt="" className="max-w-full" />
                </div>
            </FileViewModal>
        )
    }

    const onFileClicked = (file: any) => {
        setSelected(file)

        if (['jpg', 'jpeg', 'png'].includes(file.extension.toLowerCase())) {
            setModal(getImageViewModal(file))
        } else if (['pdf'].includes(file.extension.toLowerCase())) {
            const fileSplit = file.file.split('https://')
            const url = `https://www.${fileSplit[1]}`
            setModal(
                <PdfViewModal url={url} onCancelButtonClick={onModalCancel} />
            )
        } else if (
            ['mp4', 'mkv', 'avi', 'mpeg'].includes(file.extension.toLowerCase())
        ) {
            const fileSplit = file.file.split('https://')
            const url = `https://www.${fileSplit[1]}`
            setModal(
                <VideoPlayModal url={url} onCancelButtonClick={onModalCancel} />
            )
        }
    }

    // useEffect(() => {
    //     setComment('')
    // }, [folder, getAssessmentResponse])

    // useEffect(() => {
    //     if (getAssessmentResponse?.data) {
    //         if (getAssessmentResponse?.data?.comment) {
    //             setComment(getAssessmentResponse?.data?.comment)
    //         }
    //         if (commentType === 'approved') {
    //             setComment(
    //                 getAssessmentResponse?.data?.assessmentFolder
    //                     ?.positiveComment
    //             )
    //         } else if (commentType === 'rejected') {
    //             setComment(
    //                 getAssessmentResponse?.data?.assessmentFolder
    //                     ?.negativeComment
    //             )
    //         }
    //     }
    // }, [getAssessmentResponse, commentType])

    // query
    // const [addComment, addCommentResult] = useAddCommentOnAssessmentMutation()
    return (
        <>
            {modal && modal}
            <div className=" bg-white flex flex-col justify-between">
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
                                    <Badge
                                        text={result?.result}
                                        variant="info"
                                    />
                                    {result?.assessor && (
                                        <Typography
                                            variant="muted"
                                            color={'text-green-500'}
                                        >
                                            Assessed On:{' '}
                                            {moment(
                                                result?.assessor?.createdAt
                                            ).format('Do MMM YYYY')}
                                        </Typography>
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
                                    (file: any) => (
                                        <AssessmentFolderFileCard
                                            key={file.id}
                                            file={file}
                                            filename={file.filename}
                                            fileUrl={file.file}
                                            type={folder?.type}
                                            selected={selected?.id === file.id}
                                            onClick={onFileClicked}
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

                {/* {assessmentEvidenceView &&
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
                                        onChange={(e: any) => {
                                            setCommentType(e?.value)
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
                                            id: getAssessmentResponse?.data?.id,
                                            comment,
                                            status: commentType,
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
                    )} */}
            </div>
        </>
    )
}
