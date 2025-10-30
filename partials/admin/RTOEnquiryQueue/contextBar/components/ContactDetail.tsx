import { Card } from '@components'
import { Mail, User } from 'lucide-react'
import React from 'react'

export const ContactDetail = ({ enquiryDetails }: { enquiryDetails: any }) => {
    return (
        <Card className="!bg-[#F7A619]/5 border-[#F7A619]/30 !py-6">
            <div className="pb-3">
                <div className="flex items-center gap-2 text-[#F7A619] font-bold">
                    <User className="h-4 w-4" />
                    Your Contact Details
                </div>
            </div>
            <div className="space-y-3">
                <div>
                    <label className="text-xs text-[#8c8c8c]">
                        Person making this enquiry
                    </label>
                    <p className="text-sm text-[#262626] mt-1">
                        {enquiryDetails?.contactPersonName}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-[#8c8c8c]">Role</label>
                        <p className="text-sm text-[#262626] mt-1">
                            {enquiryDetails?.role}
                        </p>
                    </div>
                    <div>
                        <label className="text-xs text-[#8c8c8c]">Email</label>
                        <p className="text-sm text-[#262626] mt-1 flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-[#F7A619]" />
                            {enquiryDetails?.email}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
