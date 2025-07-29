import { Button, GlobalModal, Typography } from '@components'
import { UserRoles } from '@constants'
import { useSubadminProfile } from '@hooks'
import { Student } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { MdCancel } from 'react-icons/md'

export const AppointmentBookModal = ({
    student,
    courseId,
    studentUser,
    onCancel,
}: {
    courseId: number
    student: Student
    studentUser: number
    onCancel: () => void
}) => {
    console.log({ studentUser })
    const router = useRouter()

    const subadmin = useSubadminProfile()

    const role = getUserCredentials()?.role
    return (
        <GlobalModal>
            <div className="max-w-4xl px-5 py-6 relative flex flex-col gap-y-2 ">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="max-h-44 flex flex-col gap-y-5">
                    <Typography
                        variant="h4"
                        center
                        semibold
                        color={'text-primaryNew'}
                    >
                        Student Approved
                    </Typography>
                    <Typography center color={'text-primaryNew'}>
                        Please book an Appointment to proceed
                    </Typography>
                    <div className="mx-auto">
                        <Button
                            text="Book Appointment"
                            onClick={() => {
                                const link =
                                    role === UserRoles.ADMIN ||
                                    subadmin?.isAdmin
                                        ? {
                                              pathname:
                                                  '/portals/admin/appointment-type/create-appointment',
                                              query: {
                                                  student: studentUser,
                                                  courseId,
                                              },
                                          }
                                        : role === UserRoles.SUBADMIN
                                        ? {
                                              pathname:
                                                  '/portals/sub-admin/tasks/appointments/create-appointment',
                                              query: {
                                                  student: studentUser,
                                                  courseId,
                                              },
                                          }
                                        : null
                                if (link) {
                                    router.push(link)
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
