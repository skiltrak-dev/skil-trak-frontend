import { Button, Card, Typography } from '@components'
import { Plus } from 'lucide-react'
import { EvidenceChip } from './EvidenceChip'

export interface Evidence {
    id: string
    type: any
    label: string
    date: string
    enteredBy?: string
    content?: string
    metadata?: {
        person?: string
        timestamp?: string
    }
}

export interface AIStatus {
    summary: string
    status: string
    blockers: string[]
    nextActions: string[]
    owner: string
    keyDates: {
        label: string
        value: string
    }[]
    evidence: Evidence[]
}

interface AIStatusCardProps {
    status?: AIStatus
    isLoading?: boolean
    isEmpty?: boolean
    hasConflict?: boolean
    conflictMessage?: string
    onEvidenceClick?: (evidence: Evidence) => void
    onAddNote?: () => void
}

export function AIStatusCard({
    status,
    isLoading = false,
    isEmpty = false,
    hasConflict = false,
    conflictMessage,
    onEvidenceClick,
    onAddNote,
}: AIStatusCardProps) {
    if (isLoading) {
        return (
            <Card className="rounded-xl shadow-sm">
                <div>
                    <Typography>AI Student Status</Typography>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        {/* <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[90%]" />
                        <Skeleton className="h-4 w-[85%]" /> */}
                    </div>
                    <div className="space-y-3">
                        {/* <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-6 w-36" /> */}
                    </div>
                    <div className="flex gap-2">
                        {/* <Skeleton className="h-7 w-32" />
                        <Skeleton className="h-7 w-36" />
                        <Skeleton className="h-7 w-28" /> */}
                    </div>
                </div>
            </Card>
        )
    }

    if (isEmpty || !status) {
        return (
            <Card className="rounded-xl shadow-sm">
                <div>
                    <Typography>AI Student Status</Typography>
                </div>
                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        No recent activity found—add a note or contact the host.
                    </p>
                    <Button onClick={onAddNote} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Note
                    </Button>
                </div>
            </Card>
        )
    }

    return (
        <Card className="rounded-xl shadow-sm">
            <div>
                <Typography>AI Student Status</Typography>
            </div>
            <div className="space-y-6">
                {/* Conflict Banner */}
                {/* {hasConflict && (
                    <Alert variant="destructive" className="border-l-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{conflictMessage}</AlertDescription>
                    </Alert>
                )} */}

                {/* Summary */}
                <div className="space-y-3">
                    <p className="leading-relaxed">{status.summary}</p>
                </div>

                {/* Detailed Info */}
                <div className="space-y-4 rounded-lg bg-muted/30 p-4">
                    {/* Status */}
                    <div className="flex gap-3">
                        <span className="min-w-[120px] text-muted-foreground">
                            Status:
                        </span>
                        <span>{status.status}</span>
                    </div>

                    {/* Blockers */}
                    {status.blockers.length > 0 && (
                        <div className="flex gap-3">
                            <span className="min-w-[120px] text-muted-foreground">
                                Blockers:
                            </span>
                            <ul className="flex-1 space-y-1">
                                {status.blockers.map((blocker, idx) => (
                                    <li key={idx}>• {blocker}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Next Actions */}
                    {status.nextActions.length > 0 && (
                        <div className="flex gap-3">
                            <span className="min-w-[120px] text-muted-foreground">
                                Next actions:
                            </span>
                            <ul className="flex-1 space-y-1">
                                {status.nextActions.map((action, idx) => (
                                    <li key={idx}>• {action}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Owner */}
                    <div className="flex gap-3">
                        <span className="min-w-[120px] text-muted-foreground">
                            Owner:
                        </span>
                        <span>{status.owner}</span>
                    </div>

                    {/* Key Dates */}
                    {status.keyDates.length > 0 && (
                        <div className="flex gap-3">
                            <span className="min-w-[120px] text-muted-foreground">
                                Key dates:
                            </span>
                            <ul className="flex-1 space-y-1">
                                {status.keyDates.map((date, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            fontVariantNumeric: 'tabular-nums',
                                        }}
                                    >
                                        • {date.label}: {date.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Evidence Chips */}
                {status.evidence.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="text-sm text-muted-foreground">
                            Evidence
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {status.evidence.map((evidence) => (
                                <EvidenceChip key={evidence.id} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}
