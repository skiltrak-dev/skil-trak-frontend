import {
    LoadingAnimation,
    Modal,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { ShiftCard } from '@partials/industry/AvailableShifts/components'
import { AddShiftForm } from '@partials/industry/AvailableShifts/form'
import { useAddShiftMutation, useGetShiftsQuery } from '@queries'

export const AddShiftModal = ({
    availability,
    onCancel,
}: {
    availability: any
    onCancel: any
}) => {
    const { notification } = useNotification()

    const shifts = useGetShiftsQuery(availability?.id, {
        skip: !availability?.id,
    })
    const [addShifts, addShiftModal] = useAddShiftMutation()
    const onSubmit = (values: any) => {
        addShifts({ workingHours: availability?.id, ...values }).then(
            (res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Free Shifts Added',
                        description: 'Free Shifts Added Successfully',
                    })
                    onCancel()
                }
            }
        )
    }
    return (
        <>
            <ShowErrorNotifications result={addShiftModal} />
            <Modal
                title={'Add Free Shift'}
                subtitle={'Free Shift Time'}
                onCancelClick={onCancel}
                showActions={false}
            >
                <div className="h-[67vh] overflow-auto custom-scrollbar">
                    <AddShiftForm onSubmit={onSubmit} result={addShiftModal} />

                    {/*  */}
                    <div className="mt-2">
                        {shifts.isError && (
                            <NoData
                                text={'There is some technical issue!'}
                                isError
                            />
                        )}
                        {shifts?.isLoading ? (
                            <LoadingAnimation size={70} />
                        ) : shifts?.data && shifts?.data?.length > 0 ? (
                            <div>
                                <div className="grid grid-cols-3 gap-x-1.5">
                                    <Typography variant={'muted'}>
                                        Opening Time
                                    </Typography>
                                    <Typography variant={'muted'}>
                                        Closing Time
                                    </Typography>
                                    <Typography variant={'muted'}>
                                        Student Capacity
                                    </Typography>
                                </div>
                                <div className="flex flex-col gap-y-1.5 mt-1.5">
                                    {shifts?.data?.map((shift: any) => (
                                        <ShiftCard shift={shift} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            !shifts.isError && (
                                <NoData text={'No Shifts were found'} />
                            )
                        )}
                    </div>
                </div>
            </Modal>
        </>
    )
}
