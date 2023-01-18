import { Modal, Typography } from '@components'
import React, { useState } from 'react'

export const ViewUserPassword = ({
    password,
    name,
    onCancel,
}: {
    password: string
    name: string
    onCancel: Function
}) => {
    const [copiedPassword, setCopiedPassword] = useState<string | null>(null)

    return (
        <div>
            <Modal
                title={`${name} Account Password`}
                subtitle={'Here is password'}
                onConfirmClick={() => {
                    navigator.clipboard.writeText(password)
                    setCopiedPassword(password)
                }}
                onCancelClick={onCancel}
                confirmText={copiedPassword ? 'Copied' : 'Copy'}
            >
                <Typography>{password}</Typography>
            </Modal>
        </div>
    )
}
