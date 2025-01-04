import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useUpdateWorkplaceStatusMutation } from '@queries'
import { MdCancel, MdOutlineError } from 'react-icons/md'

export const MaxReqLimitReachModal = ({
    onCancel,
    industryName,
    industryCapacity,
}: {
    industryCapacity: number
    industryName: number
    onCancel: () => void
}) => {
    const [updateStatus, updateStatusResult] =
        useUpdateWorkplaceStatusMutation()
    return (
        <GlobalModal>
            <ShowErrorNotifications result={updateStatusResult} />
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
                                Maximum Requests Limit Reached
                            </Typography>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Typography center>
                            <span className="text-[15px] leading-4 text-center">
                                <span className="font-bold">
                                    {industryName}{' '}
                                </span>{' '}
                                currently student capacity for workplace
                                requests has been reached in the following
                                statuses:
                                <span className="font-bold">
                                    Waiting, Agreement Pending, or Appointment
                                </span>{' '}
                                Status. You cannot forward another request to
                                the industry for any new students at this time.
                            </span>
                        </Typography>
                    </div>

                    <div className="flex items-center justify-center gap-x-5 mt-5 mb-4">
                        <Button
                            text="Find Another Industry"
                            onClick={() => {
                                onCancel()
                            }}
                        />
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
