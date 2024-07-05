import { Button, Modal, ShowErrorNotifications, TextInput } from '@components'
import { useNotification } from '@hooks'
import { CommonApi, SubAdminApi } from '@queries'
import { Student } from '@types'
import { getDate } from '@utils'
import { useEffect, useState } from 'react'
import { MdSnooze } from 'react-icons/md'

export const SnoozeStudentModal = ({
    onCancel,
    student,
}: {
    student: Student
    onCancel: () => void
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [snoozeStudent, snoozeStudentResult] =
        SubAdminApi.Student.useSnoozeStudent()

    const { notification } = useNotification()

    useEffect(() => {
        if (snoozeStudentResult.isSuccess) {
            notification.success({
                title: 'Student Snoozed',
                description: 'Student Snoozed Successfully',
            })
            onCancel()
        }
    }, [snoozeStudentResult])

    const onChange = (date: Date) => {
        setSelectedDate(date)
    }

    const onSubmit = () => {
        if (selectedDate) {
            snoozeStudent({
                id: student?.id,
                date: selectedDate,
            })
        }
    }
    return (
        <>
            <ShowErrorNotifications result={snoozeStudentResult} />
            <Modal
                titleIcon={MdSnooze}
                showActions={false}
                onConfirmClick={() => {}}
                title="Snooze Industry"
                subtitle="Snooze Industry"
                onCancelClick={onCancel}
            >
                <div className="flex w-full items-center gap-x-2">
                    <div className="w-full">
                        <TextInput
                            label={'Enter Snoozing Date'}
                            name={'endDate'}
                            placeholder="Enter Snoozing End Date"
                            type={'date'}
                            onChange={(e: any) => {
                                onChange(e.target?.value)
                            }}
                            min={getDate()}
                        />
                    </div>
                    <Button
                        // Icon={AiFillCheckCircle}
                        text={'Snooze'}
                        onClick={() => {
                            onSubmit()
                        }}
                        variant="info"
                        loading={snoozeStudentResult.isLoading}
                        disabled={
                            snoozeStudentResult.isLoading || !selectedDate
                        }
                    />
                </div>
            </Modal>
        </>
    )
}
