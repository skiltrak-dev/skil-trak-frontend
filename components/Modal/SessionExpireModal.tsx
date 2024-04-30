import React from 'react'
import { Modal } from './Modal'
import { useRouter } from 'next/router'
import { AuthUtils, isBrowser } from '@utils'
import { AiFillWarning } from 'react-icons/ai'
import { CommonApi } from '@queries'
import { LogoutType } from '@hooks'
import { Portal } from '@components/Portal'
import { UserRoles } from '@constants'

export const SessionExpireModal = ({ onCancel }: { onCancel: () => void }) => {
    const router = useRouter()

    const [logoutActivity, logoutActivityResult] =
        CommonApi.LogoutActivity.perFormAcivityOnLogout()

    return (
        <div>
            <Portal>
                <Modal
                    title={'Session Expire'}
                    subtitle={'Session Expire'}
                    onConfirmClick={async () => {
                        if (AuthUtils.token()) {
                            await logoutActivity({ type: LogoutType.Auto })
                        }
                        // if (UserRoles.MANAGER) {
                        //     AuthUtils.managerLogout(router)
                        // } else {
                        //     AuthUtils.logout(router)
                        // }
                        AuthUtils.logout(router)
                        if (isBrowser()) {
                            localStorage.setItem(
                                'autoLogoutPath',
                                router?.asPath
                            )
                        }
                        onCancel()
                    }}
                    confirmText={'Login'}
                    titleIcon={AiFillWarning}
                >
                    Your Session is Expired, Please Login Again
                </Modal>
            </Portal>
        </div>
    )
}
