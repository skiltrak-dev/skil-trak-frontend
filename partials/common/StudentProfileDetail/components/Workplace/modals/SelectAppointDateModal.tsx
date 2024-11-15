import React, { ChangeEvent, useState } from 'react'
import {
    Modal,
    ShowErrorNotifications,
    SidebarCalendar,
    TextInput,
    Typography,
} from '@components'
import { useAddExistingIndustriesMutation } from '@queries'
import { useNotification } from '@hooks'
import { getDate } from '@utils'
import moment from 'moment'

export const SelectAppointDateModal = ({
    onCancel,
    workplaceId,
    industryId,
}: {
    workplaceId: number
    industryId: number
    onCancel: () => void
}) => {
    const [addExistingIndustry, addExistingIndustryResult] =
        useAddExistingIndustriesMutation()

    const [date1, setDate1] = useState<string | null>(null)
    const [date2, setDate2] = useState<string | null>(null)
    const [showError, setShowError] = useState<boolean>(false)

    const { notification } = useNotification()

    const onApply = () => {
        if (date1 || date2) {
            addExistingIndustry({
                workplaceId,
                industryId,
                date1,
                date2,
            }).then((res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Industry Added Successfully',
                        description: 'Industry Added Successfully',
                    })

                    onCancel()
                }
            })
        } else {
            setShowError(true)
        }
    }
    return (
        <>
            <ShowErrorNotifications result={addExistingIndustryResult} />

            <Modal
                onCancelClick={onCancel}
                title="Expected Interview Dates"
                subtitle=""
                onConfirmClick={onApply}
                loading={addExistingIndustryResult.isLoading}
            >
                <div className="max-w-3xl flex items-center gap-x-5">
                    <TextInput
                        name={'startTime'}
                        type={'datetime-local'}
                        label={'Date 1'}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setDate1(e?.target?.value)
                            setShowError(false)
                        }}
                        min={moment().format('YYYY-MM-DDTHH:mm')}
                    />
                    <TextInput
                        name={'startTime'}
                        type={'datetime-local'}
                        label={'Date 2'}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setDate2(e?.target?.value)
                            setShowError(false)
                        }}
                        disabled={!date1}
                        min={moment(date1).format('YYYY-MM-DDTHH:mm')}
                    />
                </div>
                {showError ? (
                    <div className="bg-error-dark px-2 ml-auto w-fit rounded">
                        <Typography variant="small" color="text-white">
                            Must Select 1 Date
                        </Typography>
                    </div>
                ) : null}
            </Modal>
        </>
    )
}
