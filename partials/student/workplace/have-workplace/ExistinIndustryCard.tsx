import React, { useEffect, useState } from 'react'
import { Typography, Button, Card, InitialAvatar, Select } from '@components'

// query
import {
    useApplyWorkplaceWithAbnIndustryMutation,
    useGetStudentProfileDetailQuery,
} from '@queries'
import { useNotification } from '@hooks'
import { Course } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'

export const ExistingIndustryCard = ({
    industry,
    setActive,
    setWorkplaceData,
}: any) => {
    const [selectedCourse, setselectedCourse] = useState<number | null>(null)

    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyWorkplaceWithAbnIndustryMutation()
    const { data, isLoading } = useGetStudentProfileDetailQuery()

    const { notification } = useNotification()

    useEffect(() => {
        if (applyForWorkplaceResult.isSuccess) {
            // setWorkplaceData(applyForWorkplaceResult?.data?.workplaceRequest)
            setActive((active: number) => active + 1)
        }
    }, [applyForWorkplaceResult])

    const courseOptions =
        data?.courses && data?.courses?.length > 0
            ? data?.courses?.map((course: Course) => ({
                  item: course,
                  value: course?.id,
                  label: course?.title,
              }))
            : []

    return (
        <div>
            <Card>
                <div className="mb-4">
                    <Typography variant={'subtitle'}>
                        We found following industry
                    </Typography>
                    <Typography variant={'small'} color={'text-gray-400'}>
                        This is result of ABN number you have provided{' '}
                        <i>{industry.abn}</i>
                    </Typography>
                </div>

                <Typography variant={'small'} color={'text-gray-500'}>
                    You can carry on by clicking &apos;Apply Here&apos; button
                </Typography>

                <div className="mt-2">
                    <Select
                        label={'Select Course'}
                        name={'course'}
                        required
                        options={courseOptions}
                        placeholder={'Select Course...'}
                        loading={isLoading}
                        onChange={(e: any) => {
                            setselectedCourse(e?.value)
                        }}
                        components={{
                            Option: CourseSelectOption,
                        }}
                        formatOptionLabel={formatOptionLabel}
                    />
                </div>
                <div className="-mt-2 bg-gray-100 py-2 px-4 rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-x-2">
                        <InitialAvatar
                            name={industry?.user?.name}
                            imageUrl={industry?.user?.avatar}
                            large
                        />
                        <div>
                            {/* <Typography variant={'muted'} color={'gray'}>
                        5km away
                    </Typography> */}
                            <Typography variant={'label'}>
                                {industry?.user?.name}
                            </Typography>
                            <Typography variant={'muted'} color={'gray'}>
                                {industry?.addressLine1},{' '}
                                {industry?.addressLine2}
                            </Typography>
                        </div>
                    </div>
                    <Button
                        variant={'primary'}
                        text={'Apply Here'}
                        onClick={async () => {
                            if (selectedCourse) {
                                await applyForWorkplace({
                                    document: -1,
                                    IndustryId: industry?.id,
                                    courseId: selectedCourse,
                                })
                            } else {
                                notification.warning({
                                    title: 'Course Required',
                                    description: 'Course Must be selected',
                                })
                            }
                            // await applyForWorkplace(industry?.id)
                        }}
                        loading={applyForWorkplaceResult.isLoading}
                        disabled={applyForWorkplaceResult.isLoading}
                    />
                </div>
            </Card>
        </div>
    )
}
