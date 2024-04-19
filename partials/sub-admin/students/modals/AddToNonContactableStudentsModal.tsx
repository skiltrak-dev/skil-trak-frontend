import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Student, SubAdmin } from '@types'
import { useEffect } from 'react'
import { HiCheckBadge } from 'react-icons/hi2'

// query
import { SubAdminApi } from '@queries'

export const AddToNonContactableStudents = ({
    student,
    onCancel,
}: {
    student: Student
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()

    const [notContactable, notContactableResult] =
        SubAdminApi.Student.useNotContactable()

    const onConfirmClicked = async (student: Student) => {
        await notContactable(student?.id)
    }

    useEffect(() => {
        if (notContactableResult.isSuccess) {
            notification.success({
                title: student?.nonContactable
                    ? 'Contactable'
                    : 'Not Contactable',
                description: student?.nonContactable
                    ? 'Contactable'
                    : 'Not Contactable',
            })
            onCancel()
        }
    }, [notContactableResult])

    return (
        <>
            <ShowErrorNotifications result={notContactableResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to add ${
                    student?.nonContactable ? 'Contactable' : 'Not Contactable'
                } <em>"${student?.user?.name}"<em>. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={student?.user?.email}
                actionObject={student}
                loading={notContactableResult.isLoading}
            />
        </>
    )
}
