import { ShowErrorNotifications } from '@components'
import { useEffect } from 'react'

// components
import { Typography } from '@components'

// query
import { useContextBar, useNotification } from '@hooks'
import { RtoApi } from '@queries'
import { AddContactPersonForm } from '../forms'

export const AddAdminCB = ({ initialValues, edit, rto }: any) => {
    const { notification } = useNotification()
    const { hide, setContent } = useContextBar()
    const [create, createResult] = RtoApi.Rto.useAddContactPerson()
    const [update, updateResult] = RtoApi.Rto.useUpdateContactPerson()

    useEffect(() => {
        if (createResult.isSuccess) {
            notification.success({
                title: 'Contact Person Added',
                description: 'Contact Person Added Successfully',
            })
            hide()
            setContent(null)
        }
    }, [createResult])

    const onSubmit = async (values: any) => {
        if (edit) {
            await update({ id: initialValues?.id, body: values }).then(
                (res: any) => {
                    if (res?.data) {
                        notification.info({
                            title: 'Contact Person Updated',
                            description: 'Contact Person Updated Successfully',
                        })
                        hide()
                        setContent(null)
                    }
                }
            )
        } else {
            await create({ ...values, rto: rto?.user?.id })
        }
    }

    const isLoading = createResult.isLoading || updateResult.isLoading
    const isError = createResult.isError || updateResult.isError
    return (
        <div>
            <ShowErrorNotifications result={createResult} />
            <ShowErrorNotifications result={updateResult} />
            <Typography variant={'small'} color={'text-gray-500'}>
                Add Contact Person:
            </Typography>

            <AddContactPersonForm
                edit={edit}
                onSubmit={onSubmit}
                isLoading={isLoading}
                initialValues={initialValues}
            />
        </div>
    )
}
