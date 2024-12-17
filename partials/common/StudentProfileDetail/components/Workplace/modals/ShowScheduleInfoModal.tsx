import { GlobalModal, Typography } from '@components'
import { MdCancel } from 'react-icons/md'
import { PiWarningOctagonThin } from 'react-icons/pi'

export enum AddScheduleStatus {
    StartPlacement = 'START PLACEMENT',
    AgreementSigned = 'AGREEMENT SIGNED',
}

export const ShowScheduleInfoModal = ({
    status = AddScheduleStatus.StartPlacement,
    onCancel,
}: {
    status?: AddScheduleStatus
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="max-w-2xl p-5 relative flex flex-col gap-y-2 py-10">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="flex flex-col gap-y-2 justify-between items-center">
                    <PiWarningOctagonThin className="text-primary text-8xl" />
                    <div className="mx-auto">
                        <Typography center semibold>
                            Add Schedule before changing status to{' '}
                            <span className="text-success">"{status}"</span>
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
            </div>
        </GlobalModal>
    )
}
