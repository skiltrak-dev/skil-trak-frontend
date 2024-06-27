import { CommonApi, SubAdminApi } from '@queries'
import { ShowErrorNotifications, Switch, Typography } from '@components'
import React, { useEffect } from 'react'
import { useNotification } from '@hooks'

export const ProblamaticStudent = ({
    studentId,
    hasIssue,
}: {
    hasIssue: boolean
    studentId: number
}) => {
    const [problamaticStudent, problamaticStudentResult] =
        SubAdminApi.Student.useProblamaticStudent()

    const { notification } = useNotification()

    useEffect(() => {
        if (problamaticStudentResult.isSuccess) {
            notification.success({
                title: hasIssue
                    ? 'Remove as Problamatic'
                    : 'Mark As Problamatic',
                description: hasIssue
                    ? `Removed Marked ${studentId} As Problamatic`
                    : `Marked ${studentId} As Problamatic`,
            })
        }
    }, [problamaticStudentResult])

    const onMakeProblamatic = () => {
        problamaticStudent(studentId)
    }
    return (
        <>
            <ShowErrorNotifications result={problamaticStudentResult} />
            <div className="py-3 border-b border-secondary-dark">
                <Typography variant="small" medium>
                    Problematic Student
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
                                    onMakeProblamatic()
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
