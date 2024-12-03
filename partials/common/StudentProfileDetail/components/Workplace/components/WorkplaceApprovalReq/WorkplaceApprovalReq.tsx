import { AuthorizedUserComponent, Typography } from '@components'
import { UserRoles } from '@constants'
import { AvailableMeetingDates, WorkplaceMapBoxView } from '@partials/student'
import { WorkplaceAvailableSlots } from '@partials/student/workplace/components/WorkplaceApproval/WorkplaceAvailableSlots'
import { WorkplaceInfo } from '@partials/student/workplace/components/WorkplaceApproval/WorkplaceInfo'
import { WorkplaceMapView } from '@partials/student/workplace/components/WorkplaceApproval/WorkplaceMapView'
import { SubAdminApi } from '@queries'
import { SubAdmin } from '@types'
import { getUserCredentials } from '@utils'
import { useEffect, useState } from 'react'
import { AssignedCoordinator } from './AssignedCoordinator'

export const WorkplaceApprovalReq = ({
    wpReqApproval,
    coordinator,
}: {
    coordinator: SubAdmin
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
        <div className="h-full">
            <div className="grid grid-cols-3 gap-x-6 items-center border-b border-[#F7910F] px-4 py-2">
                <Typography variant="label" semibold block capitalize>
                    eligible workplace option for placement
                </Typography>
                <div className="col-span-2">
                    <Typography variant="small" medium color="text-[#24556D]">
                        Workplace Approval Request has been sent to the student
                        once the student approves, you will be able to update
                        the request status.{' '}
                    </Typography>
                </div>
            </div>

            <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                <div className="px-4 py-2.5 grid grid-cols-7 gap-x-4 gap-y-3">
                    <div className="col-span-5">
                        <div>
                            <Typography variant="label" medium block>
                                Workplace on map
                            </Typography>
                            <div className="rounded-xl w-full overflow-hidden mt-2">
                                {mount ? (
                                    // <WorkplaceMapView
                                    //     industryLocation={wpReqApproval?.industry?.location?.split(
                                    //         ','
                                    //     )}
                                    //     studentLocation={wpReqApproval?.student?.location?.split(
                                    //         ','
                                    //     )}
                                    //     workplaceName={
                                    //         wpReqApproval?.industry?.user?.name
                                    //     }
                                    //     showMap
                                    // />
                                    <WorkplaceMapBoxView
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

                        {/*  */}
                        <div className="h-52">
                            <WorkplaceAvailableSlots
                                workingHours={
                                    wpReqApproval?.industry?.workingHours
                                }
                            />
                        </div>
                    </div>

                    {/*  */}
                    <div className="col-span-2 flex flex-col gap-y-3 h-full">
                        <div className="flex flex-col gap-y-1.5">
                            <AssignedCoordinator assignedTo={coordinator} />
                        </div>

                        {/*  */}
                        <div className="h-full">
                            <WorkplaceInfo
                                {...(role !== UserRoles?.ADMIN &&
                                !subadmin?.data?.isAdmin
                                    ? {
                                          direction:
                                              'flex-row justify-between px-4',
                                      }
                                    : {})}
                                // direction="flex-row justify-between px-4"
                                industry={wpReqApproval?.industry}
                            />
                        </div>

                        {/*  */}
                        <AvailableMeetingDates dates={wpReqApproval?.dates} />
                    </div>
                </div>
            </AuthorizedUserComponent>
            <AuthorizedUserComponent excludeRoles={[UserRoles.ADMIN]}>
                <div className="px-4 py-2.5 flex flex-col gap-x-4 gap-y-3">
                    <div className="grid grid-cols-2 gap-x-4 h-full">
                        <div className="flex flex-col">
                            <div className="flex-grow">
                                <div className="h-full flex flex-col gap-y-3">
                                    <div className="flex flex-col gap-y-1.5">
                                        <AssignedCoordinator
                                            assignedTo={coordinator}
                                        />
                                    </div>

                                    {/*  */}
                                    <div className="h-full">
                                        <WorkplaceInfo
                                            industry={wpReqApproval?.industry}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        <div className="flex flex-col">
                            <div className="flex-grow ">
                                <div className="h-full">
                                    <AvailableMeetingDates
                                        dates={wpReqApproval?.dates}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <Typography variant="label" medium block>
                                Workplace on map
                            </Typography>
                            <div className="rounded-xl w-full overflow-hidden mt-2">
                                {mount ? (
                                    // <WorkplaceMapView
                                    //     industryLocation={wpReqApproval?.industry?.location?.split(
                                    //         ','
                                    //     )}
                                    //     studentLocation={wpReqApproval?.student?.location?.split(
                                    //         ','
                                    //     )}
                                    //     workplaceName={
                                    //         wpReqApproval?.industry?.user?.name
                                    //     }
                                    //     showMap
                                    // />
                                    <WorkplaceMapBoxView
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

                        {/*  */}
                        <div className="h-52">
                            <WorkplaceAvailableSlots
                                workingHours={
                                    wpReqApproval?.industry?.workingHours
                                }
                            />
                        </div>
                    </div>

                    {/*  */}
                </div>
            </AuthorizedUserComponent>
        </div>
    )
}
