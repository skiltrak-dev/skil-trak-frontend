import React, { useEffect, useState } from 'react'

// components
import {
    Typography,
    NoData,
    LoadingAnimation,
    Select,
    Badge,
} from '@components'

import { AssessmentFolderFileCard } from '@components/sections/student/AssessmentsContainer'
import { TextInput } from '@components/inputs'
import { Button } from '@components/buttons'

// query
import { useAddCommentOnAssessmentMutation } from '@queries'

export const AssessmentResponse = ({ getAssessmentResponse, folder }: any) => {
    const [comment, setComment] = useState<any | null>(null)
    const [commentType, setCommentType] = useState<string | null>(null)

    useEffect(() => {
        if (getAssessmentResponse?.data) {
            if (getAssessmentResponse?.data?.comment) {
                setComment(getAssessmentResponse?.data?.comment)
            }
            if (commentType === 'approved') {
                setComment(
                    getAssessmentResponse?.data?.assessmentFolder
                        ?.positiveComment
                )
            } else if (commentType === 'rejected') {
                setComment(
                    getAssessmentResponse?.data?.assessmentFolder
                        ?.negativeComment
                )
            }
        }
    }, [getAssessmentResponse, commentType])

    // query
    const [addComment, addCommentResult] = useAddCommentOnAssessmentMutation()
    return (
        <div className="h-full bg-white flex flex-col justify-between">
            <div className="h-full overflow-scroll">
                <div className="w-full bg-slate-50 border-b px-2 py-2 flex justify-between items-center">
                    <div>
                        <Typography variant={'title'}>
                            {folder?.name}
                        </Typography>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Uploaded {getAssessmentResponse?.data?.length || 0}/
                            {folder?.capacity}
                        </Typography>
                    </div>
                    <div>
                        {false ? (
                            <Badge text="Approved" variant="success" />
                        ) : (
                            <Badge text="Not Approved" variant="error" />
                        )}
                        <Typography variant="body" color={'text-green-500'}>
                            Assessed On
                        </Typography>
                    </div>
                </div>
                <div className="bg-white">
                    {getAssessmentResponse.isLoading ||
                    getAssessmentResponse.isFetching ? (
                        <div className="flex flex-col gap-y-2">
                            <LoadingAnimation size={50} />
                            <Typography variant="label">
                                Assessment Files Loading
                            </Typography>
                        </div>
                    ) : getAssessmentResponse?.data?.files &&
                      getAssessmentResponse?.data?.files?.length > 0 ? (
                        <div className="grid grid-cols-6 gap-x-2 pt-2">
                            {getAssessmentResponse?.data?.files.map(
                                (file: any) => (
                                    <AssessmentFolderFileCard
                                        key={file.id}
                                        filename={file.filename}
                                        fileUrl={file.file}
                                        type={folder?.type}
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

            {getAssessmentResponse?.data && (
                <div className="flex justify-between gap-x-2 mt-3 mx-3">
                    <div className="grid grid-cols-3 gap-x-2 w-full">
                        <div className="w-full">
                            <Select
                                name={'type'}
                                options={[
                                    { label: 'Approve', value: 'approved' },
                                    { label: 'Reject', value: 'rejected' },
                                ]}
                                onChange={(e: any) => {
                                    setCommentType(e?.value)
                                }}
                                disabled={getAssessmentResponse?.data?.comment}
                            />
                        </div>
                        <div className="col-span-2">
                            <TextInput
                                name="comment"
                                value={comment}
                                placeholder={'Write your comment'}
                                onChange={(e: any) => {
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
                                })
                            }}
                            loading={
                                addCommentResult?.isLoading &&
                                addCommentResult?.originalArgs?.status ===
                                    'approved'
                            }
                            disabled={
                                addCommentResult?.isLoading ||
                                getAssessmentResponse?.data?.comment
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
