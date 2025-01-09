import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { CommonApi, useRemoveRTOStudentMutation } from '@queries'

import { Student } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const AddToSignupModal = ({
    onCancel,
    industry,
}: {
    onCancel: () => void
    industry: any
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()

    const [addToSignup, addToSignupResult] =
        CommonApi.FindWorkplace.useAddToSignup()

    const onConfirmUClicked = async (industry: any) => {
        await addToSignup(industry.id)
    }

    useEffect(() => {
        if (addToSignupResult.isSuccess) {
            notification.error({
                title: `Future Industry Signed up`,
                description: `Future Industry Signed up`,
            })
            onCancel()
        }
    }, [addToSignupResult])

    return (
        <>
            <ShowErrorNotifications result={addToSignupResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to ${
                    industry?.signedUp ? 'Remove from' : 'Add to'
                } Sign up. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.email}
                actionObject={industry}
                loading={addToSignupResult.isLoading}
            />
        </>
    )
}
