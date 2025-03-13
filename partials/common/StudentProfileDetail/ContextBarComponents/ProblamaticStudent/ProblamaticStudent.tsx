import { CommonApi, SubAdminApi } from '@queries'
import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Switch,
    Typography,
} from '@components'
import React, { ReactElement, useEffect, useState } from 'react'
import { useNotification } from '@hooks'
import { FlagStudentModal } from '../../modals'
import { TiWarning } from 'react-icons/ti'

export const ProblamaticStudent = ({
    hasIssue,
    disabled,
    studentId,
    isReported,
}: {
    disabled: boolean
    hasIssue: boolean
    studentId: number
    isReported?: boolean
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isChecked, setIsChecked] = useState(hasIssue)
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

    const onCancel = () => {
        setModal(null)
        setIsChecked(hasIssue)
    }

    const onMakeProblamatic = () => {
        setModal(<FlagStudentModal onCancel={onCancel} studentId={studentId} />)
    }
    const onSwitchOff = () => {
        setModal(
            <GlobalModal>
                <div className="flex flex-col justify-center items-center gap-y-4 px-20 py-10">
                    <div>
                        <TiWarning className="text-yellow-500" size={55} />
                    </div>
                    <div className="fex flex-col gap-y-8 justify-center items-center mb-5">
                        <Typography variant="h4" center>
                            Are you sure?
                        </Typography>
                        <Typography variant="body" center>
                            You want to switch the flag OFF?
                        </Typography>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <Button onClick={onCancel} outline variant="error">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                problamaticStudent({ studentId }).then(() => {
                                    setIsChecked(false) // Update state only after success
                                    setModal(null) // Close modal after API call
                                })
                            }}
                            loading={problamaticStudentResult.isLoading}
                            disabled={problamaticStudentResult.isLoading}
                        >
                            Yes
                        </Button>
                    </div>
                </div>
            </GlobalModal>
        )
    }
    const handleSwitchChange = () => {
        if (!isChecked) {
            // Open modal if switching "on"
            onMakeProblamatic()
        } else {
            // Open modal if switching "off"
            onSwitchOff()
        }
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={problamaticStudentResult} />
            <div className="py-3 border-b border-secondary-dark">
                <div className="flex gap-x-2 items-center">
                    <Typography variant="small" medium>
                        Flagged Student
                    </Typography>
                    {isReported && (
                        <div
                            title="Reported to RTO"
                            className="text-red-600 px-2 text-center cursor-pointer font-bold border rounded-lg border-red-500"
                        >
                            R
                        </div>
                    )}
                </div>
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
                                onChange={handleSwitchChange}
                                isChecked={hasIssue}
                                value={hasIssue}
                                defaultChecked={hasIssue}
                                loading={problamaticStudentResult.isLoading}
                                disabled={
                                    problamaticStudentResult.isLoading ||
                                    disabled
                                }
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
