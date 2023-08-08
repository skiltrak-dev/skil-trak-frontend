import React from 'react'
import { Modal } from './Modal'
import { useRouter } from 'next/router'
import { AuthUtils } from '@utils'
import { AiFillWarning } from 'react-icons/ai'

export const SessionExpireModal = ({ onCancel }: { onCancel: () => void }) => {
    const router = useRouter()
    return (
        <div>
            <Modal
                title={'Session Expire'}
                subtitle={'Session Expire'}
                onConfirmClick={() => {
                    AuthUtils.logout(router)
                    onCancel()
                }}
                onCancelClick={() => {}}
                confirmText={'Login'}
                titleIcon={AiFillWarning}
            >
                Your Session is Expired, Please Login Again
            </Modal>
        </div>
    )
}
