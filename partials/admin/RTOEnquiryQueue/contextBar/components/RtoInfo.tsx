import { Card, Typography } from '@components'
import { Building2, Mail } from 'lucide-react'
import React from 'react'

export const RtoInfo = ({ enquiryDetails }: { enquiryDetails: any }) => {
    return (
        <Card className="!bg-primary/5 border-[#F7A619]/30 space-y-3">
            <div className="pb-3">
                <Typography
                    variant="title"
                    className="flex items-center gap-2 text-[#F7A619]"
                >
                    <Building2 className="h-4 w-4" />
                    RTO Information
                </Typography>
            </div>
            <div className="space-y-4">
                <div>
                    <Typography variant="small" className="text-[#8c8c8c]">
                        Organization Name
                    </Typography>
                    <p className="text-sm text-[#262626] mt-1">
                        {enquiryDetails?.rto?.user?.name}
                    </p>
                </div>

                <div>
                    <Typography variant="small" className="text-[#8c8c8c]">
                        Email Address
                    </Typography>
                    <p className="text-sm text-[#262626] mt-1 flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-[#F7A619]" />
                        {enquiryDetails?.rto?.user?.email}
                    </p>
                </div>
                {enquiryDetails?.contactPersonName && (
                    <div>
                        <Typography variant="small" className="text-[#8c8c8c]">
                            Contact Person
                        </Typography>
                        <p className="text-sm text-[#262626] mt-1">
                            {enquiryDetails?.contactPersonName}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    )
}
