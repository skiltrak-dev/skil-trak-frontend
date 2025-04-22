import { ActionButton, AuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import React from 'react'

export const CancelWpRequest = ({
    onCancelWPClicked,
    onCancelWPRequestClicked,
}: {
    onCancelWPClicked: any
    onCancelWPRequestClicked: any
}) => {
    return (
        <>
            <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                <ActionButton
                    variant={'error'}
                    onClick={async () => {
                        onCancelWPClicked()
                    }}
                >
                    Cancel Request
                </ActionButton>
            </AuthorizedUserComponent>
            <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                <ActionButton
                    variant={'error'}
                    onClick={async () => {
                        onCancelWPRequestClicked()
                        // await cancelWorkplace(
                        //     Number(
                        //         selectedWorkplace?.id
                        //     )
                        // )
                    }}
                >
                    Cancel Request
                </ActionButton>
            </AuthorizedUserComponent>
        </>
    )
}
