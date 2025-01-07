import { Modal, Select, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import React, { useState } from 'react'

export const AddRTOWpTypeModal = ({
    userId,
    onCancel,
    courseId,
    selectedIds,
}: {
    userId?: number
    courseId: number
    selectedIds: number[]
    onCancel: () => void
}) => {
    const [selectedTypes, setSelectedTypes] = useState<number[]>([])

    const { notification } = useNotification()

    const wpTypes = CommonApi.Rtos.getRtoWpTypes(courseId)
    const [add, addResult] = CommonApi.Rtos.addRtoWpType()

    const wpTypesOptions = wpTypes?.data
        ?.filter((wpType: any) => !selectedIds?.includes(wpType?.id))
        ?.map((wpType: any) => ({
            value: wpType?.id,
            label: wpType?.name,
        }))

    const onConfirm = async () => {
        const res: any = await add({
            userId,
            typeIds: selectedTypes,
            courseId,
        })

        if (res?.data) {
            notification.success({
                title: 'Type Added',
                description: 'Type Added Successfully',
            })
            onCancel()
        }
    }
    return (
        <>
            <ShowErrorNotifications result={addResult} />
            <Modal
                title="Add Workplace Types"
                subtitle=" "
                onCancelClick={onCancel}
                onConfirmClick={onConfirm}
                loading={addResult?.isLoading}
            >
                <div className="max-w-3xl w-full">
                    <Select
                        name="wpTypes"
                        options={wpTypesOptions}
                        multi
                        loading={wpTypes?.isLoading}
                        disabled={wpTypes?.isLoading}
                        onlyValue
                        onChange={(e: number[]) => setSelectedTypes(e)}
                    />
                </div>
            </Modal>
        </>
    )
}
