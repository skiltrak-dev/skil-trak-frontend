import React, { useState } from 'react'
import { Modal, Select } from '@components'
import { AdminApi, RtoApi } from '@queries'
import { OptionType } from '@types'
import { useNotification } from '@hooks'

export const AssignCoordinatorModal = ({
    onCancel,
    studentId,
}: {
    studentId: number
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
                subtitle="Assign Coordinator to Subadmin"
                onConfirmClick={() => {
                    onAssignCoordinator()
                }}
                onCancelClick={onCancel}
                loading={assignCoordinatorResult.isLoading}
            >
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
            </Modal>
        </div>
    )
}
