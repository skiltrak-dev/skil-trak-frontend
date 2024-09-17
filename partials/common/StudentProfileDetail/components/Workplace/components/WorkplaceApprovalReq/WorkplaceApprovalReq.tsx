import { Typography } from '@components'
import { WorkplaceAvailableSlots } from '@partials/student/workplace/components/WorkplaceApproval/WorkplaceAvailableSlots'
import { WorkplaceInfo } from '@partials/student/workplace/components/WorkplaceApproval/WorkplaceInfo'
import { WorkplaceMapView } from '@partials/student/workplace/components/WorkplaceApproval/WorkplaceMapView'
import React from 'react'

export const WorkplaceApprovalReq = ({
    wpReqApproval,
}: {
    wpReqApproval: any
}) => {
    return (
        <div className="p-3 h-full">
            <div>
                <Typography variant="label" semibold block>
                    Workplace Approval Request has been sent to the student.
                    Once the student approves, you will be able to update the
                    request status
                </Typography>
            </div>
            <div className="flex flex-col gap-y-3 mt-2">
                <WorkplaceInfo
                    direction="flex-row justify-between px-4"
                    industry={wpReqApproval?.industry}
                />
                <div className="">
                    <WorkplaceAvailableSlots
                        workingHours={wpReqApproval?.industry?.workingHours}
                    />
                </div>
                <div className=" w-full">
                    <Typography variant="label" medium center block>
                        Workplace on map
                    </Typography>
                    <div className="rounded-xl w-full overflow-hidden mt-2">
                        <WorkplaceMapView
                            industryLocation={wpReqApproval?.industry?.location?.split(
                                ','
                            )}
                            studentLocation={wpReqApproval?.student?.location?.split(
                                ','
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
