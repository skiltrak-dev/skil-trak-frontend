import { Portal } from '@components/Portal'
import { LogoutType } from '@hooks'
import { CommonApi } from '@queries'
import { AuthUtils, isBrowser } from '@utils'
import { useRouter } from 'next/router'
import { AiFillWarning } from 'react-icons/ai'
import { Modal } from './Modal'

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

                        // const isManagementPath = router?.pathname?.startsWith(
                        //     '/portals/management'
                        // )

                        // await signOut({
                        //     redirect: true,
                        //     callbackUrl: isManagementPath
                        //         ? 'auth/management-login-auth'
                        //         : '/auth/login-auth',
                        // })

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
