import { Badge, Card } from '@components'
import { RtoV2Api } from '@queries'
import { Industry } from '@types'
import { CheckCircle2, FileCheck } from 'lucide-react'
import React from 'react'

export const HighlightedTasks = ({
    coursesId,
    industry,
}: {
    coursesId: number
    industry: Industry
}) => {
    const highlightedTasks = RtoV2Api.ApprovalRequest.highlightedTasks(
        Number(coursesId),
        {
            skip: !coursesId,
        }
    )

    console.log({
        highlightedTasks,
    })

    const getColorClasses = (color: string) => {
        const colors: Record<
            string,
            { bg: string; text: string; border: string; badge: string }
        > = {
            emerald: {
                bg: 'bg-emerald-50',
                text: 'text-emerald-700',
                border: 'border-emerald-200',
                badge: 'bg-emerald-100 text-emerald-700',
            },
            blue: {
                bg: 'bg-blue-50',
                text: 'text-blue-700',
                border: 'border-blue-200',
                badge: 'bg-blue-100 text-blue-700',
            },
            purple: {
                bg: 'bg-purple-50',
                text: 'text-purple-700',
                border: 'border-purple-200',
                badge: 'bg-purple-100 text-purple-700',
            },
        }
        return colors[color]
    }

    const colors = getColorClasses('emerald')

    return (
        <Card
            className={`border-2 ${colors.border} hover:shadow-lg transition-all`}
        >
            <div>
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                        <div
                            className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                        >
                            <FileCheck className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex-1">
                            <div className="text-slate-900 mb-2">
                                Highlighted Tasks
                            </div>
                            <Badge
                                Icon={CheckCircle2}
                                text="Signed & Complete"
                                className={colors.badge}
                            ></Badge>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                {highlightedTasks?.data?.[0].length > 0 && (
                    <div className="space-y-2.5">
                        {highlightedTasks?.data?.[0]?.map(
                            (item: string, itemIndex: number) => (
                                <div
                                    key={itemIndex}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2
                                        className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`}
                                    />
                                    <span className="text-sm text-slate-700">
                                        {item}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                )}

                <div
                    className={`${colors.bg} p-4 rounded-lg border ${
                        colors.border
                    } ${highlightedTasks?.data?.[0]?.length > 0 ? 'mt-4' : ''}`}
                >
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div>
                            <div className="text-xs text-slate-600 mb-1">
                                Signed By
                            </div>
                            <div className={colors.text}>
                                {industry?.contactPerson || '---'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* {checklist.hasDocument && (
                    <div className="mt-4 p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border-2 border-slate-200 hover:border-[#044866]/30 hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                    <FileText className="w-6 h-6 text-slate-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-slate-900 truncate mb-1">
                                        {checklist.documentName}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">
                                            PDF
                                        </span>
                                        <span>Available for review</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <Button outline variant="primaryNew">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    View
                                </Button>
                                <Button variant="primaryNew">
                                    <Download className="w-3.5 h-3.5" />
                                    Download
                                </Button>
                            </div>
                        </div>
                    </div>
                )} */}
            </div>
        </Card>
    )
}
