import { Typography } from '@components'
import { UserRoles } from '@constants'
import { WorkplaceAvailableSlots } from '@partials/student/workplace/components/WorkplaceApproval/WorkplaceAvailableSlots'
import { WorkplaceInfo } from '@partials/student/workplace/components/WorkplaceApproval/WorkplaceInfo'
import { WorkplaceMapView } from '@partials/student/workplace/components/WorkplaceApproval/WorkplaceMapView'
import { getUserCredentials } from '@utils'
import React, { Suspense, useEffect, useState } from 'react'
import { SubAdminApi } from '@queries'
import moment from 'moment'
import { AvailableMeetingDates } from '@partials/student'

export const WorkplaceApprovalReq = ({
    wpReqApproval,
}: {
    wpReqApproval: any
}) => {
    const [mount, setMount] = useState<boolean>(false)

    const role = getUserCredentials()?.role

    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
        // refetchOnFocus: true,
    })

    useEffect(() => {
        if (!mount) {
            setMount(true)
        }
    }, [])

    return (
        <div className="p-3 h-full">
            <div>
                <Typography variant="label" semibold block>
                    Workplace Approval Request has been sent to the student.
                    Once the student approves, you will be able to update the
                    request status
                </Typography>
            </div>
            <div className="flex flex-col gap-y-3 mt-1">
                <div
                    className={`grid gap-y-2 grid-cols-1 ${
                        role === UserRoles?.ADMIN || subadmin?.data?.isAdmin
                            ? 'xl:grid-cols-4'
                            : ''
                    } gap-x-3`}
                >
                    <div
                        className={`w-full  ${
                            role === UserRoles?.ADMIN || subadmin?.data?.isAdmin
                                ? 'xl:col-span-3'
                                : ''
                        } `}
                    >
                        <Typography variant="label" medium center block>
                            Workplace on map
                        </Typography>
                        <div className="rounded-xl w-full overflow-hidden mt-2">
                            {mount ? (
                                <WorkplaceMapView
                                    industryLocation={wpReqApproval?.industry?.location?.split(
                                        ','
                                    )}
                                    studentLocation={wpReqApproval?.student?.location?.split(
                                        ','
                                    )}
                                    workplaceName={
                                        wpReqApproval?.industry?.user?.name
                                    }
                                    showMap
                                />
                            ) : null}
                        </div>
                    </div>
                    <div>
                        <WorkplaceInfo
                            {...(role !== UserRoles?.ADMIN &&
                            !subadmin?.data?.isAdmin
                                ? { direction: 'flex-row justify-between px-4' }
                                : {})}
                            // direction="flex-row justify-between px-4"
                            industry={wpReqApproval?.industry}
                        />
                    </div>
                    {wpReqApproval?.dates &&
                    Object.keys(wpReqApproval?.dates)?.length > 0 &&
                    Object.values(wpReqApproval?.dates)?.some(
                        (date) => date
                    ) ? (
                        <AvailableMeetingDates dates={wpReqApproval?.dates} />
                    ) : null}
                </div>

                {/*  */}
                <div className="">
                    <WorkplaceAvailableSlots
                        workingHours={wpReqApproval?.industry?.workingHours}
                    />
                </div>
            </div>
        </div>
    )
}
