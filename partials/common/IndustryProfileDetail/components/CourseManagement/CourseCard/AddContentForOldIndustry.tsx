import { AuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import Modal from '@modals/Modal'
import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { AddPrevCourseDescription } from '../modal'

export const AddContentForOldIndustry = ({ id }: any) => {
    return (
        <>
            <AuthorizedUserComponent
                roles={[UserRoles.SUBADMIN]}
                isAssociatedWithRto={false}
            >
                <Modal>
                    <Modal.Open opens="addCourseDescription">
                        <FaRegEdit
                            className="text-link cursor-pointer"
                            size={20}
                        />
                    </Modal.Open>
                    <Modal.Window name="addCourseDescription">
                        <AddPrevCourseDescription courseId={id} />
                    </Modal.Window>
                </Modal>
            </AuthorizedUserComponent>
        </>
    )
}
