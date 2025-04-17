import Modal from '@modals/Modal'
import React from 'react'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { VerifyEmailModal } from '../modal'
import { UserRoles } from '@constants'
import { AuthorizedUserComponent } from '@components'

export const VerifyUserEmail = ({ isEmailVerified, userId }: any) => {
    return (
        <div className="flex items-center gap-x-2">
            <div
                className="cursor-pointer"
                title={
                    isEmailVerified ? 'Email Verified' : 'Email Not Verified'
                }
            >
                <RiVerifiedBadgeFill
                    size={20}
                    className={`${
                        isEmailVerified ? 'text-blue-500' : 'text-gray-500'
                    }`}
                />
            </div>
            <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                {!isEmailVerified && (
                    <div className="">
                        <Modal>
                            <Modal.Open opens="verifyIndustryEmail">
                                <button className="text-xs text-link">
                                    Verify
                                </button>
                            </Modal.Open>
                            <Modal.Window name="verifyIndustryEmail">
                                <VerifyEmailModal userId={userId} />
                            </Modal.Window>
                        </Modal>
                    </div>
                )}
            </AuthorizedUserComponent>
        </div>
    )
}
