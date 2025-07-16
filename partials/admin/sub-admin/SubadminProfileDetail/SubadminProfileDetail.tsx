import { SubAdmin, UserStatus } from '@types'
import {
    ProfileDetail,
    SubadminCalendarViewDetail,
    SubadminProfileCounts,
    SubadminProgress,
    SubadminReports,
    SubadminTodoList,
} from './components'
import { AdminApi } from '@queries'
import { MailsCommunication } from '@partials/common/StudentProfileDetail/components'
import { SubadminHistory } from './components/SubadminHistory'
import { useEffect } from 'react'
import { useAlert } from '@hooks'
import { Notes } from '@partials/common'

export const SubadminProfileDetail = ({ subadmin }: { subadmin: SubAdmin }) => {
    const subAdminProfileCount = AdminApi.SubAdmins.useProfileCount(
        Number(subadmin?.user?.id),
        {
            skip: !subadmin,
        }
    )

    const { alert, setAlerts } = useAlert()

    useEffect(() => {
        const showAlert = () => {
            switch (subadmin?.user?.status) {
                case UserStatus.Pending:
                    alert.warning({
                        title: 'Subadmin is Pending',
                        description: 'Subadmin is Pending',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Archived:
                    alert.warning({
                        title: 'Subadmin is Archived',
                        description: 'Subadmin is Archived',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Rejected:
                    alert.error({
                        title: 'Subadmin is Rejected',
                        description: 'Subadmin is Rejected',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Blocked:
                    alert.error({
                        title: 'Subadmin is Blocked',
                        description: 'Subadmin is Blocked',
                        autoDismiss: false,
                    })
                    break

                default:
                    break
            }
        }
        showAlert()

        return () => {
            setAlerts([])
        }
    }, [])

    return (
        <div className="p-4 flex flex-col gap-y-6">
            <div className="grid grid-cols-3 gap-x-5">
                <div className="flex flex-col">
                    <div className="flex-grow">
                        <div className="h-full">
                            <ProfileDetail subadmin={subadmin} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col col-span-2 h-full">
                    <div className="flex-grow h-full">
                        <div className="h-full">
                            <SubadminProfileCounts
                                subAdminProfileCount={subAdminProfileCount}
                                subadminUserId={subadmin?.user?.id}
                                profileDetail={subadmin}
                                subadminId={subadmin?.id}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}
            <SubadminProgress subAdminProfileCount={subAdminProfileCount} />

            {/* <SubadminTodoList /> */}

            {/*  */}
            <div className=" grid grid-cols-3 gap-x-[18px] h-[580px]">
                <div className="col-span-2 h-full">
                    <div className="w-full">
                        <SubadminCalendarViewDetail
                            subadminUserId={subadmin?.user?.id}
                        />
                    </div>
                </div>
                <div className="h-full overflow-hidden">
                    <Notes userId={subadmin?.user?.id} />
                </div>
            </div>

            {/*  */}
            <div>
                <SubadminHistory subadminUserId={subadmin?.user?.id} />
            </div>

            <div>
                <SubadminReports
                    subadmin={subadmin}
                    subadminUserId={subadmin?.user?.id}
                />
            </div>

            {/*  */}
            <div className="h-[640px] px-2  grid grid-cols-2 gap-x-3">
                <div className={`!h-[99%] col-span-2`}>
                    <MailsCommunication user={subadmin?.user} />
                </div>
            </div>
        </div>
    )
}
