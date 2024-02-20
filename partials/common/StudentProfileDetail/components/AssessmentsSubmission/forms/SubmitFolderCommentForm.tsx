import { Button, Select, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddCommentEnum, OptionType } from '@types'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const SubmitFolderCommentForm = ({
    result,
    comment,
    onSubmit,
    assessmentFolder,
    folderStatus,
}: {
    result: any
    onSubmit: any
    comment: string
    assessmentFolder: any
    folderStatus: AddCommentEnum
}) => {
    const validationSchema = Yup.object({
        type: Yup.string().required('Type is required!'),
        comment: Yup.string().required('Comment is required'),
    })
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    useEffect(() => {
        if (comment) {
            methods.setValue('comment', comment)
        }
    }, [comment])

    const [selectedType, setSelectedType] = useState<AddCommentEnum>(
        AddCommentEnum.Approved
    )

    const typeOptions = [
        {
            label: 'Approve',
            value: AddCommentEnum.Approved,
        },
        {
            label: 'Reject',
            value: AddCommentEnum.Rejected,
        },
    ]

    console.log({ folderStatus })
    return (
        <div>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="flex justify-between gap-x-2 mt-3 mx-3">
                        <div className="grid grid-cols-3 gap-x-2 w-full">
                            <div className="w-full">
                                <Select
                                    name={'type'}
                                    menuPlacement={'top'}
                                    options={typeOptions}
                                    value={typeOptions?.find(
                                        (type: OptionType) =>
                                            type.value === folderStatus
                                    )}
                                    onlyValue
                                    onChange={(e: AddCommentEnum) => {
                                        if (e === AddCommentEnum.Approved) {
                                            methods.setValue(
                                                'comment',
                                                assessmentFolder?.positiveComment
                                            )
                                        } else if (
                                            e === AddCommentEnum.Rejected
                                        ) {
                                            methods.setValue(
                                                'comment',
                                                assessmentFolder?.negativeComment
                                            )
                                        }
                                        setSelectedType(e)
                                    }}
                                />
                            </div>
                            <div className="col-span-2">
                                <TextInput
                                    name="comment"
                                    // value={comment}
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
                                text={'Submit'}
                                submit
                                loading={result?.isLoading}
                                disabled={result?.isLoading}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
