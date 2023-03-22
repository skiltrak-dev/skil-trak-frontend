import React, { useEffect } from 'react'
import { SubAdminForm } from '../form'
import { UserRoles } from '@constants'

// query
import { AdminApi } from '@queries'
import { SubAdmin, User } from '@types'
import { useContextBar, useNotification } from '@hooks'

export const AddSubAdminCB = ({
    subAdmin,
    edit,
}: {
    edit?: boolean
    subAdmin?: SubAdmin
}) => {
    const { notification } = useNotification()
    const contextBar = useContextBar()

    const [createSubAmin, createSubAminResult] =
        AdminApi.SubAdmins.createSubAmin()
    const [update, updateResult] = AdminApi.SubAdmins.useUpdate()

    useEffect(() => {
        if (createSubAminResult.isSuccess) {
            notification.success({
                title: 'SubAdmin Added',
                description: 'SubAdmin Added Successfully',
            })
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [createSubAminResult])

    useEffect(() => {
        if (updateResult.isSuccess) {
            notification.info({
                title: 'SubAdmin Updated',
                description: 'SubAdmin Updated Successfully',
            })
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [updateResult])

    const onSubmit = (values: any) => {
        if (edit) {
            // delete values.password

            update({ id: subAdmin?.id, body: values })
        } else {
            createSubAmin({
                role: UserRoles.SUBADMIN,
                ...values,
                password: 'NA',
            })
        }
    }

    return (
        <div>
            <SubAdminForm
                result={edit ? updateResult : createSubAminResult}
                onSubmit={onSubmit}
                subAdmin={subAdmin}
                edit={edit}
            />
        </div>
    )
}
