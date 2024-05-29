import { Button, Modal, Select, Typography } from '@components'
import { useNotification } from '@hooks'
import { RtoApi } from '@queries'
import { OptionType, SubAdmin, User } from '@types'
import { useEffect, useState } from 'react'

export const AssignCoordinatorModal = ({
    onCancel,
    studentId,
    rtoCoordinatorId,
    studentUser,
}: {
    studentId: number
    studentUser: User
    rtoCoordinatorId: number
    onCancel: () => void
}) => {
    const [selectedSubadmin, setSelectedSubadmin] = useState<number | null>(
        null
    )

    const { notification } = useNotification()

    const subadmins = RtoApi.Coordinator.useList({})

    const subAdminOptions = subadmins?.data?.data?.map((subAdmin: any) => ({
        label: subAdmin?.user?.name,
        value: subAdmin?.id,
    }))

    const [assignCoordinator, assignCoordinatorResult] =
        RtoApi.Students.useAssignCoordinatoToStudent()

    useEffect(() => {
        if (rtoCoordinatorId) {
            setSelectedSubadmin(rtoCoordinatorId)
        }
    }, [rtoCoordinatorId])

    const onAssignCoordinator = () => {
        if (selectedSubadmin) {
            assignCoordinator({
                studentId,
                subAdmin: selectedSubadmin,
            }).then((res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Coordinator Assigned',
                        description: 'Coordinator Assigned Successfully',
                    })
                    onCancel()
                }
            })
        } else {
            notification.warning({
                title: 'Select Coordinator',
                description: 'You must select the coordinator',
            })
        }
    }

    return (
        <div>
            <Modal
                title="Assign Coordinator"
                subtitle="Assign Coordinator to Student"
                onConfirmClick={() => {
                    onAssignCoordinator()
                }}
                showActions={false}
                onCancelClick={onCancel}
                loading={assignCoordinatorResult.isLoading}
            >
                <Typography variant="label">
                    You are assigning coordinator to student "
                    <strong>{studentUser?.name}</strong>"
                </Typography>
                <Select
                    label={'Assign TO'}
                    name={'assignedTo'}
                    placeholder={'Assign TO...'}
                    value={subAdminOptions?.find(
                        (subadmin: OptionType) =>
                            subadmin?.value === selectedSubadmin
                    )}
                    options={subAdminOptions}
                    loading={subadmins?.isLoading}
                    disabled={subadmins?.isLoading}
                    onlyValue
                    onChange={(e: number) => {
                        setSelectedSubadmin(e)
                    }}
                />
                <div className="flex justify-end items-end gap-x-4 ">
                    <Button variant={'secondary'} onClick={onCancel}>
                        {'Cancel'}
                    </Button>
                    <Button
                        onClick={onAssignCoordinator}
                        loading={assignCoordinatorResult.isLoading}
                        disabled={assignCoordinatorResult.isLoading}
                    >
                        {'Confirm'}
                    </Button>
                </div>
            </Modal>
        </div>
    )
}
