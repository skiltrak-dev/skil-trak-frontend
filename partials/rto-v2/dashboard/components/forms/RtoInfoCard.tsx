import { Badge, Typography } from '@components'
import { Rto } from '@types'
import classNames from 'classnames'
import { Building2 } from 'lucide-react'
import React from 'react'

export const RtoInfoCard = ({
    rto,
    variant,
}: {
    variant?: 'primaryNew' | 'primary' | 'success'
    rto: Rto
}) => {
   
    const iconClasses = classNames({
        'h-8 w-8 rounded-lg bg-primaryNew/10 flex items-center justify-center text-primaryNew':
            true,
        '!bg-primary/10 !text-primary': variant === 'primary',
        '!bg-success/10 !text-primarySuccess': variant === 'success',
    })
    return (
        <div className="relative overflow-hidden rounded-xl border border-border/50 ">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primaryNew/5 rounded-bl-full"></div>
            <div className="relative p-4">
                <div className="flex justify-between items-center gap-2 mb-3">
                    <div className="flex items-center gap-2">
                        <div className={iconClasses}>
                            <Building2 className="h-4 w-4 " />
                        </div>
                        <h3 className="font-semibold text-sm">
                            RTO Information
                        </h3>
                    </div>
                    <Badge text="Pre-filled" variant={variant} shape="pill" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                        <Typography variant="small" color="text-gray-600">
                            RTO Name
                        </Typography>
                        <div className="px-3 py-2 bg-gray-100 rounded-lg border border-border/50 text-sm font-medium">
                            {rto?.user?.name}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Typography variant="small" color="text-gray-600">
                            RTO Code
                        </Typography>

                        <div className="px-3 py-2 bg-gray-100 rounded-lg border border-border/50 text-sm font-medium">
                            {rto?.rtoCode}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Typography variant="small" color="text-gray-600">
                            Phone
                        </Typography>
                        <div className="px-3 py-2 bg-gray-100 rounded-lg border border-border/50 text-sm font-medium">
                            {rto?.phone}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
