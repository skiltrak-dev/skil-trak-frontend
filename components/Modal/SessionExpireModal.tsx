import React from 'react'
import { Modal } from './Modal'
import { useRouter } from 'next/router'
import { AuthUtils, isBrowser } from '@utils'
import { AiFillWarning } from 'react-icons/ai'
import { CommonApi } from '@queries'
import { LogoutType } from '@hooks'

export const SessionExpireModal = ({ onCancel }: { onCancel: () => void }) => {
    const router = useRouter()

    const [logoutActivity, logoutActivityResult] =
        CommonApi.LogoutActivity.perFormAcivityOnLogout()

    return (
        <div>
            <Modal
                title={'Session Expire'}
                subtitle={'Session Expire'}
                onConfirmClick={async () => {
                    if (AuthUtils.getToken()) {
                        await logoutActivity({ type: LogoutType.Auto })
                    }
                    AuthUtils.logout(router)
                    if (isBrowser()) {
                        localStorage.setItem('autoLogoutPath', router?.asPath)
                    }
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
