import {
    Button,
    Select,
    ShowErrorNotifications,
    TagInput,
    TextArea,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { LabelTag } from '@partials/student/talentPool'
import { CommonApi, SubAdminApi } from '@queries'
import { getSectors } from '@utils'
import Image from 'next/image'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const AddCourseModal = ({ courses, onCloseModal }: any) => {
    const [tags, setTags] = useState<any>({
        reference: [],
    })
    const [selectedSector, setSelectedSector] = useState<string | null>(null)

    const { notification } = useNotification()

    const router = useRouter()

    const [addCourse, addCourseResult] =
        SubAdminApi.Industry.useRequestToAddCoursesToIndustry()

    const validationSchema = yup.object().shape({
        sector: yup.number().required('Sector is required'),
        courses: yup.number().required('Course is required'),
        description: yup.string().required('Description is required'),
        // reference: yup.string().url('Invalid URL format'),
    })
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    useEffect(() => {
        if (addCourseResult.isSuccess) {
            notification.success({
                title: 'Course Added',
                description: 'Course added successfully',
            })

            onCloseModal()
            methods.reset()
        }
    }, [addCourseResult.isSuccess])

    const subadminCourses = CommonApi.Courses.subadminCoursesList()
    const sectorsWithCourses = getSectors(subadminCourses?.data)

    const filteredCourses = subadminCourses?.data?.filter(
        (course: any) => !courses?.some((c: any) => c.id === course.id)
    )
    const courseOptions = filteredCourses
        ?.filter((course: any) => course?.sector?.id === selectedSector)
        ?.map((course: any) => ({
            value: course?.id,
            label: course?.title,
        }))

    const uniqueSectors = (() => {
        const sectors = subadminCourses?.data?.map((item: any) => item?.sector)
        const seen = new Set()
        return sectors?.filter((sector: any) => {
            if (seen.has(sector.id)) {
                return false
            } else {
                seen.add(sector.id)
                return true
            }
        })
    })()

    const sectorsOptions = uniqueSectors?.map((sector: any) => ({
        value: sector?.id,
        label: sector?.name,
    }))

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
        const { course, description } = data
        const { reference } = tags
        addCourse({
            course: course,
            description: description,
            reference: reference,
            industry: router.query.id,
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
            <ShowErrorNotifications result={addCourseResult} />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="flex justify-center  flex-col gap-y-2 px-8 py-4">
                        <div className="flex flex-col gap-y-2 items-center">
                            <Image
                                src={'/images/industry/add-course-icon.svg'}
                                width={50}
                                height={50}
                                alt="course icon"
                            />
                            <Typography variant="subtitle" semibold>
                                Add Course
                            </Typography>
                        </div>
                        <div className="flex items-center justify-center gap-x-5 w-full">
                            <div className="w-1/2">
                                <Select
                                    name="sector"
                                    options={sectorsOptions}
                                    label={'Sector'}
                                    onlyValue
                                    onChange={(e: any) => setSelectedSector(e)}
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <Select
                                    name="course"
                                    options={courseOptions}
                                    label={'Course'}
                                    onlyValue
                                    disabled={!selectedSector}
                                    // multi
                                    required
                                />
                            </div>
                        </div>
                        <Typography variant="label" semibold>
                            If you want to Add the course in this sector, please
                            provide these details
                        </Typography>
                        <div className="flex gap-x-5 mt-4">
                            <div className="flex flex-col gap-y-2">
                                <Typography variant="small" semibold>
                                    Description
                                </Typography>
                                <Typography variant="small" medium>
                                    Please provide the reason why you are adding
                                    this course to the industry.
                                </Typography>
                                <TextArea
                                    name="description"
                                    rows={3}
                                    placeholder="Enter description"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Typography variant="small" semibold>
                                    Reference URLs (Optional)
                                </Typography>
                                <Typography variant="small" medium>
                                    Where did you find out about this course?
                                    Please provide a reference link.
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
                                text={'Sent Request'}
                                onClick={submitForm}
                                loading={addCourseResult.isLoading}
                                disabled={addCourseResult.isLoading}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
