import { useNotification } from '@hooks'
import { ShowErrorNotifications, Switch, Typography } from '@components'
import { SubAdminApi } from '@queries'
import React, { useEffect } from 'react'

export const ContactStatus = ({
    studentId,
    nonContactable,
}: {
    studentId: number
    nonContactable: boolean
}) => {
    const [notContactable, notContactableResult] =
        SubAdminApi.Student.useNotContactable()

    const { notification } = useNotification()

    useEffect(() => {
        if (notContactableResult.isSuccess) {
            notification.success({
                title: nonContactable ? 'Contactable' : 'Not Contactable',
                description: nonContactable ? 'Contactable' : 'Not Contactable',
            })
        }
    }, [notContactableResult])

    const onContactableChange = () => {
        notContactable(studentId)
    }

    return (
        <>
            <ShowErrorNotifications result={notContactableResult} />
            <div className="py-3 border-b border-secondary-dark">
                <Typography variant="small" medium>
                    Contact Status
                </Typography>
                <div className="grid grid-cols-5 items-center mt-2">
                    <div className="col-span-2">
                        <Typography variant="small" normal>
                            Not-Contactable
                        </Typography>
                    </div>
                    <div className="col-span-3 grid grid-cols-2">
                        <div className="-mb-2">
                            <Switch
                                name="priority"
                                customStyleClass={'profileSwitch'}
                                onChange={() => {
                                    onContactableChange()
                                }}
                                defaultChecked={nonContactable}
                                loading={notContactableResult.isLoading}
                                disabled={notContactableResult.isLoading}
                            />
                        </div>
                        <Typography variant="small" normal>
                            Contactable
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
