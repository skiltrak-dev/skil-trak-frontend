import { Button, Modal, Select, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { MealTypes } from '@types'
import { useState } from 'react'

export const AddServicesOfferedModal = ({
    onCancel,
    industryId,
    serviceOffered,
}: {
    serviceOffered: MealTypes[]
    industryId: number
    onCancel: () => void
}) => {
    const [selectedMealType, setSelectedMealType] = useState<MealTypes[]>(
        serviceOffered || []
    )

    const [addserviceOffered, addserviceOfferedResult] =
        AdminApi.Industries.addIndustryServiceOffered()

    const { notification } = useNotification()

    const mealTypeOptions = Object.entries(MealTypes).map(
        ([label, value]: any) => ({
            label,
            value,
        })
    )

    const onConfirm = async () => {
        const res: any = await addserviceOffered({
            id: industryId,
            serviceOffered: selectedMealType,
        })

        if (res?.data) {
            notification.success({
                title: 'Service Offered Added',
                description: 'Srevice Offered Added Successfully',
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={addserviceOfferedResult} />
            <Modal
                confirmText="Add"
                title="Services Offered"
                onCancelClick={onCancel}
                onConfirmClick={onConfirm}
                subtitle="Select Services Offered"
                loading={addserviceOfferedResult?.isLoading}
            >
                <div>
                    <Select
                        multi
                        onlyValue
                        name="mealType"
                        value={mealTypeOptions?.filter((mealType) =>
                            selectedMealType?.includes(mealType?.value)
                        )}
                        label="Select Meal Type"
                        options={mealTypeOptions}
                        onChange={setSelectedMealType}
                    />
                </div>
            </Modal>
        </>
    )
}
