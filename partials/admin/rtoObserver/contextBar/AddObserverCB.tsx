import React from 'react'
import { AddObserverForm } from '../form'
import { AdminApi } from '@queries'
import { useContextBar, useNotification } from '@hooks'
import { ShowErrorNotifications } from '@components'
import { UserRoles } from '@constants'

export const AddObserverCB = () => {
    const { notification } = useNotification()

    const contextBar = useContextBar()

    const [addObserver, addObserverResult] =
        AdminApi.RtoObserver.useAddRtoObserver()

    const onSubmit = async (values: any) => {
        const res: any = await addObserver({
            ...values,
            password: 'N/A',
            role: UserRoles.OBSERVER,
        })
        console.log({ res })
        if (res?.data) {
            console.log('sasasasas')
            notification.success({
                title: 'Contact Person added',
                description: 'Contact Person Added',
            })
            contextBar.hide()
            contextBar.setTitle('')
            contextBar.setContent(null)
        }
    }
    return (
        <div>
            <ShowErrorNotifications result={addObserverResult} />
            <AddObserverForm
                onSubmit={onSubmit}
                isLoading={addObserverResult?.isLoading}
            />
        </div>
    )
}
