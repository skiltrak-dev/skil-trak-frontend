import { Button, GlobalModal, Typography } from '@components'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { MdCancel, MdOutlineError } from 'react-icons/md'
import { SubAdminApi } from '@queries'

export const BookAppointmentInfoModal = ({
    onCancel,
    studentUser,
}: {
    studentUser: number
    onCancel: () => void
}) => {
    const router = useRouter()
    const role = getUserCredentials()?.role

    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    })

    return (
        <GlobalModal>
            <div className="max-w-4xl px-5 py-6 relative flex flex-col gap-y-2 ">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="lg:px-32">
                    <div className="flex flex-col gap-y-3.5 justify-between items-center">
                        <MdOutlineError className="text-error text-8xl" />
                        <div className="mx-auto">
                            <Typography variant="h4" center semibold>
                                Book Appointment
                            </Typography>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Typography center>
                            <span className="text-[15px] leading-4 text-center">
                                To move forward, please book an appointment for
                                student with the workplace. This step is
                                reqiured to proceed.
                            </span>
                        </Typography>
                    </div>

                    <div className="flex items-center justify-center gap-x-5 mt-5 mb-4">
                        <Button
                            text="Book Appointment"
                            onClick={() => {
                                const link =
                                    role === UserRoles.ADMIN ||
                                    subadmin?.data?.isAdmin
                                        ? {
                                              pathname:
                                                  '/portals/admin/appointment-type/create-appointment',
                                              query: {
                                                  student: studentUser,
                                              },
                                          }
                                        : role === UserRoles.SUBADMIN
                                        ? {
                                              pathname:
                                                  '/portals/sub-admin/tasks/appointments/create-appointment',
                                              query: {
                                                  student: studentUser,
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
