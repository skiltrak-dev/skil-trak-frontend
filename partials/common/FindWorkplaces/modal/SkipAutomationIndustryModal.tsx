import { ActionModal } from '@components'
import { useNotification } from '@hooks'

import { FaTrash } from 'react-icons/fa'

export const SkipAutomationIndustryModal = ({
    onCancel,
    setRemovedItems,
    company,
}: {
    onCancel: () => void
    company: any
    setRemovedItems: (item: any) => void
}) => {
    const { notification } = useNotification()

    const onConfirmUClicked = async () => {
        setRemovedItems(
            (prev: string[]) => new Set([...prev, company?.placeId])
        )
        notification.error({
            title: `Industry skipped`,
            description: `Industry "${company?.name}" has been skipped.`,
        })
        onCancel()
    }

    return (
        <>
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to skip "${company?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={company?.email}
                actionObject={company}
            />
        </>
    )
}
