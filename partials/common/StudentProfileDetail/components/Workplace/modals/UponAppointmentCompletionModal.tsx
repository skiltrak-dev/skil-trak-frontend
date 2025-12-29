import {
    GlobalModal, TruncatedTextWithTooltip,
    Typography
} from '@components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { SelectAppointmentStatus } from '@partials/common/ProfileAppointments/components'
import { CommonApi } from '@queries'
import { appointmentWithUser } from '@types'
import { getUserCredentials } from '@utils'
import moment from 'moment'
import { ReactNode, useState } from 'react'
import { RxCalendar } from 'react-icons/rx'

export const UponAppointmentCompletionModal = ({
    appointment,
    onClose,
}: any) => {
    const [modal, setModal] = useState<ReactNode | null>(null)

    const { notification } = useNotification()

    const [updateStatus, updateStatusResult] =
        CommonApi.Appointments.updateSuccessFullStatus()

    const id = getUserCredentials()?.id
    const appointmentWith =
        appointment?.appointmentBy?.id === id
            ? 'appointmentFor'
            : 'appointmentBy'

    const appointmentUser: appointmentWithUser = appointment[appointmentWith]

    const appointmentWithUser = appointmentUser
        ? appointmentUser[
              appointmentUser?.role === UserRoles.SUBADMIN
                  ? ('coordinator' as keyof typeof appointmentUser)
                  : (appointmentUser?.role as keyof typeof appointmentUser)
          ]
        : {}

    const appointmentWithUserProfile = appointmentUser
        ? appointmentUser?.role === UserRoles.SUBADMIN
            ? appointmentWithUser?.[0]
            : appointmentWithUser
        : appointment?.coordinator

    // const onAppointmentClicked = () => {
    //     setModal(
    //         <AppointmentViewModal
    //             id={appointment?.id}
    //             onCancel={() => setModal(null)}
    //             upcomming
    //         />
    //     )
    // }

    const onSubmit = async (values: { note: string; status: boolean }) => {
        if (!values?.note) {
            notification.warning({
                title: 'Note Required!',
                description: 'Please add a note,',
            })
            return
        }
        const res: any = await updateStatus({
            id: appointment?.id,
            ...values,
        })

        if (res?.data) {
            notification.success({
                title: 'Appointment Status Changed',
                description: 'Appointment Status Changed Successfully',
            })
            onClose()
        }
    }
    return (
        <GlobalModal>
            <div
                className={`flex flex-col gap-y-3 rounded-lg px-1.5 pt-3 pb-2`}
            >
                <div className="w-full bg-primaryNew py-2 rounded">
                    <Typography variant="title" center color="text-white">
                        Appointment Status
                    </Typography>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-x-3.5">
                            <div>
                                <Typography
                                    variant="xxs"
                                    normal
                                    capitalize
                                    // color={barTextClasses}
                                >
                                    {appointment?.appointmentFor?.role}
                                </Typography>
                                <Typography
                                    // variant={short ? 'label' : 'body'}
                                    normal
                                    // color={barTextClasses}
                                    color="text-black"
                                >
                                    {appointment?.appointmentFor?.name ?? '---'}
                                </Typography>
                            </div>
                            <Typography
                                variant="badge"
                                normal
                                // color={barTextClasses}
                            >
                                &
                            </Typography>
                            <div>
                                <Typography
                                    variant="xxs"
                                    normal
                                    capitalize
                                    // color={barTextClasses}
                                >
                                    {appointment?.appointmentBy?.role ?? '---'}
                                </Typography>
                                <Typography
                                    normal
                                    // color={barTextClasses}
                                    // variant={short ? 'label' : 'body'}
                                >
                                    <TruncatedTextWithTooltip
                                        text={
                                            appointment?.[
                                                appointment?.appointmentBy
                                                    ? 'appointmentBy'
                                                    : 'coordinator'
                                            ]?.name
                                        }
                                        // textColor={
                                        //     type ===
                                        //     AppointmentTypeEnum.Upcoming
                                        //         ? 'var(--theme-primaryNew-dark)'
                                        //         : 'white'
                                        // }
                                        maxLength={20}
                                    />
                                </Typography>
                            </div>
                        </div>
                        <div
                            className={`w-full flex items-center gap-x-2.5
                            
                            py-1 px-2.5 rounded`}
                        >
                            <RxCalendar className={``} />
                            <Typography variant="small">
                                {moment(new Date(appointment?.date)).format(
                                    'dddd, MMMM DD YYYY'
                                )}{' '}
                                at{' '}
                                {moment(appointment?.startTime, 'hh:mm').format(
                                    'hh:mm a'
                                )}
                            </Typography>
                        </div>
                    </div>

                    <div>
                        <div
                            className={`flex flex-col items-center justify-center gap-y-2.5`}
                        >
                            {/* <Image
                                src={
                                    type === AppointmentTypeEnum.Past ||
                                    type === AppointmentTypeEnum.Cancelled
                                        ? '/images/appointments/lightVideoConference.svg'
                                        : '/images/appointments/darkVideoConference.svg'
                                }
                                alt={'Upcoming Appointments'}
                                width={40}
                                height={40}
                            /> */}
                            <Typography
                                variant="badge"
                                // color={barTextClasses}
                                normal
                                capitalize
                                center
                            >
                                {appointment?.type?.title}
                            </Typography>
                        </div>
                        {/* <div
                            // onClick={() => {
                            //     onAppointmentClicked()
                            // }}
                            className="mt-2"
                        >
                            <Typography
                                underline
                                variant="xs"
                                bold
                                color="text-[#F67F1E]"
                                cursorPointer
                                center
                            >
                                VIEW DETAILS
                            </Typography>
                        </div> */}
                    </div>
                </div>

                <SelectAppointmentStatus
                    onSubmit={onSubmit}
                    result={updateStatusResult}
                />
            </div>
        </GlobalModal>
    )
}
