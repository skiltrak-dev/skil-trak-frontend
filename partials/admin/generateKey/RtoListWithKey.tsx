import React, { ReactElement, useEffect, useState } from 'react'
import { ApiAccessModal, OTPVerificationModal } from './modal'

export const RtoListWithKey = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    useEffect(() => {
        setModal(<OTPVerificationModal onCancel={onCancel} />)
    }, [])

    return <div>{modal}</div>
}
