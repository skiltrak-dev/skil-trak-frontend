import { Typography } from '@components'
import { ReactNode } from 'react'

export const CancelledWorkplaceCardDetail = ({
    title,
    Icon,
    iconColor,
    detail,
    children,
}: {
    iconColor: string
    title: string
    Icon: any
    detail?: string
    children?: ReactNode
}) => {
    return (
        <div className="flex">
            <Icon className={`mr-3 ${iconColor}`} size={20} />
            <div>
                <Typography variant="small" color="text-gray-700" semibold>
                    {title}
                </Typography>
                <Typography variant="muted" color="text-gray-500">
                    {(children || detail) ?? 'N/A'}
                </Typography>
            </div>
        </div>
    )
}
