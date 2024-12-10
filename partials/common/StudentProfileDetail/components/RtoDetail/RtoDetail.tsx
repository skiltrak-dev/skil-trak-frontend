import { AuthorizedUserComponent, Card, NoData, Typography } from '@components'
import { ProfileCard } from '@partials/admin/sub-admin/SubadminProfileDetail/components/ProfileDetail/ProfileCard'
import { Rto } from '@types'
import { Avatar } from '../../ContextBarComponents'
import { UserRoles } from '@constants'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { RtoInsuranceDocModal } from '../../modals'
import { SubAdminApi } from '@queries'

export const RtoDetail = ({ studentId }: { studentId: number }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const router = useRouter()

    const rtoDetail = SubAdminApi.Student.getStudentRtoDetail(studentId, {
        skip: !studentId,
    })

    const onCancel = () => setModal(null)

    const onViewRtoInsuranceDocs = () => {
        setModal(
            <RtoInsuranceDocModal onCancel={onCancel} rtoUser={rto?.user} />
        )
    }
    return (
        <>
            {modal}
            <Card shadowType="profile">
                {rtoDetail?.isError ? (
                    <NoData text="There is Some Technical Issue!" />
                ) : null}
                {rtoDetail?.data && rtoDetail?.isSuccess ? (
                    <div className="grid grid-cols-3 gap-x-7">
                        <div className="flex flex-col gap-y-3">
                            <Typography variant="label" semibold>
                                RTO
                            </Typography>
                            <div className="flex  gap-x-2.5 items-center">
                                <div className="">
                                    <Avatar
                                        avatar={rtoDetail?.data?.user?.avatar}
                                        name={rtoDetail?.data?.user?.name}
                                    />
                                </div>
                                <div className="">
                                    <Typography semibold>
                                        <span className="text-[15px]">
                                            {rtoDetail?.data?.user?.name}
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant="xs"
                                        color="text-[#6B7280]"
                                    >
                                        {rtoDetail?.data?.user?.email}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        <div className="flex flex-col gap-y-2">
                            <ProfileCard
                                title="RTO Phone Number"
                                detail={rtoDetail?.data?.phone || '---'}
                            />
                            <ProfileCard
                                title="Contact Person Number"
                                detail={
                                    rtoDetail?.data?.contactPersons?.[0]
                                        ?.phone || '---'
                                }
                            />
                        </div>

                        {/*  */}
                        <div className="flex items-center justify-between">
                            <div onClick={() => onViewRtoInsuranceDocs()}>
                                <Typography
                                    variant="small"
                                    color="text-info"
                                    cursorPointer
                                >
                                    RTO Insurance Document
                                </Typography>
                            </div>
                            <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                                <div
                                    onClick={() => {
                                        router.push(
                                            `/portals/admin/rto/${rto?.id}`
                                        )
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
                ) : null}
            </Card>
        </>
    )
}
