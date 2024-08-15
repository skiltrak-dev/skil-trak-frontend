import { CommonApi, SubAdminApi } from '@queries'
import { ShowErrorNotifications, Switch, Typography } from '@components'
import React, { ReactElement, useEffect, useState } from 'react'
import { useNotification } from '@hooks'
import { FlagStudentModal } from '../../modals'

export const ProblamaticStudent = ({
    studentId,
    hasIssue,
}: {
    hasIssue: boolean
    studentId: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [problamaticStudent, problamaticStudentResult] =
        SubAdminApi.Student.useProblamaticStudent()

    const { notification } = useNotification()

    useEffect(() => {
        if (problamaticStudentResult.isSuccess) {
            notification.success({
                title: hasIssue ? 'Remove as Flaged' : 'Mark As Flaged',
                description: hasIssue
                    ? `Removed Marked As Flaged`
                    : `Marked As Flaged`,
            })
        }
    }, [problamaticStudentResult])

    const onCancel = () => setModal(null)

    const onMakeProblamatic = () => {
        setModal(<FlagStudentModal onCancel={onCancel} studentId={studentId} />)
    }
    return (
        <>
            {modal}
            <ShowErrorNotifications result={problamaticStudentResult} />
            <div className="py-3 border-b border-secondary-dark">
                <Typography variant="small" medium>
                    Flagged Student
                </Typography>
                <div className="grid grid-cols-5 items-center  mt-2">
                    <div className="col-span-2">
                        <Typography variant="small" normal>
                            No
                        </Typography>
                    </div>
                    <div className="col-span-3 grid grid-cols-2">
                        <div className="-mb-2">
                            <Switch
                                name="priority"
                                customStyleClass={'profileSwitch'}
                                onChange={() => {
                                    hasIssue
                                        ? problamaticStudent({ studentId })
                                        : onMakeProblamatic()
                                }}
                                defaultChecked={hasIssue}
                                loading={problamaticStudentResult.isLoading}
                                disabled={problamaticStudentResult.isLoading}
                            />
                        </div>
                        <Typography variant="small" normal>
                            Yes
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
