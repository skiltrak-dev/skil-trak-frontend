import { Card } from '@components'
import { ReactNode } from 'react'

export const InfoCard = ({
    title,
    description,
    Icon,
    StatusIcon,
}: {
    Icon: any
    title: string
    description: ReactNode | string
    StatusIcon?: any
}) => {
    return (
        <Card className="border-2 border-border/60 shadow-md hover:shadow-lg transition-all hover-lift">
            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primaryNew/10 to-primaryNew/5 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primaryNew" />
                    </div>

                    {StatusIcon && (
                        <StatusIcon className="h-5 w-5 text-success" />
                    )}
                </div>
                <p className="text-xs text-muted-foreground mb-1">{title}</p>
                <div className="text-2xl font-bold text-foreground">
                    {description}
                </div>
            </div>
        </Card>
    )
}
