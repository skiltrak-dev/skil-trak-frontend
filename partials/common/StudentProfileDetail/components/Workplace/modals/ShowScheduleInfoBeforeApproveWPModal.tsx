import { MdCancel } from 'react-icons/md'
import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { PiWarningOctagonThin } from 'react-icons/pi'
import { useUpdateWorkplaceStatusMutation } from '@queries'
import { UserStatus } from '@types'

export const ShowScheduleInfoBeforeApproveWPModal = ({
    onCancel,
    appliedIndustryId,
}: {
    appliedIndustryId: number
    onCancel: () => void
}) => {
    const [updateStatus, updateStatusResult] =
        useUpdateWorkplaceStatusMutation()
    return (
        <GlobalModal>
            <ShowErrorNotifications result={updateStatusResult} />
            <div className="max-w-2xl p-5 relative flex flex-col gap-y-2 py-10">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="flex flex-col gap-y-2 justify-between items-center">
                    <PiWarningOctagonThin className="text-primary text-8xl" />
                    <div className="mx-auto">
                        <Typography center semibold>
                            Add Schedule before approve Industry
                        </Typography>
                    </div>
                </div>
                <div>
                    <Typography center>
                        <span className="text-[15px] leading-4 text-center">
                            Before proceeding with the placement process, it is
                            essential to schedule and confirm the placement
                            timeline. Please ensure that the placement schedule
                            is added and finalized prior to initiating the
                            placement.
                        </span>
                    </Typography>
                </div>

                {/* <div className="flex items-center justify-center gap-x-5">
                    <Button
                        text="Not Yet"
                        loading={updateStatusResult.isLoading}
                        disabled={updateStatusResult.isLoading}
                        onClick={() => {
                            updateStatus({
                                id: Number(appliedIndustryId),
                                response: UserStatus.Approved,
                            }).then((res: any) => {
                                if (res?.data) {
                                    onCancel()
                                }
                            })
                        }}
                    />
                    <Button
                        text="OK"
                        onClick={() => {
                            onCancel()
                        }}
                    />
                </div> */}
            </div>
        </GlobalModal>
    )
}
