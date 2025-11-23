import { Button, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { IndustryApi } from '@queries'
import React from 'react'

export const DeleteIndustryGalleryCard = ({
    handleCancel,
    galleryId,
}: {
    galleryId: number
    handleCancel: () => void
}) => {
    const [remove, removeResult] = IndustryApi.Gallery.removeIndustryGallery()

    const { notification } = useNotification()

    const onDelete = async () => {
        const res: any = await remove(galleryId)

        if (res?.data) {
            notification.error({
                title: 'Industry Gallery Removed',
                description: 'Industru Gallery removed successfully',
            })
            handleCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <div className="w-full bg-white rounded-lg shadow-md border border-red-200 overflow-hidden">
                {/* Header - Same height as original */}
                <div className="p-2 bg-red-50 border-b border-red-200">
                    <h3 className="font-bold text-gray-900">Delete Gallery?</h3>
                    <p className="text-xs text-gray-600">
                        Are you sure you want to delete this?
                    </p>
                </div>

                {/* Content - Same height as original */}
                <div className="p-2 flex items-end justify-end">
                    <div className="flex gap-2">
                        <Button
                            onClick={handleCancel}
                            variant="secondary"
                            className="!py-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onDelete}
                            variant="error"
                            loading={removeResult?.isLoading}
                            disabled={removeResult?.isLoading}
                            className="!py-1"
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
