import { ReactElement, useState } from 'react'

// components
import { EditPassword, ViewUserPassword } from '@components'

export const useActionModal = () => {
    const [passwordModal, setPasswordModal] = useState<ReactElement | null>(
        null
    )

    const onModalCancelClicked = () => {
        setPasswordModal(null)
    }

    const onViewPassword = (item: any) => {
        setPasswordModal(
            <ViewUserPassword
                password={item?.user?.password}
                name={item?.user?.name}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onUpdatePassword = (item: any) => {
        setPasswordModal(
            <EditPassword onCancel={onModalCancelClicked} item={item} />
        )
    }
    return {
        passwordModal,
        onViewPassword,
        setPasswordModal,
        onUpdatePassword,
        onModalCancelClicked,
    }
}
