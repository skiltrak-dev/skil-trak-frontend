import { Card, Typography } from '@components'
import { Calendar, FileText } from 'lucide-react'
import React from 'react'

export const ServiceDetail = ({ enquiryDetails }: { enquiryDetails: any }) => {
    return (
        <Card className="border-2 border-[#0D5468]/20">
            <div className="pb-3">
                <Typography
                    variant="title"
                    className="flex items-center gap-2 text-[#0D5468]"
                >
                    <FileText className="h-4 w-4" />
                    Service Details
                </Typography>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Typography variant="small" className="text-[#8c8c8c]">
                            Service Type
                        </Typography>
                        <p className="text-sm text-[#262626] mt-1">
                            {enquiryDetails?.premiumFeature?.type}
                        </p>
                    </div>
                    <div>
                        <Typography variant="small" className="text-[#8c8c8c]">
                            Submitted
                        </Typography>
                        <p className="text-sm text-[#262626] mt-1">
                            {new Date(
                                enquiryDetails?.createdAt
                            ).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                </div>
                {enquiryDetails?.timeLine && (
                    <div>
                        <Typography variant="small" className="text-[#8c8c8c]">
                            Preferred Timeline
                        </Typography>
                        <p className="text-sm text-[#262626] mt-1 flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" />
                            {enquiryDetails?.timeLine}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    )
}
