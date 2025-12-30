import { Select } from '@components'
import { RtoV2Api } from '@redux'
import { useState } from 'react'
import { useNotification } from 'hooks/useNotification'

interface IntrustedTypeProps {
    industryId: number
    initialValue?: boolean
}

export const IntrustedType = ({
    industryId,
    initialValue,
}: IntrustedTypeProps) => {
    const [value, setValue] = useState<'interested' | 'notInterested'>(
        initialValue ? 'interested' : 'notInterested'
    )
    const [updateInterestedType, { isLoading }] =
        RtoV2Api.Industries.updateInterestedType()
    const { notification } = useNotification()

    const options = [
        { label: 'Interested', value: 'interested' },
        { label: 'Not Interested', value: 'notInterested' },
    ]

    const handleChange = async (val: 'interested' | 'notInterested') => {
        setValue(val)
        try {
            await updateInterestedType({
                industryId,
                status: val as 'interested' | 'notInterested',
            }).unwrap()
            notification.success({
                title: 'Status Updated',
                description: 'Interest status updated successfully',
            })
        } catch (error) {
            notification.error({
                title: 'Update Failed',
                description: 'Failed to update interest status',
            })
            // Revert value on error
            setValue(initialValue ? 'interested' : 'notInterested')
        }
    }

    return (
        <div className="w-48">
            <Select
                onlyValue
                value={value}
                options={options}
                showError={false}
                className="text-xs"
                disabled={isLoading}
                loading={isLoading}
                onChange={handleChange}
                placeholder="Select Interest"
                name={`interestedType-${industryId}`}
            />
        </div>
    )
}
