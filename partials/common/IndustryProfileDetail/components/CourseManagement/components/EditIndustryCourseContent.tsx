import { ActionButton, AuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import Modal from '@modals/Modal'
import { BiPencil } from 'react-icons/bi'
import { EditCourseModal } from '../modal'

export const EditIndustryCourseContent = ({ approval }: any) => {
    return (
        <div>
            <AuthorizedUserComponent
                roles={[UserRoles.SUBADMIN, UserRoles.ADMIN]}
                isAssociatedWithRto={false}
            >
                <Modal>
                    <Modal.Open opens="editCourse">
                        <ActionButton
                            Icon={BiPencil}
                            variant="success"
                            rounded
                        />
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
