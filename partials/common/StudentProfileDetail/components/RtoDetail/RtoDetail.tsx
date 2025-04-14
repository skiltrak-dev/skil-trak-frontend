import {
    AuthorizedUserComponent,
    Card,
    NoData,
    Typography,
    useAuthorizedUserComponent,
} from '@components'
import { UserRoles } from '@constants'
import { useWorkplace } from '@hooks'
import { ProfileCard } from '@partials/admin/sub-admin/SubadminProfileDetail/components/ProfileDetail/ProfileCard'
import { SubAdminApi } from '@queries'
import { getUserCredentials, maskText } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { Avatar } from '../../ContextBarComponents'
import { RtoInsuranceDocModal } from '../../modals'

export const RtoDetail = ({
    isHod,
    studentId,
}: {
    isHod?: boolean
    studentId: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const role = getUserCredentials()?.role

    const router = useRouter()
    const { setWorkplaceRto } = useWorkplace()

    const rtoDetail = SubAdminApi.Student.getStudentRtoDetail(studentId, {
        skip: !studentId,
        refetchOnMountOrArgChange: 300,
    })
    const rolesIncludes = [UserRoles.ADMIN, UserRoles.RTO]

    useEffect(() => {
        if (rtoDetail?.data && rtoDetail?.isSuccess) {
            setWorkplaceRto(rtoDetail?.data)
        }
    }, [rtoDetail])

    const onCancel = () => setModal(null)

    const onViewRtoInsuranceDocs = () => {
        setModal(
            <RtoInsuranceDocModal
                onCancel={onCancel}
                rtoUser={rtoDetail?.data?.user}
            />
        )
    }

    const isPermission = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN, UserRoles.RTO],
        isHod,
    })

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
                                        {maskText(rtoDetail?.data?.user?.email)}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        <div className="flex flex-col gap-y-2">
                            <ProfileCard
                                title="RTO Phone Number"
                                detail={
                                    maskText(
                                        rtoDetail?.data?.phone,
                                        isPermission
                                            ? rtoDetail?.data?.phone?.length ||
                                                  0
                                            : 3
                                    ) || '---'
                                }
                            />
                            <ProfileCard
                                title="Contact Person Number"
                                detail={
                                    rtoDetail?.data?.contactPersons &&
                                    rtoDetail?.data?.contactPersons?.length > 0
                                        ? maskText(
                                              rtoDetail?.data
                                                  ?.contactPersons?.[0]?.phone,
                                              isPermission
                                                  ? rtoDetail?.data
                                                        ?.contactPersons?.[0]
                                                        ?.phone?.length
                                                  : 3
                                          )
                                        : '---'
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
                                            `/portals/admin/rto/${rtoDetail?.data?.id}`
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
