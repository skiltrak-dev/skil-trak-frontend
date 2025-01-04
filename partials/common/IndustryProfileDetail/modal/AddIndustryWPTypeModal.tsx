import { Modal, Select, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { OptionType } from '@types'
import React, { useState } from 'react'

export const AddIndustryWPTypeModal = ({
    onCancel,
    industryUserId,
    typeId = -1,
}: {
    typeId?: number
    onCancel: () => void
    industryUserId?: number
}) => {
    const [selectedTypes, setSelectedTypes] = useState<number>(typeId)

    const { notification } = useNotification()

    const wpTypes = CommonApi.Rtos.getRtoWpTypes()
    const [add, addResult] = CommonApi.Industries.addIndustryWpType()

    const wpTypesOptions = wpTypes?.data?.map((wpType: any) => ({
        value: wpType?.id,
        label: wpType?.name,
    }))

    const onConfirm = async () => {
        const res: any = await add({
            userId: industryUserId,
            wpTypeId: selectedTypes,
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
        <div>
            <ShowErrorNotifications result={addResult} />
            <Modal
                title="Add Workplace Types"
                subtitle=" "
                onCancelClick={onCancel}
                onConfirmClick={onConfirm}
                loading={addResult?.isLoading}
            >
                <Select
                    onlyValue
                    name="wpTypes"
                    options={wpTypesOptions}
                    loading={wpTypes?.isLoading}
                    disabled={wpTypes?.isLoading}
                    onChange={(e: number) => setSelectedTypes(e)}
                    value={wpTypesOptions?.find(
                        (type: OptionType) => type?.value === selectedTypes
                    )}
                />
            </Modal>
        </div>
    )
}
