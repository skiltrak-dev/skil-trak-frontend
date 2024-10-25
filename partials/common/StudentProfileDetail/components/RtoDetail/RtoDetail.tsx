import { AuthorizedUserComponent, Card, Typography } from '@components'
import { ProfileCard } from '@partials/admin/sub-admin/SubadminProfileDetail/components/ProfileDetail/ProfileCard'
import { Rto } from '@types'
import { Avatar } from '../../ContextBarComponents'
import { UserRoles } from '@constants'
import { useRouter } from 'next/router'

export const RtoDetail = ({ rto }: { rto: Rto }) => {
    const router = useRouter()
    return (
        <Card shadowType="profile">
            <div className="grid grid-cols-3 gap-x-7">
                <div className="flex flex-col gap-y-3">
                    <Typography variant="label" semibold>
                        RTO
                    </Typography>
                    <div className="flex  gap-x-2.5 items-center">
                        <div className="">
                            <Avatar
                                avatar={rto?.user?.avatar}
                                name={rto?.user?.name}
                            />
                        </div>
                        <div className="">
                            <Typography semibold>
                                <span className="text-[15px]">
                                    {rto?.user?.name}
                                </span>
                            </Typography>
                            <Typography variant="xs" color="text-[#6B7280]">
                                {rto?.user?.email}
                            </Typography>
                        </div>
                    </div>
                </div>

                {/*  */}
                <div className="flex flex-col gap-y-2">
                    <ProfileCard
                        title="RTO Phone Number"
                        detail={rto?.phone || '---'}
                    />
                    <ProfileCard
                        title="Contact Person Number"
                        detail={rto?.contactPersons?.[0]?.phone || '---'}
                    />
                </div>

                {/*  */}
                <div className="flex items-center justify-between">
                    {/* <div onClick={() => {}}>
                        <Typography
                            variant="small"
                            color="text-info"
                            cursorPointer
                        >
                            RTO Insurance Document
                        </Typography>
                    </div> */}
                    <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                        <div
                            onClick={() => {
                                router.push(`/portals/admin/rto/${rto?.id}`)
                            }}
                        >
                            <Typography
                                variant="small"
                                color="text-info"
                                cursorPointer
                            >
                                View RTO Details
                            </Typography>
                        </div>
                    </AuthorizedUserComponent>
                </div>
            </div>
        </Card>
    )
}
