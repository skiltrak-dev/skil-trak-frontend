import {
    Button,
    ShowErrorNotifications,
    TagInput,
    TextArea,
    Typography,
} from '@components'
import React, { useEffect, useState } from 'react'
import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'
import { LabelTag } from '@partials/student/talentPool'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const ApproveCourseModal = ({ onCloseModal, request }: any) => {
    const [description, setDescription] = useState('')
    const [validationError, setValidationError] = useState('')
    const [tags, setTags] = useState<any>({
        reference: [],
    })
    const [courseRequest, courseRequestResult] =
        SubAdminApi.SubAdmin.useDepartmentCourseRequest()

    const { notification } = useNotification()

    useEffect(() => {
        if (courseRequestResult.isSuccess) {
            notification.success({
                title: 'Course Request Approved',
                description:
                    'Add Course request for industry has been approved.',
            })
            onCloseModal()
        }
    }, [courseRequestResult.isSuccess])

    const validateForm = () => {
        if (request?.description === null && !description.trim()) {
            setValidationError('Description is required')
            return false
        }
        setValidationError('')
        return true
    }

    const handleTagEnter = (name: string, newTag: string) => {
        setTags((prevTags: any) => ({
            ...prevTags,
            [name]: [...prevTags[name], newTag],
        }))
    }

    const handleRemoveTag = (name: string, tagToRemove: string) => {
        setTags((prevTags: any) => ({
            ...prevTags,
            [name]: prevTags[name].filter((tag: string) => tag !== tagToRemove),
        }))
    }
    const validationSchema = yup.object().shape({
        description: yup.string().required('Description is required'),
        // reference: yup.string().url('Invalid URL format'),
    })
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (data: any) => {
        if (!validateForm()) return
        const { description } = data
        const { reference } = tags
        courseRequest({
            params: {
                id: request.id,
                status: 'approved',
            },
            body: {
                reference: reference,
                description: description,
            },
        })
    }
    const submitForm = () => {
        onSubmit(methods.getValues())
    }
    const onClickApprove = () => {
        courseRequest({
            params: {
                id: request.id,
                status: 'approved',
            },
        })
    }

    return (
        <>
            <ShowErrorNotifications result={courseRequestResult} />

            <div className="flex justify-center flex-col items-center gap-4 px-8 py-4">
                <Typography variant="h4">Approve Course</Typography>
                {request?.description !== null && (
                    <Typography variant="body">
                        Are you sure you want to approve this course?
                    </Typography>
                )}
                {request?.description === null && (
                    <>
                        <Typography variant="body">
                            If you want to approve the course, please provide
                            these details
                        </Typography>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <div className="flex gap-x-5 w-full">
                                    <div className="flex flex-col gap-y-2">
                                        <Typography variant="small" semibold>
                                            Description
                                        </Typography>
                                        <Typography variant="small" medium>
                                            Please provide the reason why you
                                            are adding this course to the
                                            industry.
                                        </Typography>
                                        <TextArea
                                            name="description"
                                            required
                                            placeholder="Enter description here..."
                                            onChange={(e: any) => {
                                                setDescription(e?.target?.value)
                                            }}
                                            rows={4}
                                            // showError={false}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <Typography variant="small" semibold>
                                            Reference URLs (Optional)
                                        </Typography>
                                        <Typography variant="small" medium>
                                            Where did you find out about this
                                            course? Please provide a reference
                                            link.
                                        </Typography>
                                        <TagInput
                                            name="reference"
                                            onTagEnter={handleTagEnter}
                                        />
                                        {tags?.reference?.length > 0 && (
                                            <LabelTag
                                                tagName={'reference'}
                                                tags={tags}
                                                handleRemoveTag={
                                                    handleRemoveTag
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button
                                        variant="success"
                                        onClick={submitForm}
                                        text="Approve"
                                        loading={courseRequestResult.isLoading}
                                        disabled={courseRequestResult.isLoading}
                                    />
                                </div>
                            </form>
                        </FormProvider>
                    </>
                )}
                {request?.description !== null && (
                    <div className="flex justify-center gap-x-4">
                        <Button
                            variant="success"
                            onClick={onClickApprove}
                            text="Approve"
                            loading={courseRequestResult.isLoading}
                            disabled={courseRequestResult.isLoading}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
