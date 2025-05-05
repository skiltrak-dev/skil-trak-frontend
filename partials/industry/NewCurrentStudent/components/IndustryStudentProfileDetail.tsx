import {
    Card,
    NoData,
    Typography,
    ActionButton,
    LoadingAnimation,
    ShowErrorNotifications,
} from '@components'
import { useNotification } from '@hooks'
import {
    Avatar,
    RtoDetail,
    UpdatedStudentExpiryTime,
} from '@partials/common/StudentProfileDetail/ContextBarComponents'
import { useWorkplaceActionsMutation } from '@queries'
import { UserStatus } from '@types'
import {
    WorkplaceCurrentStatus,
    getStudentWorkplaceAppliedIndustry,
} from '@utils'
import {
    EmergencyContact,
    StudentDetail,
    StudentFeedBack,
    StudentRelatedInfo,
    StudentReport,
    StudentStatus,
} from '../ContextBarComponents'

export const IndustryStudentProfileDetail = ({ data }: { data: any }) => {
    const profile = data?.data
    const { notification } = useNotification()

    const industry = getStudentWorkplaceAppliedIndustry(profile?.industries)

    const [workplaceActions, workplaceActionsResult] =
        useWorkplaceActionsMutation()

    return (
        <Card noPadding>
            <ShowErrorNotifications result={workplaceActionsResult} />
            {data.isError && <NoData text={'Someting Went wrong....'} />}
            {data?.isLoading || data.isFetching ? (
                <LoadingAnimation />
            ) : (
                <div className="flex gap-x-5 w-full justify-between items-center px-4">
                    <div className="flex flex-col gap-y-2 justify-center items-center">
                        <div className="">
                            <Avatar
                                avatar={profile?.student?.user?.avatar}
                                name={profile?.student?.user?.name}
                            />
                        </div>
                        <div className="text-center">
                            <Typography semibold>
                                <span className="text-[15px]">
                                    {profile?.student?.user?.name}
                                </span>
                            </Typography>
                            {profile?.industries?.[0]
                                ?.awaitingAgreementSigned && (
                                <Typography variant="xs" color="text-[#6B7280]">
                                    {profile?.student?.user?.email}
                                </Typography>
                            )}
                        </div>
                        <div className="w-full">
                            <UpdatedStudentExpiryTime
                                studentId={profile?.student?.user?.id}
                                date={profile?.student?.expiryDate}
                                oldExpiry={profile?.student?.oldExpiry}
                            />
                        </div>
                    </div>
                    <div className="h-64 w-[1px] bg-gray-300"></div>
                    <StudentDetail profile={profile} />
                    <div className="h-64 w-[1px] bg-gray-300"></div>

                    <div className="flex flex-col gap-y-4">
                        <StudentRelatedInfo profile={profile} />
                        <EmergencyContact profile={profile} />
                    </div>
                    <div className="h-64 w-[1px] bg-gray-300"></div>

                    <RtoDetail rto={profile?.student?.rto} />
                    <div className="h-64 w-[1px] bg-gray-300"></div>

                    <div>
                        {(industry?.awaitingAgreementSigned ||
                            industry?.AgreementSigned) && (
                            <div className="py-3">
                                <StudentStatus
                                    industry={industry}
                                    student={profile?.student}
                                    currentStatus={profile?.currentStatus}
                                />
                            </div>
                        )}

                        {(industry?.awaitingAgreementSigned ||
                            industry?.AgreementSigned) && (
                            <div className="py-5 flex flex-col items-center gap-y-2 border-t border-secondary-dark">
                                <StudentFeedBack workplace={profile} />
                                <StudentReport workplace={profile} />
                            </div>
                        )}
                        {[
                            WorkplaceCurrentStatus.AppointmentBooked,
                            WorkplaceCurrentStatus.AwaitingWorkplaceResponse,
                        ]?.includes(profile?.currentStatus) ? (
                            <div className="py-2 flex items-center gap-x-2">
                                <ActionButton
                                    variant={'success'}
                                    onClick={() => {
                                        workplaceActions({
                                            id: Number(industry?.id),
                                            status: UserStatus.Approved,
                                        }).then((res: any) => {
                                            if (res?.data) {
                                                notification.success({
                                                    title: 'Workplace Approved',
                                                    description:
                                                        'Workplace Approved Successfully',
                                                })
                                            }
                                        })
                                    }}
                                    loading={workplaceActionsResult?.isLoading}
                                    disabled={workplaceActionsResult?.isLoading}
                                >
                                    Approve
                                </ActionButton>
                                <ActionButton
                                    variant={'error'}
                                    onClick={() => {
                                        workplaceActions({
                                            id: Number(industry?.id),
                                            status: UserStatus.Rejected,
                                        }).then((res: any) => {
                                            if (res?.data) {
                                                notification.success({
                                                    title: 'Workplace Rejected',
                                                    description:
                                                        'Workplace Rejected Successfully',
                                                })
                                            }
                                        })
                                    }}
                                    loading={workplaceActionsResult?.isLoading}
                                    disabled={workplaceActionsResult?.isLoading}
                                >
                                    Reject
                                </ActionButton>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </Card>
    )
}
