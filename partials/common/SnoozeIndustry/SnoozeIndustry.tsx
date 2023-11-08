import { Industry } from '@types'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import { memo, useEffect, useState } from 'react'
import { ActionButton, ShowErrorNotifications, TextInput } from '@components'
import { AiFillCheckCircle } from 'react-icons/ai'
import { getDate } from '@utils'

export const SnoozeIndustry = memo(({ industry }: { industry: Industry }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [snoozeIndustry, snoozeIndustryResult] =
        CommonApi.Industries.useSnoozeIndustry()

    const { notification } = useNotification()

    const onChange = (date: Date) => {
        setSelectedDate(date)
    }

    const onSubmit = () => {
        if (selectedDate) {
            snoozeIndustry({
                id: industry?.id,
                date: selectedDate,
            }).then((res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Industry Snoozed',
                        description: 'Industry Snoozed Successfully',
                    })
                }
            })
        }
    }

    return (
        <>
            <ShowErrorNotifications result={snoozeIndustryResult} />
            <div className="flex justify-end ml-auto w-80 items-center gap-x-2">
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
                    disabled={snoozeIndustryResult.isLoading || !selectedDate}
                />
            </div>
        </>
    )
})
