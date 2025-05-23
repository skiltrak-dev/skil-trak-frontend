import Modal from '@modals/Modal'
import React from 'react'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { VerifyEmailModal } from '../modal'
import { UserRoles } from '@constants'
import { AuthorizedUserComponent, Tooltip } from '@components'

export const VerifyUserEmail = ({
    isEmailVerified,
    userId,
    userName,
}: {
    isEmailVerified: any
    userId: number
    userName: string
}) => {
    return (
        <div className="flex items-center gap-x-2">
            <div className="cursor-pointer group relative">
                <RiVerifiedBadgeFill
                    size={20}
                    className={`${
                        isEmailVerified ? 'text-blue-500' : 'text-gray-500'
                    }`}
                />
                <Tooltip>
                    {isEmailVerified ? 'Email Verified' : 'Email Not Verified'}{' '}
                </Tooltip>
            </div>
            <AuthorizedUserComponent
                roles={[UserRoles.SUBADMIN]}
                isAssociatedWithRto={false}
            >
                {!isEmailVerified && (
                    <div className="">
                        <Modal>
                            <Modal.Open opens="verifyIndustryEmail">
                                <button className="text-xs text-link">
                                    Verify
                                </button>
                            </Modal.Open>
                            <Modal.Window name="verifyIndustryEmail">
                                <VerifyEmailModal
                                    userId={userId}
                                    userName={userName}
                                />
                            </Modal.Window>
                        </Modal>
                    </div>
                )}
            </AuthorizedUserComponent>
        </div>
    )
}
