import React from 'react'
import { LinkIcon, Mail } from 'lucide-react'
import { Button, Card, Typography } from '@components'
import { Industry } from '@types'

export const AttachedIndustryDetail = ({
    industry,
}: {
    industry: Industry
}) => {
    return (
        <Card className="!bg-secondary border border-[#0D5468]/30">
            <div className="pb-3">
                <Typography
                    variant="h4"
                    className="flex items-center gap-2 text-[#0D5468]"
                >
                    <LinkIcon className="h-4 w-4" />
                    Matched Industry Partner
                </Typography>
            </div>
            <div className="space-y-3">
                <div>
                    <Typography variant="small" className="text-[#8c8c8c]">
                        Company Name
                    </Typography>
                    <p className="text-sm text-[#262626] mt-1">
                        {industry?.user?.name}
                    </p>
                </div>
                <div>
                    <Typography variant="small" className="text-[#8c8c8c]">
                        Contact Email
                    </Typography>
                    <p className="text-sm text-[#262626] mt-1 flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-[#0D5468]" />
                        {industry?.user?.email}
                    </p>
                </div>
                <div className="pt-2">
                    <Button
                        variant="primaryNew"
                        text="Send Update Email"
                        Icon={Mail}
                        fullWidth
                    />
                </div>
            </div>
        </Card>
    )
}
