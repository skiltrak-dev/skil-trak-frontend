import { Button, Card, Typography } from '@components'
import { LinkIcon, XCircle } from 'lucide-react'
import React, { ReactElement, useState } from 'react'
import { AttachIndustryModal, CloseEnquiryModal } from '../../modal'

export const EnquiryActions = ({ enquiryDetails }: { enquiryDetails: any }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onCloseEnquiry = () => {
        setModal(
            <CloseEnquiryModal
                onClose={onCancel}
                enquiryId={enquiryDetails?.id}
            />
        )
    }
    const onAttachIndustryClick = () => {
        setModal(
            <AttachIndustryModal
                onClose={onCancel}
                enquiryId={enquiryDetails?.id}
                premiumFeatureId={enquiryDetails?.premiumFeature?.id}
            />
        )
    }
    return (
        <>
            {modal}
            <Card className="border-2">
                <div className="pb-3">
                    <Typography variant="h4" className="text-base">
                        Admin Actions
                    </Typography>
                </div>
                <div className="space-y-3">
                    {!enquiryDetails?.industry && (
                        <Button
                            text="Attach Industry Partner"
                            Icon={LinkIcon}
                            variant="primaryNew"
                            fullWidth
                            onClick={() => onAttachIndustryClick()}
                        />
                    )}

                    <Button
                        text="Close Enquiry"
                        Icon={XCircle}
                        variant="secondary"
                        fullWidth
                        onClick={() => onCloseEnquiry()}
                    />
                </div>
            </Card>
        </>
    )
}
