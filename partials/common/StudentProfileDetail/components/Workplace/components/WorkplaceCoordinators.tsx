import { Select, ShowErrorNotifications, Typography } from '@components'
import { useNotification } from '@hooks'
import { AdminApi, useAssignToSubAdminMutation } from '@queries'

export const WorkplaceCoordinators = ({
    workplace,
    appliedIndustryId,
}: {
    workplace: any
    appliedIndustryId: number
}) => {
    const subadmins = AdminApi.Workplace.subadminForAssignWorkplace()
    const [assignToMe, assignToMeResult] = useAssignToSubAdminMutation()

    const { notification } = useNotification()

    const subAdminOptions = subadmins?.data?.map((subAdmin: any) => ({
        label: subAdmin?.user?.name,
        value: subAdmin?.user?.id,
    }))

    return (
        <div className="h-full">
            <ShowErrorNotifications result={assignToMeResult} />
            <Typography variant="small" capitalize semibold>
                coordinator
            </Typography>
            <div className="h-[200px] border border-[#6B7280] rounded-md p-2.5 mt-2.5 flex flex-col justify-center items-center gap-y-1.5">
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
                                assignToMeResult.isLoading
                            }
                            onChange={(e: any) => {
                                assignToMe({
                                    industry: appliedIndustryId,
                                    id: workplace?.id,
                                    subAdmin: Number(e?.value),
                                }).then((res: any) => {
                                    if (res?.data) {
                                        notification.success({
                                            title: 'Coordiantor Changed',
                                            description:
                                                'Coordinator Changed Successfully',
                                        })
                                    }
                                })
                            }}
                            menuPlacement={'top'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="grid grid-cols-10 gap-x-3">
            <div className="col-span-3">
                <Typography variant="small" capitalize semibold>
                    coordinator
                </Typography>
            </div>
            <div className="col-span-7">
                <Typography variant="small" capitalize semibold>
                    coordinator
                </Typography>
            </div>

            {/*  */}
            <div className="col-span-3 border border-[#6B7280] rounded-md p-2.5 mt-2.5 flex flex-col gap-y-1.5">
                <div className="bg-primaryNew p-3 rounded-lg">
                    <Typography variant="xxs" normal color="text-white">
                        Assigned Coordinator
                    </Typography>
                    <Typography variant="small" semibold color="text-white">
                        {workplace?.assignedTo?.user?.name}
                    </Typography>
                </div>

                {/*  */}
                <div className="bg-primaryNew px-3 pt-3 rounded-lg flex flex-col gap-y-2">
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
                                assignToMeResult.isLoading
                            }
                            onChange={(e: any) => {
                                assignToMe({
                                    industry: appliedIndustryId,
                                    id: workplace?.id,
                                    subAdmin: Number(e?.value),
                                })
                            }}
                        />
                    </div>
                </div>
            </div>

            {/*  */}
            <div className="col-span-7 border mt-2.5 border-[#6B7280] rounded-md p-2.5">
                {/* <IndustryDetail /> */}
            </div>
        </div>
    )
}
