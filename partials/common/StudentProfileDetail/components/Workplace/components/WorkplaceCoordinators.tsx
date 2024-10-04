import { Select, ShowErrorNotifications, Typography } from '@components'
import { AdminApi, useAssignToSubAdminMutation } from '@queries'
import { ReactElement, useState } from 'react'
import { CoordinatorChangeModal } from '../modals'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'

export const WorkplaceCoordinators = ({
    workplace,
    appliedIndustryId,
}: {
    workplace: any
    appliedIndustryId: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const role = getUserCredentials()?.role

    const subadmins = AdminApi.Workplace.subadminForAssignWorkplace()
    const [assignToMe, assignToMeResult] = useAssignToSubAdminMutation()

    const subAdminOptions = subadmins?.data?.map((subAdmin: any) => ({
        label: subAdmin?.user?.name,
        value: subAdmin?.user?.id,
    }))

    const onCancel = () => setModal(null)

    const onChangeCoordinator = (subadminId: number) => {
        setModal(
            <CoordinatorChangeModal
                onCancel={onCancel}
                appliedIndustryId={appliedIndustryId}
                subadminId={subadminId}
                workplaceId={workplace?.id}
            />
        )
    }

    return (
        <div className="h-full">
            {modal}
            <ShowErrorNotifications result={assignToMeResult} />
            <Typography variant="small" capitalize semibold>
                coordinator
            </Typography>
            <div className="h-48 border border-[#6B7280] rounded-md p-2.5 mt-2.5 flex flex-col items-center gap-y-1.5">
                <div className="bg-primaryNew p-3 rounded-lg w-full">
                    <Typography variant="xxs" normal color="text-white">
                        Assigned Coordinator
                    </Typography>
                    <Typography variant="small" semibold color="text-white">
                        {workplace?.assignedTo?.user?.name}
                    </Typography>
                </div>

                {/*  */}
                <div className="bg-primaryNew px-3 pt-3 rounded-lg flex flex-col gap-y-2 w-full">
                    <Typography variant="xxs" normal color="text-white">
                        Change Coordinator
                    </Typography>
                    <div className="w-full">
                        <Select
                            name={'subAdmin'}
                            placeholder={'Select Sub Admin'}
                            options={subAdminOptions}
                            loading={
                                subadmins?.isLoading ||
                                assignToMeResult.isLoading
                            }
                            disabled={
                                subadmins?.isLoading ||
                                assignToMeResult.isLoading ||
                                workplace?.cancelledRequests?.length > 0 ||
                                role === UserRoles.RTO
                            }
                            onChange={(e: any) => {
                                onChangeCoordinator(e?.value)
                            }}
                            menuPlacement={'top'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
