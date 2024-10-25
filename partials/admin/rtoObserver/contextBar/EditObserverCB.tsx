import React from 'react'
import { AddObserverForm } from '../form'
import { AdminApi } from '@queries'
import { useContextBar, useNotification } from '@hooks'
import { ShowErrorNotifications } from '@components'
import { UserRoles } from '@constants'

export const EditObserverCB = ({
    edit,
    initialValues,
}: {
    edit?: boolean
    initialValues?: any
}) => {
    const { notification } = useNotification()

    const contextBar = useContextBar()

    const [editObserver, editObserverResult] =
        AdminApi.RtoObserver.useUpdateRtoObserver()

    const onSubmit = async (values: any) => {
        const res: any = await editObserver({
            ...values,
            id: initialValues?.id,
            role: UserRoles.OBSERVER,
        })
        if (res?.data) {
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
            <ShowErrorNotifications result={editObserverResult} />
            <AddObserverForm
                edit={edit}
                onSubmit={onSubmit}
                initialValues={initialValues}
                isLoading={editObserverResult?.isLoading as boolean}
            />
        </div>
    )
}
