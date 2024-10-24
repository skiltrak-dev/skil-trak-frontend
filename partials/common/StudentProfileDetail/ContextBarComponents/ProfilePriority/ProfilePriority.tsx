import { CommonApi } from '@queries'
import { ShowErrorNotifications, Switch, Typography } from '@components'
import React, { useEffect } from 'react'
import { useNotification } from '@hooks'

export const ProfilePriority = ({
    studentId,
    isHighPriority,
    disabled,
}: {
    disabled: boolean
    studentId: number
    isHighPriority: boolean
}) => {
    const [makeAsHighPriority, makeAsHighPriorityResult] =
        CommonApi.StudentAssessmentFiles.useMakeAsHighPriority()

    const { notification } = useNotification()

    useEffect(() => {
        if (makeAsHighPriorityResult.isSuccess) {
            notification[isHighPriority ? 'warning' : 'success']({
                title: isHighPriority
                    ? 'Remove from High Priority'
                    : 'Mark As High Priority',
                description: isHighPriority
                    ? `Removed from High Priority`
                    : `Marked As High Priority`,
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
                    Profile Priority
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
                                disabled={
                                    makeAsHighPriorityResult.isLoading ||
                                    disabled
                                }
                            />
                        </div>
                        <Typography variant="small" normal>
                            HIGH
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
