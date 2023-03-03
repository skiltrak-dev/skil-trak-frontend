import { Button, Select, ShowErrorNotifications, Typography } from '@components'
import { useContextBar, useNotification } from '@hooks'
import { useShowExistingIndustriesQuery, SubAdminApi } from '@queries'
import { Course } from '@types'
import React, { useEffect, useState } from 'react'
import { AddSecondWorkplaceForm } from '../form'

export const AddSecondWPCB = ({ studentId }: { studentId: number }) => {
    const [isAddCustomIndustry, setIsAddCustomIndustry] = useState(false)
    const [customIndustriesOptions, setCustomIndustriesOptions] = useState<
        any | null
    >([])
    const [selectedCustomIndustry, setSelectedCustomIndustry] = useState(false)
    const [selectedValues, setSelectedValues] = useState({
        industryId: -1,
        courseId: -1,
    })
    const { notification } = useNotification()
    const { setTitle, hide, setContent } = useContextBar()

    const courses = SubAdminApi.Student.useCourses(studentId, {
        skip: !studentId,
    })
    const [addSecondWorkplace, addSecondWorkplaceResult] =
        SubAdminApi.Student.useAddSecondWorkplace()

    const getExistingIndustries = useShowExistingIndustriesQuery()

    useEffect(() => {
        setTitle('Add Second Workplace')
    }, [])

    useEffect(() => {
        if (addSecondWorkplaceResult.isSuccess) {
            notification.success({
                title: 'Second Workplace Added',
                description: 'Second workplace Added Successfully',
            })
        }
    }, [addSecondWorkplaceResult])

    const courseOptions = courses?.data?.map((c: Course) => ({
        value: c?.id,
        label: c?.title,
    }))

    const industryOptions = getExistingIndustries?.data?.data?.map(
        (i: any) => ({
            label: i?.user?.name,
            value: i?.id,
        })
    )

    const onChange = (e: any, name: string) => {
        setSelectedValues((preVal) => ({
            ...preVal,
            [name]: e?.value,
        }))
    }
    const onSubmit = () => {
        addSecondWorkplace({ ...selectedValues, studentId })
    }
    return (
        <div>
            <ShowErrorNotifications result={addSecondWorkplaceResult} />
            <div
                onClick={() => {
                    setIsAddCustomIndustry(!isAddCustomIndustry)
                }}
                className="cursor-pointer flex justify-end font-bold"
            >
                <Typography color={'text-link'} variant={'small'}>
                    {isAddCustomIndustry
                        ? 'Select From Existing'
                        : '+ Add Custom Industry'}
                </Typography>
            </div>
            {!isAddCustomIndustry ? (
                <div className="flex flex-col gap-y-2">
                    <Select
                        label={'Course'}
                        name={'courseId'}
                        options={courseOptions}
                        placeholder={'Select Industries...'}
                        loading={courses.isLoading}
                        disabled={courses.isLoading}
                        onChange={(e: any) => {
                            onChange(e, 'courseId')
                        }}
                        validationIcons
                    />
                    <Select
                        label={'Industries'}
                        name={'industryId'}
                        options={industryOptions}
                        placeholder={'Select Industries...'}
                        loading={getExistingIndustries.isLoading}
                        disabled={getExistingIndustries.isLoading}
                        onChange={(e: any) => {
                            onChange(e, 'industryId')
                        }}
                        validationIcons
                    />
                    <Button
                        text={'Select'}
                        onClick={onSubmit}
                        loading={addSecondWorkplaceResult.isLoading}
                        disabled={addSecondWorkplaceResult.isLoading}
                    />
                </div>
            ) : (
                <AddSecondWorkplaceForm studentId={studentId} />
            )}
        </div>
    )
}
