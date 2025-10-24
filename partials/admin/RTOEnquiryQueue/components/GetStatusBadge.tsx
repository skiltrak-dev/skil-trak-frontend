import { Badge } from '@components'
import { CheckCircle, Clock, Send, XCircle } from 'lucide-react'

export const GetStatusBadge = ({ status }: { status: string }) => {
    const config: Record<
        string,
        { color: string; label: string; icon: any; variant: any }
    > = {
        pending: {
            color: '#F7A619',
            label: 'New',
            icon: Clock,
            variant: 'primary',
        },
        inProgress: {
            color: '#0D5468',
            label: 'In Progress',
            icon: Send,
            variant: 'primaryNew',
        },
        matched: {
            color: '#52c41a',
            label: 'Matched',
            icon: CheckCircle,
            variant: 'info',
        },
        closed: {
            color: '#8c8c8c',
            label: 'Closed',
            icon: XCircle,
            variant: 'error',
        },
    }

    const s = config[status] || config.pending
    const Icon = () => <s.icon size={11} />

    return (
        <Badge
            text={s.label}
            variant={s?.variant}
            Icon={Icon}
            className="gap-1 text-[#8c8c8c] w-fit"
        />
    )
}
