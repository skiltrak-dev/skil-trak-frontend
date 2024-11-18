import { AuthorizedUserComponent, Button } from '@components'
import Modal from '@modals/Modal'
import { AddCourseModal, RejectedSectorModal } from './modal'
import { useRouter } from 'next/router'
import { useGetSubAdminIndustriesProfileQuery } from '@queries'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'

export const SectorCardHeader = () => {
    const router = useRouter()
    const id = router.query.id
    const industry = useGetSubAdminIndustriesProfileQuery(Number(id), {
        skip: !id,
    })
    const userRole = getUserCredentials().role
  
    return (
        <>
            <div className="flex justify-between items-center mb-6 pb-4  border-b">
                <h1 className="text-xl font-semibold">Sector & Courses</h1>
                <div className="flex gap-4">
                    {/* View Rejected Sectors Modal */}
                    <Modal>
                        <Modal.Open opens="rejectedSectors">
                            <button className="text-link text-sm hover:underline">
                                View Rejected Courses
                            </button>
                        </Modal.Open>
                        <Modal.Window name="rejectedSectors">
                            <RejectedSectorModal />
                        </Modal.Window>
                    </Modal>
                    {/* Add Course Modal */}
                    <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                        <Modal>
                            <Modal.Open opens="addDepartmentCourse">
                                <Button text="Add Course" />
                            </Modal.Open>
                            <Modal.Window name="addDepartmentCourse">
                                <AddCourseModal
                                    courses={industry?.data?.courses}
                                />
                            </Modal.Window>
                        </Modal>
                    </AuthorizedUserComponent>
                </div>
            </div>
        </>
    )
}
