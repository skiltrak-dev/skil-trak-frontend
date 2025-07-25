import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Student, Subscriber } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'
import { useChangeStatus } from '../hooks'

export const AcceptModal = ({
    item,
    onCancel,
    setResult,
}: {
    item: Student
    onCancel: () => void
    setResult?: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const { onAccept, changeStatusResult } = useChangeStatus()
    const onConfirmUClicked = async (item: Student) => {
        await onAccept(item)
    }

    useEffect(() => {
        if (setResult) {
            setResult(changeStatusResult)
        }
    }, [changeStatusResult])

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.success({
                title: `Request Accepted`,
                description: `Student "${item?.user?.name}" has been accepted.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `${
                    !item?.rto || !item?.courses
                        ? 'Please update student profile before going to Accept'
                        : 'Your request for accepting Student was failed'
                }`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={HiCheckBadge}
            variant="success"
            title="Are you sure!"
            description={`${
                !item?.rto || !item?.courses
                    ? `Please complete <em>"Student"<em> profile before going to Accept`
                    : `You are about to accept <em>"${item?.user?.name}"<em>. Do you wish to continue?`
            } `}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={item?.user?.email}
            actionObject={item}
            loading={changeStatusResult.isLoading}
            disable={!item?.rto || !item?.courses}
        />
    )
}
