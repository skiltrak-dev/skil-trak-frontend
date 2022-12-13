import React, { useState } from 'react'

// components
import { Typography } from '@components'
import { AssessmentFolderFileCard } from '@components/sections/student/AssessmentsContainer'
import { TextInput } from '@components/inputs'
import { Button } from '@components/buttons'

// query
import { useAddCommentOnAssessmentMutation } from '@queries'

export const AssessmentResponse = ({ data, folder }: any) => {
    const [comment, setComment] = useState<any | null>(null)

    // query
    const [addComment, addCommentResult] = useAddCommentOnAssessmentMutation()
    return (
        <>
            <div className="w-full border border-gray-300 px-1 py-2 flex justify-between items-center">
                <div>
                    <Typography variant={'title'}>Restaurant Menus</Typography>
                    <Typography variant={'label'} color={'text-gray-500'}>
                        Uploaded 6/10
                    </Typography>
                </div>
                <div>
                    <Typography variant="body" color={'text-green-500'}>
                        Not Approved
                    </Typography>
                    <Typography variant="body" color={'text-green-500'}>
                        Assessed On
                    </Typography>
                </div>
            </div>
            <div className="grid grid-cols-6 gap-x-2 pt-2 bg-white min-h-[313px]">
                {data?.files?.length > 0 ? (
                    data?.files.map((file: any) => (
                        <AssessmentFolderFileCard
                            key={file.id}
                            filename={file.filename}
                            fileUrl={file.file}
                            type={folder?.type}
                        />
                    ))
                ) : (
                    <Typography variant={'title'} center>
                        No Files Uploaded
                    </Typography>
                )}
            </div>

            <div className="flex justify-between gap-x-2 mt-3 mx-3">
                <TextInput
                    name="comment"
                    placeholder={'Write your comment'}
                    onChange={(e: any) => {
                        setComment(e.target.value)
                    }}
                />
                <div className="flex items-start gap-x-2 mt-0.5">
                    <Button
                        variant={'success'}
                        outline
                        text={'Approve'}
                        onClick={() => {
                            addComment({
                                id: data?.id,
                                comment,
                                status: 'approved',
                            })
                        }}
                        loading={
                            addCommentResult?.isLoading &&
                            addCommentResult?.originalArgs?.status ===
                                'approved'
                        }
                        disabled={
                            addCommentResult?.isLoading ||
                            addCommentResult?.originalArgs?.status ===
                                'approved'
                        }
                    />
                    <Button
                        variant={'error'}
                        outline
                        text={'Reject'}
                        onClick={() => {
                            addComment({
                                id: data?.id,
                                comment,
                                status: 'rejected',
                            })
                        }}
                        loading={
                            addCommentResult?.isLoading &&
                            addCommentResult?.originalArgs?.status ===
                                'rejected'
                        }
                        disabled={
                            addCommentResult?.isLoading ||
                            addCommentResult?.originalArgs?.status ===
                                'rejected'
                        }
                    />
                </div>
            </div>
        </>
    )
}
