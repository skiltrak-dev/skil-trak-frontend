import { AuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import Modal from '@modals/Modal'
import React from 'react'
import { EditCourseModal } from '../modal'
import { Pencil } from 'lucide-react'

export const EditIndustryCourseContent = ({ approval }: any) => {
    return (
        <div>
            <AuthorizedUserComponent
                roles={[UserRoles.SUBADMIN]}
                isAssociatedWithRto={false}
            >
                <Modal>
                    <Modal.Open opens="editCourse">
                        <Pencil className="cursor-pointer bg-[#047857] text-white rounded-lg p-1" />
                    </Modal.Open>
                    <Modal.Window name="editCourse">
                        <EditCourseModal
                            course={approval}
                            courseRequestId={approval?.id}
                        />
                    </Modal.Window>
                </Modal>
            </AuthorizedUserComponent>
        </div>
    )
}
