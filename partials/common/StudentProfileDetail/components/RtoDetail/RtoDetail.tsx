import {
    AuthorizedUserComponent,
    Button,
    Card,
    NoData,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { useMaskText, useWorkplace } from '@hooks'
import { SubAdminApi } from '@queries'
import { maskText } from '@utils'
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

    const router = useRouter()
    const { setWorkplaceRto } = useWorkplace()

    const rtoDetail = SubAdminApi.Student.getStudentRtoDetail(studentId, {
        skip: !studentId,
        refetchOnMountOrArgChange: 300,
    })

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

    return (
        <>
            {modal}
            <Card shadowType="profile" noPadding>
                {rtoDetail?.isError ? (
                    <NoData text="There is Some Technical Issue!" isError />
                ) : null}
                {rtoDetail?.data && rtoDetail?.isSuccess ? (
                    <div className="flex justify-between items-center px-4 py-2 gap-x-7 ">
                        <div className="flex flex-col gap-y-3">
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
                                        {useMaskText({
                                            key: rtoDetail?.data?.user?.email,
                                        })}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        <div className="flex items-center justify-between gap-x-2">
                            <Button
                                text={'RTO Insurance Document'}
                                onClick={() => onViewRtoInsuranceDocs()}
                                variant="info"
                                outline
                            />
                            <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                                <Button
                                    text={'View RTO Details'}
                                    onClick={() => {
                                        router.push(
                                            `/portals/admin/rto/${rtoDetail?.data?.id}`
                                        )
                                    }}
                                    variant="info"
                                />
                            </AuthorizedUserComponent>
                        </div>
                    </div>
                ) : null}
            </Card>
        </>
    )
}
