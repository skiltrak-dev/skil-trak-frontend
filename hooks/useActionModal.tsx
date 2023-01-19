import { ReactElement, useState } from 'react'

// components
import { ViewUserPassword } from '@components'

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
    return {
        passwordModal,
        setPasswordModal,
        onViewPassword,
        onModalCancelClicked,
    }
}
