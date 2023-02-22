import { Button, Select, TextInput } from '@components'

// queries
import { useAddCommentOnAssessmentMutation } from '@queries'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const AddFolderComment = ({
    getAssessmentResponse,
    result,
    folder,
    studentId,
}: {
    getAssessmentResponse: any
    result: any
    folder: any
    studentId: number
}) => {
    const [comment, setComment] = useState<string>('')
    const [commentType, setCommentType] = useState<string>('')

    const [addComment, addCommentResult] = useAddCommentOnAssessmentMutation()

    useEffect(() => {
        setComment('')
    }, [folder, getAssessmentResponse])

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

    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        addComment({
            ...values,
            id: getAssessmentResponse?.data?.id,
            std: studentId,
            // comment,
            // status: commentType,
        })
    }

    console.log('getAssessmentResponse', getAssessmentResponse?.data)
    return (
        <div>
            {getAssessmentResponse?.data && result?.result !== 'competent' && (
                <FormProvider {...methods}>
                    <form
                        className="mt-2 w-full"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div className="flex justify-between gap-x-2 mt-3 mx-3">
                            <div className="grid grid-cols-3 gap-x-2 w-full">
                                <div className="w-full">
                                    <Select
                                        name={'status'}
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
                                        onlyValue
                                        // onChange={(e: any) => {
                                        //     setCommentType(e?.value)
                                        // }}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <TextInput
                                        name="comment"
                                        value={comment}
                                        placeholder={'Write your comment'}
                                        // onChange={(
                                        //     e: ChangeEvent<HTMLInputElement>
                                        // ) => {
                                        //     setComment(e.target.value)
                                        // }}
                                    />
                                </div>
                            </div>
                            <div>
                                <Button
                                    variant={'success'}
                                    outline
                                    submit
                                    text={'Submit'}
                                    // onClick={() => {}}
                                    loading={
                                        addCommentResult?.isLoading &&
                                        addCommentResult?.originalArgs
                                            ?.status === 'approved'
                                    }
                                    disabled={addCommentResult?.isLoading}
                                />
                            </div>
                        </div>
                    </form>
                </FormProvider>
            )}
        </div>
    )
}
