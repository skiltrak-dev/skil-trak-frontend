import { Typography } from '@components'
import { AvailableMeetingDates } from './AvailableMeetingDates'
import { StudentWorkplaceInfo } from './StudentWorkplaceInfo'
import { WorkplaceApprovalActions } from './WorkplaceApprovalActions'
import { WorkplaceAvailableSlots } from './WorkplaceAvailableSlots'
import { WorkplaceDetail } from './WorkplaceDetail'
import { WorkplaceMapBoxView } from './WorkplaceMapBoxView'

export const WorkplaceApproval = ({
    onCancel,
    wpApprovalData,
}: {
    wpApprovalData: any
    onCancel?: () => void
}) => {
    return (
        <div className="px-4 py-2 w-full max-w-[inherit] h-full bg-white rounded-[10px]">
            <div className="grid grid-cols-5 gap-x-5">
                <div className="col-span-2">
                    <WorkplaceDetail />
                </div>

                <div className="">
                    <AvailableMeetingDates dates={wpApprovalData?.dates} />
                </div>

                <div className="col-span-2 w-full">
                    <Typography variant="label" medium center block>
                        Workplace on map
                    </Typography>
                    <div className="rounded-xl w-full overflow-hidden mt-2">
                        {/* <WorkplaceMapView
                            industryLocation={wpApprovalData?.industry?.location?.split(
                                ','
                            )}
                            studentLocation={wpApprovalData?.student?.location?.split(
                                ','
                            )}
                            workplaceName={wpApprovalData?.industry?.user?.name}
                            showMap
                        /> */}
                        <WorkplaceMapBoxView
                            industryLocation={
                                !wpApprovalData?.location
                                    ? wpApprovalData?.industry?.location?.split(
                                          ','
                                      )
                                    : wpApprovalData?.location.location?.split(
                                          ','
                                      )
                            }
                            studentLocation={wpApprovalData?.student?.location?.split(
                                ','
                            )}
                            workplaceName={wpApprovalData?.industry}
                            showMap
                        />
                    </div>
                </div>
            </div>

            {/*  */}
            <div className="w-full border border-[#D5D5D5] rounded-md p-3 grid grid-cols-5 gap-x-2.5 mt-3">
                <div className="col-span-2">
                    <StudentWorkplaceInfo industry={wpApprovalData} />
                </div>

                <div className="col-span-3">
                    <WorkplaceAvailableSlots
                        workingHours={wpApprovalData?.industry?.workingHours}
                    />
                </div>
            </div>

            {/*  */}
            <WorkplaceApprovalActions
                onCancel={() => {
                    if (onCancel) {
                        onCancel()
                    }
                }}
                declaration={wpApprovalData?.declaration}
                wpApprovalId={wpApprovalData?.id}
                dates={wpApprovalData?.dates}
                subAdminUserId={wpApprovalData?.student?.subadmin?.user?.id}
            />
        </div>
    )
}
