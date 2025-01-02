import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import {
    Button,
    ShowErrorNotifications,
    TagInput,
    TextArea,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { LabelTag } from '@partials/student/talentPool'
import { AdminApi } from '@queries'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const EditCourseModal = ({
    course,
    onCloseModal,
    courseRequestId,
}: any) => {
    console.log('course', course)
    const [tags, setTags] = useState<any>({
        reference: course?.reference?.length ? course?.reference : [],
    })

    const { notification } = useNotification()

    const router = useRouter()

    const [updateCourse, updateCourseResult] =
        AdminApi.Industries.useUpdateIndustryProfileCourse()

    const validationSchema = yup.object().shape({
        // sector: yup.number().required('Sector is required'),
        // courses: yup.number().required('Course is required'),
        description: yup.string().required('Description is required'),
        // reference: yup.string().url('Invalid URL format'),
    })
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
        defaultValues: {
            description: course.description ?? '',
        },
    })

    useEffect(() => {
        if (updateCourseResult.isSuccess) {
            notification.success({
                title: 'Course Details Updated',
                description: 'Course details updated successfully',
            })

            onCloseModal()
            methods.reset()
        }
    }, [updateCourseResult.isSuccess])

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

    const onSubmit = (data: any) => {
        const { description } = data
        const { reference } = tags
        updateCourse({
            body: {
                description: description,
                reference: reference,
            },
            id: courseRequestId,
        })
    }

    const submitForm = () => {
        // const { setError } = methods

        // if (tags?.reference?.length === 0) {
        //     setError('reference', {
        //         type: 'reference',
        //         message: 'Must enter your reference',
        //     })
        //     return
        // }
        onSubmit(methods.getValues())
    }
    // department /courses/request-list
    return (
        <>
            <ShowErrorNotifications result={updateCourseResult} />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="flex justify-center  flex-col gap-y-2 px-2 py-2">
                        <div className="flex flex-col gap-y-2 items-center">
                            <Image
                                src={'/images/industry/add-course-icon.svg'}
                                width={50}
                                height={50}
                                alt="course icon"
                            />
                            <Typography
                                variant="subtitle"
                                semibold
                                color="text-indigo-400"
                                italic
                            >
                                {' '}
                                {course?.course?.title} - {course?.course?.code}{' '}
                                ({course?.course?.sector?.name})
                            </Typography>
                        </div>
                        <div className="flex justify-between gap-x-5 w-full mt-4">
                            <div className="w-1/2 min-w-96">
                                <TextArea
                                    name="description"
                                    rows={5}
                                    placeholder="Enter description"
                                    required
                                />
                            </div>
                            <div className="w-1/2 min-w-64">
                                <TagInput
                                    name="reference"
                                    onTagEnter={handleTagEnter}
                                />
                                {tags?.reference?.length > 0 && (
                                    <LabelTag
                                        tagName={'reference'}
                                        tags={tags}
                                        handleRemoveTag={handleRemoveTag}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                text={'Update'}
                                variant="info"
                                onClick={submitForm}
                                loading={updateCourseResult.isLoading}
                                disabled={updateCourseResult.isLoading}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
