import { Industry } from '@types'
import { useNotification } from '@hooks'
import React, { ReactElement, useState } from 'react'
import { Button, InitialAvatar, Typography } from '@components'
import { useApplyWorkplaceOnExistingIndustryMutation } from '@queries'
import { WorkplaceCreatedModal } from '../requestWorkplaceDetail/modal'

interface industryWithListing extends Industry {
    locationId: number
}

export const IndustryCard = ({
    industry,
    student,
    selectedCourse,
}: {
    student: number
    selectedCourse: number
    industry: industryWithListing
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { notification } = useNotification()

    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyWorkplaceOnExistingIndustryMutation()

    const onCancelModal = () => setModal(null)

    return (
        <>
            {modal}
            <div className="bg-secondary-dark py-2 px-4 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                    {industry?.user?.name && (
                        <InitialAvatar
                            name={industry?.user?.name}
                            imageUrl={industry?.user?.avatar}
                            large
                        />
                    )}
                    <div>
                        {/* <Typography variant={'muted'} color={'gray'}>
        5km away
    </Typography> */}
                        <Typography variant={'label'}>
                            {industry?.user?.name}
                        </Typography>
                        <Typography variant={'muted'} color={'gray'}>
                            {industry?.suburb}, {industry?.addressLine1}
                        </Typography>
                    </div>
                </div>
                <Button
                    variant={'secondary'}
                    text={'Apply Here'}
                    onClick={async () => {
                        if (selectedCourse) {
                            await applyForWorkplace({
                                student: student,
                                IndustryId: industry?.id,
                                courseId: selectedCourse,
                                location: industry?.locationId,
                                document: -1,
                            }).then((res: any) => {
                                if (res?.error) {
                                    notification.error({
                                        title: res?.error?.data?.error,
                                        description: res?.error?.data?.message,
                                        dissmissTimer: 5555,
                                    })
                                }
                                if (res?.data) {
                                    setModal(
                                        <WorkplaceCreatedModal
                                            onCancel={onCancelModal}
                                        />
                                    )
                                    // setActive((active: number) => active + 1)
                                }
                            })
                        } else {
                            notification.warning({
                                title: 'Course Required',
                                description: 'Course Must be selected',
                            })
                        }
                    }}
                    loading={applyForWorkplaceResult.isLoading}
                    disabled={applyForWorkplaceResult.isLoading}
                />
            </div>
        </>
    )
}
