import React from 'react'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import { MdCancel, MdCheckCircle, MdDescription } from 'react-icons/md'
import { Button, Modal, ShowErrorNotifications, Typography } from '@components'

interface ConfirmationModalProps {
    onCancel: (isFromModal?: boolean) => void
    selectedSector: number
    listingResults: string[]
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    onCancel,
    selectedSector,
    listingResults,
}) => {
    const [submitListing, submitListingResult] =
        CommonApi.FindWorkplace.submitAutoListing()

    const { notification } = useNotification()

    const onSubmitListing = async () => {
        const res: any = await submitListing({
            id: selectedSector,
            listing: listingResults,
        })

        if (res?.data) {
            notification.success({
                title: 'Listing Submit',
                description: 'Listing Submit Successfully',
            })
            onCancel(true)
        }
    }

    return (
        <>
            <ShowErrorNotifications result={submitListingResult} />
            <Modal
                title="Ready to Submit!"
                subtitle={`You have ${listingResults?.length} companies ready to be submitted to the Industry Listing. Please confirm to proceed.`}
                onCancelClick={onCancel}
                showActions={false}
            >
                <div className="p-6">
                    <div className="flex flex-col gap-3">
                        <Button
                            variant="primaryNew"
                            onClick={onSubmitListing}
                            text="Submit"
                            loading={submitListingResult?.isLoading}
                            disabled={submitListingResult?.isLoading}
                            Icon={MdDescription}
                        />

                        <Button
                            outline
                            onClick={() => onCancel(false)}
                            Icon={MdCancel}
                            text="Cancel"
                        />
                    </div>

                    <div
                        className="mt-4 p-3 rounded-lg border"
                        style={{
                            backgroundColor: 'rgba(4, 72, 102, 0.05)',
                            borderColor: 'rgba(4, 72, 102, 0.2)',
                        }}
                    >
                        <div
                            className="flex items-center gap-2 text-sm"
                            style={{ color: '#044866' }}
                        >
                            <MdCheckCircle className="w-4 h-4" />
                            <Typography variant="small" color="#044866">
                                {listingResults?.length} companies are ready to
                                be added to our industry listing database. Ready
                                to submit{' '}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
