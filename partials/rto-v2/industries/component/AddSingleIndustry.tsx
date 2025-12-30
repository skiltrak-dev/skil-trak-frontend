import React from 'react'
import { RtoV2Api } from '@redux'
import { useNotification } from '@hooks'
import { SingleIndustryForm } from '../forms'
import { ShowErrorNotifications } from '@components'
import { UserRoles } from '@constants'

export const AddSingleIndustry = ({ onClose }: { onClose: () => void }) => {
    const [addSingleRtoIndustry, addSingleRtoIndustryResult] =
        RtoV2Api.Industries.addSingleRtoIndustry()

    const { notification } = useNotification()

    const onSubmit = async (values: any) => {
        const response: any = await addSingleRtoIndustry({
            ...values,
            role: UserRoles.INDUSTRY,
        })

        if (response?.data) {
            notification.success({
                title: 'Industry added successfully',
                description: 'Industry added successfully',
            })
            onClose()
        }

        return
    }
    return (
        <div>
            <ShowErrorNotifications result={addSingleRtoIndustryResult} />
            <SingleIndustryForm onSubmit={onSubmit} />
        </div>
    )
}
