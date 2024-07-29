// components
import {
    Typography,
    Button,
    ShowErrorNotifications,
    Select,
    AuthorizedUserComponent,
} from '@components'
import { useNotification } from '@hooks'

import { AdminApi, SubAdminApi, useAssignToSubAdminMutation } from '@queries'
import { useEffect, useState } from 'react'

// utils
import {
    WorkplaceCurrentStatus,
    ellipsisText,
    getUserCredentials,
} from '@utils'
import { ActionModal, UnAssignSubAdminModal } from '../modals'
import { HiCheckBadge } from 'react-icons/hi2'
import { UserRoles } from '@constants'
import { CoordinatorChangeModal } from '@partials/common/StudentProfileDetail/components'

type AssignToMeProps = {
    workplace: any
    appliedIndustry: any
    isAdmin?: boolean
}
export const AssignToMe = ({
    workplace,
    appliedIndustry,
    isAdmin = false,
}: AssignToMeProps) => {
    const [assignToMe, assignToMeResult] = useAssignToSubAdminMutation()
    const [modal, setModal] = useState<any | null>(null)
    const [changeCoordinator, setChangeCoordinator] = useState<boolean>(false)

    const subadmins = AdminApi.Workplace.subadminForAssignWorkplace()

    const onCancelClicked = () => {
        setModal(null)
    }

    const onUnAssignClicked = (subadmin: any) => {
        setModal(
            <UnAssignSubAdminModal
                onCancel={onCancelClicked}
                subadmin={subadmin}
                workplaceId={workplace?.id}
                setChangeCoordinator={setChangeCoordinator}
            />
        )
    }

    // hooks
    const { notification } = useNotification()

    useEffect(() => {
        if (assignToMeResult.isSuccess) {
            notification.success({
                title: 'Workplace Assigned',
                description: 'Workplace Assigned to you Successfully',
            })
            if (!workplace?.byExistingAbn) {
                setModal(
                    <ActionModal
                        Icon={HiCheckBadge}
                        title={'Successfully Assigned'}
                        subtitle={
                            'Now You can take an Interview from Student, You can select the interview from top right options of workplace'
                        }
                        onCancel={onCancelClicked}
                    />
                )
            }
            setChangeCoordinator(false)
            // setTimeout(() => {
            //     setModal(null)
            // }, 5000)
        }
    }, [assignToMeResult])

    const role = getUserCredentials()?.role

    const subAdminOptions = subadmins?.data?.map((subAdmin: any) => ({
        label: subAdmin?.user?.name,
        value: subAdmin?.user?.id,
    }))

    const onChangeCoordinator = (subadminId?: number) => {
        setModal(
            <CoordinatorChangeModal
                onCancel={onCancelClicked}
                appliedIndustryId={appliedIndustry?.id}
                subadminId={subadminId}
                workplaceId={workplace?.id}
            />
        )
    }

    return (
        <div>
            {modal && modal}
            <ShowErrorNotifications result={assignToMeResult} />
            <Typography variant={'xs'} color={'text-gray-400'}>
                Allocated To:
            </Typography>
            {changeCoordinator ? (
                <div className="flex items-center gap-x-2">
                    <div className="w-48">
                        <Select
                            label={'Sub Admin'}
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
                                onChangeCoordinator(Number(e?.value))
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div
                            className="cursor-pointer"
                            onClick={() =>
                                onUnAssignClicked(workplace?.assignedTo)
                            }
                        >
                            <Typography variant={'xs'} color={'text-info'}>
                                Un Assign
                            </Typography>
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => setChangeCoordinator(false)}
                        >
                            <Typography variant={'xs'} color={'text-info'}>
                                Cancel
                            </Typography>
                        </div>
                    </div>
                </div>
            ) : workplace?.assignedTo ? (
                <div className="flex items-center gap-x-2">
                    <Typography variant={'small'} capitalize>
                        <span
                            className="font-semibold whitespace-nowrap"
                            title={workplace?.assignedTo?.user?.name}
                        >
                            {ellipsisText(
                                workplace?.assignedTo?.user?.name,
                                15
                            )}
                        </span>
                    </Typography>
                    <div
                        className="cursor-pointer"
                        onClick={() => setChangeCoordinator(true)}
                    >
                        <Typography variant={'xs'} color={'text-info'}>
                            Change
                        </Typography>
                    </div>
                </div>
            ) : (
                <>
                    <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                        <Select
                            label={'Sub Admin'}
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
                                onChangeCoordinator(Number(e?.value))
                            }}
                        />
                    </AuthorizedUserComponent>
                    <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                        <Button
                            variant={'dark'}
                            text={isAdmin ? 'ASSIGN TO' : 'ASSIGN TO ME'}
                            onClick={() => {
                                if (appliedIndustry) {
                                    onChangeCoordinator()
                                } else {
                                    notification.error({
                                        title: 'First Apply To Industry',
                                        description:
                                            'Student Must apply to industry Before placing Coordinator or Coordinator also apply to industry on behalf of Student',
                                        autoDismiss: false,
                                    })
                                }
                            }}
                            loading={assignToMeResult?.isLoading}
                            disabled={
                                assignToMeResult?.isLoading ||
                                workplace?.currentStatus ===
                                    WorkplaceCurrentStatus.Cancelled ||
                                assignToMeResult.isSuccess ||
                                role !== UserRoles.SUBADMIN
                            }
                        />
                    </AuthorizedUserComponent>
                </>
            )}
        </div>
    )
}
