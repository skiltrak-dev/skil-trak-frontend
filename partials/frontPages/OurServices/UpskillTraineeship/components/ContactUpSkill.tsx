import React from 'react'
import { UpskillForm } from '../form'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import { ShowErrorNotifications } from '@components'
import { getAge } from '@utils'
import moment from 'moment'

export const ContactUpSkill = () => {
    const [addTraineeship, addTraineeshipResult] =
        CommonApi.Traineeship.useAddTraineeship()

    const { notification } = useNotification()

    const onSubmit = (values: any) => {
        var dob = moment(values?.dob)

        // Get the current date using moment
        var currentDate = moment()

        // Calculate the age using moment
        var age = Number(currentDate.diff(dob, 'years'))

        addTraineeship({ ...values, age })?.then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Traineeship Query Sent',
                    description:
                        'Your inquiry has been submitted to our administrator',
                })
            }
        })
    }
    return (
        <>
            <ShowErrorNotifications result={addTraineeshipResult} />
            <div className="rounded-[10px] shadow-site px-6 py-5 bg-white">
                <UpskillForm
                    onSubmit={onSubmit}
                    result={addTraineeshipResult}
                />
            </div>
        </>
    )
}
