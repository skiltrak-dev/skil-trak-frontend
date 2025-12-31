import { Modal, ShowErrorNotifications } from '@components'
import { IndustryGalleryForm } from '@partials/common/IndustryProfileDetail/forms'
import { IndustryApi } from '@queries'
import { useNotification } from '@hooks'

interface AddGalleryModalProps {
    open: boolean
    industryUserId: number
    onClose: () => void
    onSuccess: () => void
}

export function AddGalleryModal({
    open,
    industryUserId,
    onClose,
    onSuccess,
}: AddGalleryModalProps) {
    const { notification } = useNotification()
    const [add, addResult] = IndustryApi.Gallery.addIndustryGallery()

    const onSubmit = async (data: any) => {
        const formData = new FormData()

        Object.entries(data).forEach(([keyBy, value]: any) => {
            formData.append(keyBy, value)
        })
        formData.append('industry', industryUserId + '')

        const res: any = await add(formData)

        if (res?.data) {
            notification.success({
                title: 'Gallery Uploaded',
                description: 'Industry Gallery Uploaded Successfully',
            })
            onSuccess()
            onClose()
        }
    }

    if (!open) return null

    return (
        <div>
            <ShowErrorNotifications result={addResult} />
            <Modal
                title="Upload New Item"
                subtitle="Add images or documents to the gallery"
                onCancelClick={onClose}
                showActions={false}
            >
                <div className="p-4">
                    <IndustryGalleryForm onSubmit={onSubmit} />
                </div>
            </Modal>
        </div>
    )
}
