import { CommonApi } from '@queries'
import { ShowErrorNotifications, Switch, Typography } from '@components'
import React, { useEffect } from 'react'
import { useNotification } from '@hooks'

export const ProfilePriority = ({
    studentId,
    isHighPriority,
}: {
    isHighPriority: boolean
    studentId: number
}) => {
    const [makeAsHighPriority, makeAsHighPriorityResult] =
        CommonApi.StudentAssessmentFiles.useMakeAsHighPriority()

    const { notification } = useNotification()

    useEffect(() => {
        if (makeAsHighPriorityResult.isSuccess) {
            notification.success({
                title: isHighPriority
                    ? 'Remove Mark As High Priority'
                    : 'Mark As High Priority',
                description: isHighPriority
                    ? `Removed Marked ${studentId} As High Priority`
                    : `Marked ${studentId} As High Priority`,
            })
        }
    }, [makeAsHighPriorityResult])

    const onMakePriority = () => {
        makeAsHighPriority(studentId)
    }
    return (
        <>
            <ShowErrorNotifications result={makeAsHighPriorityResult} />
            <div className="py-3 border-b border-secondary-dark">
                <Typography variant="small" medium>
                    Profile priority
                </Typography>
                <div className="grid grid-cols-5 items-center  mt-2">
                    <div className="col-span-2">
                        <Typography variant="small" normal>
                            NORMAL
                        </Typography>
                    </div>
                    <div className="col-span-3 grid grid-cols-2">
                        <div className="-mb-2">
                            <Switch
                                name="priority"
                                customStyleClass={'profileSwitch'}
                                onChange={() => {
                                    onMakePriority()
                                }}
                                defaultChecked={isHighPriority}
                                loading={makeAsHighPriorityResult.isLoading}
                                disabled={makeAsHighPriorityResult.isLoading}
                            />
                        </div>
                        <Typography variant="small" normal>
                            HIGH PRIORITY
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
