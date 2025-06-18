import { AuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import Modal from '@modals/Modal'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { DeleteCourseModal } from '../modal'

export const DeleteIndustryCourse = ({ approval }: any) => {
    return (
        <>
            <AuthorizedUserComponent
                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                isAssociatedWithRto={false}
            >
                <Modal>
                    <Modal.Open opens="updateCourseDescription">
                        <Trash2 className="cursor-pointer bg-red-500 text-white rounded-lg p-1" />
                    </Modal.Open>
                    <Modal.Window name="updateCourseDescription">
                        <DeleteCourseModal
                            // courseId={approval?.course?.id}
                            course={approval}
                        />
                    </Modal.Window>
                </Modal>
            </AuthorizedUserComponent>
        </>
    )
}
