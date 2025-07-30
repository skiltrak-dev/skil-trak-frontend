import { ActionButton, AuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import Modal from '@modals/Modal'
import { BiTrash } from 'react-icons/bi'
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
                        <ActionButton Icon={BiTrash} variant="error" rounded />
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
