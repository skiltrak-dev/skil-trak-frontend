import { AuthorizedUserComponent, Button, Card, Typography } from '@components'
import { UserRoles } from '@constants'
import { AvailableMeetingDates, WorkplaceMapBoxView } from '@partials/student'
import { WorkplaceAvailableSlots } from '@partials/student/workplace/components/WorkplaceApproval/WorkplaceAvailableSlots'
import { WorkplaceInfo } from '@partials/student/workplace/components/WorkplaceApproval/WorkplaceInfo'
import { SubAdminApi } from '@queries'
import { SubAdmin } from '@types'
import { getUserCredentials, is72HoursOlder } from '@utils'
import { ReactElement, useEffect, useState } from 'react'
import { AssignedCoordinator } from './AssignedCoordinator'
import { useRouter } from 'next/router'
import {
    SkipWorkplaceModal,
    UpdateIndustryEligibilityModal,
} from '../../modals'

export const WorkplaceApprovalReq = ({
    wpReqApproval,
    coordinator,
}: {
    coordinator: SubAdmin
    wpReqApproval: any
}) => {
    const [mount, setMount] = useState<boolean>(false)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const role = getUserCredentials()?.role

    const router = useRouter()

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

    const onCancel = () => setModal(null)

    const onUpdateIndustryEligibility = () => {
        setModal(
            <UpdateIndustryEligibilityModal
                onCancel={onCancel}
                wpReqApproval={wpReqApproval}
            />
        )
    }

    const onWorkplaceSkippedClicked = () => {
        setModal(
            <SkipWorkplaceModal
                onCancel={onCancel}
                wpReqApproval={wpReqApproval}
            />
        )
    }

    return (
        <div className="h-full">
            {modal}
            {wpReqApproval?.isEligible ? (
                <div className="grid grid-cols-3 gap-x-6 items-center border-b border-[#F7910F] px-4 py-2">
                    <Typography variant="label" semibold block capitalize>
                        eligible workplace option for placement
                    </Typography>
                    <div className="col-span-2">
                        <Typography
                            variant="small"
                            medium
                            color="text-[#24556D]"
                        >
                            Workplace Approval Request has been sent to the
                            student once the student approves, you will be able
                            to update the request status.{' '}
                        </Typography>
                    </div>
                </div>
            ) : (
                <Card noPadding>
                    <div className="flex flex-col gap-y-2 items-center px-4 py-2 bg-primary-light">
                        <Typography variant="label" block medium center>
                            The workplace course file does not exist or the
                            course content has not yet been approved. Once
                            approved, you will be able to send the workplace to
                            the student for approval.
                        </Typography>
                        <div className="col-span-2 flex justify-end gap-x-3">
                            <Button
                                outline
                                text="Update Workplace"
                                variant="info"
                                disabled={role === UserRoles.RTO}
                                onClick={() => {
                                    role === UserRoles.ADMIN
                                        ? router.push(
                                              `/portals/admin/industry/${wpReqApproval?.industry?.id}`
                                          )
                                        : role === UserRoles.SUBADMIN
                                        ? router.push(
                                              `/portals/sub-admin/users/industries/${wpReqApproval?.industry?.id}?tab=students`
                                          )
                                        : ''
                                }}
                            />
                            <Button
                                variant="success"
                                text="Submit For Approval"
                                disabled={role === UserRoles.RTO}
                                onClick={onUpdateIndustryEligibility}
                            />
                            {is72HoursOlder(wpReqApproval?.createdAt) ||
                                (true && (
                                    <Button
                                        text="Skip"
                                        variant="primary"
                                        disabled={role === UserRoles.RTO}
                                        onClick={onWorkplaceSkippedClicked}
                                    />
                                ))}
                        </div>
                    </div>
                </Card>
            )}

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
                                        industryLocation={
                                            !wpReqApproval?.location
                                                ? wpReqApproval?.industry?.location?.split(
                                                      ','
                                                  )
                                                : wpReqApproval?.location?.location?.split(
                                                      ','
                                                  )
                                        }
                                        studentLocation={wpReqApproval?.student?.location?.split(
                                            ','
                                        )}
                                        workplaceName={wpReqApproval?.industry}
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
                                industry={wpReqApproval}
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
                                            industry={wpReqApproval}
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
                                        industryLocation={
                                            !wpReqApproval?.location
                                                ? wpReqApproval?.industry?.location?.split(
                                                      ','
                                                  )
                                                : wpReqApproval?.location?.location?.split(
                                                      ','
                                                  )
                                        }
                                        studentLocation={wpReqApproval?.student?.location?.split(
                                            ','
                                        )}
                                        workplaceName={wpReqApproval?.industry}
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
