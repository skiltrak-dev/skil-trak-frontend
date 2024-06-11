import { SubAdmin } from '@types'
import {
    ProfileDetail,
    SubadminCalendarViewDetail,
    SubadminProfileCounts,
    SubadminProgress,
    SubadminReports,
} from './components'
import { AdminApi } from '@queries'
import {
    MailsCommunication,
    Notes,
} from '@partials/common/StudentProfileDetail/components'
import { SubadminHistory } from './components/SubadminHistory'

export const SubadminProfileDetail = ({ subadmin }: { subadmin: SubAdmin }) => {
    const subAdminProfileCount = AdminApi.SubAdmins.useProfileCount(
        Number(subadmin?.user?.id),
        {
            skip: !subadmin,
        }
    )
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
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}
            <SubadminProgress subAdminProfileCount={subAdminProfileCount} />

            {/*  */}
            <div className=" grid grid-cols-3 gap-x-[18px]">
                <div className="col-span-2">
                    <div className="w-full">
                        <SubadminCalendarViewDetail />
                    </div>
                </div>
                <div className="h-full">
                    <Notes userId={subadmin?.user?.id} />
                </div>
            </div>

            {/*  */}
            <div>
                <SubadminHistory subadminUserId={subadmin?.user?.id} />
            </div>

            <div>
                <SubadminReports subadminUserId={subadmin?.user?.id} />
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
