import { Card, Typography } from '@components'
import { XCircle } from 'lucide-react'
import moment from 'moment'
import React from 'react'

export const CloseEnquiryDetail = ({
    enquiryDetails,
}: {
    enquiryDetails: any
}) => {
    return (
        <Card className="bg-[#8c8c8c]/5 border-[#8c8c8c]/30">
            <div className="pb-3">
                <Typography
                    variant="h4"
                    className="flex items-center gap-2 text-[#8c8c8c]"
                >
                    <XCircle className="h-4 w-4" />
                    Closure Information
                </Typography>
            </div>
            <div className="space-y-3">
                {enquiryDetails?.closedAt && (
                    <div>
                        <Typography variant="small" className="text-[#8c8c8c]">
                            Closed Date
                        </Typography>
                        <p className="text-sm text-[#262626] mt-1">
                            {moment(enquiryDetails?.closedAt).format(
                                'MMMM DD, YYYY'
                            )}
                        </p>
                    </div>
                )}

                {enquiryDetails?.closeNote && (
                    <div>
                        <Typography variant="small" className="text-[#8c8c8c]">
                            Notes
                        </Typography>
                        <p className="text-sm text-[#262626] mt-1 whitespace-pre-line">
                            {enquiryDetails?.closeNote}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    )
}
