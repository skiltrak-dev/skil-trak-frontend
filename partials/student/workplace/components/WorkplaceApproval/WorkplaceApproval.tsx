import { Typography } from '@components'
import { WorkplaceApprovalActions } from './WorkplaceApprovalActions'
import { WorkplaceAvailableSlots } from './WorkplaceAvailableSlots'
import { WorkplaceDetail } from './WorkplaceDetail'
import { WorkplaceInfo } from './WorkplaceInfo'
import { WorkplaceMapView } from './WorkplaceMapView'
import { AvailableMeetingDates } from './AvailableMeetingDates'

export const WorkplaceApproval = ({
    onCancel,
    wpApprovalData,
}: {
    onCancel?: () => void
    wpApprovalData: any
}) => {
    return (
        <div className="px-4 py-2 w-full max-w-[inherit] h-full bg-white rounded-[10px]">
            <div className="grid grid-cols-7 gap-x-10">
                <div className="col-span-3 ">
                    <WorkplaceDetail />
                </div>

                <div className="col-span-4 w-full">
                    <Typography variant="label" medium center block>
                        Workplace on map
                    </Typography>
                    <div className="rounded-xl w-full overflow-hidden mt-2">
                        <WorkplaceMapView
                            industryLocation={wpApprovalData?.industry?.location?.split(
                                ','
                            )}
                            studentLocation={wpApprovalData?.student?.location?.split(
                                ','
                            )}
                            showMap
                        />
                    </div>
                </div>
            </div>

            {/*  */}
            <div className="w-full border border-[#D5D5D5] rounded-md p-3 grid grid-cols-3 gap-x-2.5 mt-3">
                <WorkplaceInfo industry={wpApprovalData?.industry} />

                <div className="col-span-2">
                    <WorkplaceAvailableSlots
                        workingHours={wpApprovalData?.industry?.workingHours}
                    />
                </div>
            </div>

            <AvailableMeetingDates dates={wpApprovalData?.dates} />

            {/*  */}
            <WorkplaceApprovalActions
                onCancel={() => {
                    if (onCancel) {
                        onCancel()
                    }
                }}
                wpApprovalId={wpApprovalData?.id}
            />
        </div>
    )
}
