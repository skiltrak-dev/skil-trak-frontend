import React, { useEffect, useState } from 'react'
import { LabelTag } from '@partials/student/talentPool'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, TagInput, TextArea, Typography } from '@components'
import Image from 'next/image'
import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'
import { useRouter } from 'next/router'

export const AddPrevCourseDescription = ({ courseId, onCloseModal }: any) => {
    const [tags, setTags] = useState<any>({
        reference: [],
    })
    const router = useRouter()
    const industryId = router?.query?.id
    const [addCourseDescription, addCourseDescriptionResult] =
        SubAdminApi.Industry.useAddPrevCourseDescription()
    const { notification } = useNotification()

    const validationSchema = yup.object().shape({
        description: yup.string().required('Description is required'),
        // reference: yup.string().url('Invalid URL format'),
    })
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    // body: course: id, industry: id, description, reference

    useEffect(() => {
        if (addCourseDescriptionResult.isSuccess) {
            notification.success({
                title: 'Course Description',
                description: 'Course description successfully',
            })

            onCloseModal()
            methods.reset()
        }
    }, [addCourseDescriptionResult.isSuccess])

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
        const { reference } = tags
        addCourseDescription({
            course: courseId,
            industry: industryId,
            description: data.description,
            reference: reference,
        })
    }
    const submitForm = () => {
        onSubmit(methods.getValues())
    }
    return (
        <div className="min-w-[40rem]">
            <div className="flex flex-col items-center gap-y-3 justify-center mb-8">
                <Image
                    src={'/images/industry/add-course-icon.svg'}
                    width={50}
                    height={50}
                    alt="course icon"
                />
                <Typography variant="title" center semibold>
                    Please Update the following fields
                </Typography>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-y-5 w-full">
                        <div className="flex flex-col gap-y-2">
                            <Typography variant="small" semibold>
                                Description
                            </Typography>
                            <Typography variant="small" medium>
                                Please provide the description for this course.
                            </Typography>
                            <TextArea
                                name="description"
                                required
                                placeholder="Enter description here..."
                                // onChange={(e: any) => {
                                //     setDescription(e?.target?.value)
                                // }}
                                rows={4}
                                // showError={false}
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Typography variant="small" semibold>
                                Reference URLs (Optional)
                            </Typography>
                            <Typography variant="small" medium>
                                Where did you find out about this course? Please
                                provide a reference link.
                            </Typography>
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
                            onClick={submitForm}
                            text="Add Description"
                            loading={addCourseDescriptionResult.isLoading}
                            disabled={addCourseDescriptionResult.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
