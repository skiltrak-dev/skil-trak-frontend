import React, { ChangeEvent, useState } from 'react'
import {
    Modal,
    ShowErrorNotifications,
    SidebarCalendar,
    TextInput,
    Typography,
} from '@components'
import { useAddExistingIndustriesMutation } from '@queries'
import { useNotification, useWorkplace } from '@hooks'
import { getDate } from '@utils'
import moment from 'moment'

export const SelectAppointDateModal = ({
    dist,
    onCancel,
    workplaceId,
    industryId,
    industryUserName,
}: {
    dist: any
    workplaceId: number
    industryId: number
    onCancel: () => void
    industryUserName: string
}) => {
    const [addExistingIndustry, addExistingIndustryResult] =
        useAddExistingIndustriesMutation()

    const [date1, setDate1] = useState<string | null>(null)
    const [date2, setDate2] = useState<string | null>(null)
    const [showError, setShowError] = useState<boolean>(false)

    const { notification } = useNotification()
    const { setWorkplaceData } = useWorkplace()

    const onApply = async () => {
        if (date1 || date2) {
            const res: any = await addExistingIndustry({
                workplaceId,
                industryId,
                date1,
                date2,
            })

            if (res?.data) {
                notification.success({
                    title: 'Industry Added Successfully',
                    description: 'Industry Added Successfully',
                })

                onCancel()
            }

            if (res?.error?.data?.message === 'limitExceed') {
                setWorkplaceData({
                    name: industryUserName,
                    type: 'limitExceed',
                })
                onCancel()
            }

            if (res?.error?.data?.message === 'docsMismatch') {
                setWorkplaceData({
                    type: 'docsMismatch',
                    rtoName: res?.error?.data?.rtoName,
                    missingDocuments: res?.error?.data?.missingDocuments,
                    dates: { date1, date2 },
                })
            }

            if (res?.error?.data?.message === 'distanceExceededLimit') {
                setWorkplaceData({
                    type: 'placementOutSide20Km',
                    dates: { date1, date2 },
                })
            }

            if (res?.error?.data?.message === 'tradingHoursNotFound') {
                setWorkplaceData({
                    type: 'tradingHoursNotFound',
                })
            }
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
