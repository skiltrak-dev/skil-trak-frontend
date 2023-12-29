import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { CommonApi } from '@queries'

import { Rto, Sector } from '@types'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteCountryModal = ({
    country,
    onCancel,
}: {
    country: any
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [remove, removeResult] = CommonApi.Countries.useDelateCountry()

    const onConfirmClicked = async (sector: any) => {
        await remove(sector?.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `Country Deleted`,
                description: `Country "${country?.name}" has been deleted.`,
            })
            onCancel()
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting Country was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={FaTrash}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete "${country?.name}". Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={country?.name}
            actionObject={country}
            loading={removeResult?.isLoading}
        />
    )
}
