import { Button, InitialAvatar, Typography } from '@components'
import { useNotification } from '@hooks'
import { Industry } from '@types'
import React, { ReactElement, useState } from 'react'
import { useApplyWorkplaceWithAbnIndustryMutation } from '@queries'
import { WorkplaceCreatedModal } from '@partials/sub-admin/students/workplace/requestWorkplaceDetail/modal'

export const UpdatedExistingIndustryCard = ({
    industry,
    selectedCourse,
}: {
    industry: Industry
    selectedCourse: number | null
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { notification } = useNotification()

    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyWorkplaceWithAbnIndustryMutation()

    const onApplyForWorkplace = async () => {
        if (selectedCourse) {
            const wp: any = await applyForWorkplace({
                IndustryId: industry?.id,
                courseId: selectedCourse,
            })
            if (wp?.data) {
                notification.success({
                    title: 'Workplace Created',
                    description: 'Workplace Created Successfully',
                })
                setModal(<WorkplaceCreatedModal onCancel={() => {}} />)
            }
        } else {
            notification.warning({
                title: 'Course Required',
                description: 'Course Must be selected',
            })
        }
    }
    return (
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
                        {industry?.addressLine1}, {industry?.addressLine2}
                    </Typography>
                </div>
            </div>
            <Button
                variant={'primary'}
                text={'Add Workplace'}
                onClick={async () => {
                    onApplyForWorkplace()
                }}
                loading={applyForWorkplaceResult.isLoading}
                disabled={applyForWorkplaceResult.isLoading}
            />
        </div>
    )
}
