import { Modal, ShowErrorNotifications, Button } from '@components'
import { IndustryApi } from '@queries'
import { useNotification } from '@hooks'

interface DeleteGalleryModalProps {
    open: boolean
    galleryId: number | null
    onClose: () => void
    onSuccess: () => void
}

export function DeleteGalleryModal({
    open,
    galleryId,
    onClose,
    onSuccess,
}: DeleteGalleryModalProps) {
    const { notification } = useNotification()
    const [removeIndustryGallery, removeIndustryGalleryResult] =
        IndustryApi.Gallery.removeIndustryGallery()

    const handleDelete = async () => {
        if (!galleryId) return

        const res: any = await removeIndustryGallery(galleryId)
        if (res?.data) {
            notification.success({
                title: 'Item Deleted',
                description: 'Gallery item removed successfully',
            })
            onSuccess()
            onClose()
        }
    }

    if (!open) return null

    return (
        <div>
            <ShowErrorNotifications result={removeIndustryGalleryResult} />
            <Modal
                title="Delete Gallery Item"
                subtitle="Are you sure you want to delete this item? This action cannot be undone."
                onCancelClick={onClose}
                showActions={false}
            >
                <div className="p-4">
                    <div className="flex justify-end gap-3 mt-4">
                        <Button variant="secondary" onClick={onClose} text="Cancel" />
                        <Button
                            variant="error"
                            onClick={handleDelete}
                            loading={removeIndustryGalleryResult.isLoading}
                            text="Delete"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
