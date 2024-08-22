import {
    AuthorizedUserComponent,
    Button,
    Select,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useContextBar, useNotification } from '@hooks'
import { useShowExistingIndustriesQuery, SubAdminApi } from '@queries'
import { Course } from '@types'
import React, { useEffect, useState } from 'react'
import { AddSecondWorkplaceForm } from '../form'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { UserRoles } from '@constants'
import { AddWorkplaceAction } from '@partials/common/StudentProfileDetail/components'

export const AddSecondWPCB = ({
    studentId,
    studentUserId,
}: {
    studentId: number
    studentUserId: number
}) => {
    const [isAddCustomIndustry, setIsAddCustomIndustry] = useState(false)

    const [selectedValues, setSelectedValues] = useState({
        industryId: -1,
        courseId: -1,
    })
    const { notification } = useNotification()
    const { setTitle } = useContextBar()

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
        item: c,
        value: c?.id,
        label: c?.title,
    }))

    const industryOptions = getExistingIndustries?.data?.map((i: any) => ({
        label: i?.user?.name,
        value: i?.id,
    }))

    const onChange = (e: any, name: string) => {
        setSelectedValues((preVal) => ({
            ...preVal,
            [name]: e?.value,
        }))
    }
    const onSubmit = () => addSecondWorkplace({ ...selectedValues, studentId })
    return (
        <div>
            <ShowErrorNotifications result={addSecondWorkplaceResult} />
            <div className={'flex justify-between items-center mb-3'}>
                <div>
                    <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                        <AddWorkplaceAction
                            id={studentId}
                            profileCompletion={100}
                            text={'Search Workplace'}
                        />
                    </AuthorizedUserComponent>
                </div>
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
                        components={{
                            Option: CourseSelectOption,
                        }}
                        formatOptionLabel={formatOptionLabel}
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
                <AddSecondWorkplaceForm
                    courseOptions={courseOptions}
                    studentId={studentId}
                    studentUserId={studentUserId}
                />
            )}
        </div>
    )
}
