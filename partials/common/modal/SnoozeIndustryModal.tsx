import {
    ActionButton,
    Modal,
    ShowErrorNotifications,
    TextInput,
} from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { Industry } from '@types'
import { getDate } from '@utils'
import React, { useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'

export const SnoozeIndustryModal = ({
    onCancel,
    industry,
}: {
    industry: Industry
    onCancel: () => void
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [snoozeIndustry, snoozeIndustryResult] =
        CommonApi.Industries.useSnoozeIndustry()

    const { notification } = useNotification()

    useEffect(() => {
        if (snoozeIndustryResult.isSuccess) {
            notification.success({
                title: 'Industry Snoozed',
                description: 'Industry Snoozed Successfully',
            })
            onCancel()
        }
    }, [snoozeIndustryResult])

    const onChange = (date: Date) => {
        setSelectedDate(date)
    }

    const onSubmit = () => {
        if (selectedDate) {
            snoozeIndustry({
                id: industry?.id,
                date: selectedDate,
            })
        }
    }
    return (
        <>
            <ShowErrorNotifications result={snoozeIndustryResult} />
            <Modal
                showActions={false}
                onConfirmClick={() => {}}
                title="Snooze Industry"
                subtitle="Snooze Industry"
                onCancelClick={onCancel}
            >
                <div className="flex w-80 items-center gap-x-2">
                    <TextInput
                        label={'Enter Snoozing Date'}
                        name={'endDate'}
                        placeholder="Enter Snoozing End Date"
                        type={'date'}
                        onChange={(e: any) => {
                            onChange(e.target?.value)
                        }}
                        min={getDate()}
                    />
                    <ActionButton
                        Icon={AiFillCheckCircle}
                        onClick={() => {
                            onSubmit()
                        }}
                        variant="info"
                        loading={snoozeIndustryResult.isLoading}
                        disabled={
                            snoozeIndustryResult.isLoading || !selectedDate
                        }
                    />
                </div>
            </Modal>
        </>
    )
}
