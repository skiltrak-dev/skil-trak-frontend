import { Badge, Button, Card, NoData } from '@components'
import { DocumentsView } from '@hooks'
import { RtoV2Api } from '@queries'
import { ellipsisText } from '@utils'
import {
    CheckCircle2,
    ClipboardCheck,
    Download,
    ExternalLink,
    FileText,
} from 'lucide-react'
import React from 'react'

export const RtoChecklistDetail = ({ coursesId }: { coursesId: number }) => {
    const getRtoCourseChecklist =
        RtoV2Api.ApprovalRequest.getRtoCourseChecklist(coursesId)

    const { documentsViewModal, onFileClicked } = DocumentsView()

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

    const colors = getColorClasses('purple')

    return (
        <>
            {documentsViewModal}
            <Card
                className={`border-2 ${colors.border} hover:shadow-lg transition-all`}
            >
                <div>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                            <div
                                className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                            >
                                <ClipboardCheck
                                    className={`w-5 h-5 ${colors.text}`}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="text-slate-900 mb-2">
                                    RTO Facility Checklist
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    {getRtoCourseChecklist?.isError ? (
                        <NoData
                            isError
                            simple
                            text="There is some technical issue!"
                        />
                    ) : null}
                    {getRtoCourseChecklist?.isSuccess && (
                        <div className="space-y-2.5">
                            {[
                                'Confirmed suitable physical environment',
                                'Verified access to required client groups',
                                'Confirmed ability to provide mandated tasks',
                                'Verified supervision arrangements meet RTO requirements',
                                'Confirmed understanding of placement expectations',
                                'Agreed to RTO monitoring processes',
                            ].map((item, itemIndex) => (
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
                            ))}
                        </div>
                    )}

                    {getRtoCourseChecklist?.data?.files &&
                    getRtoCourseChecklist?.data?.files?.length > 0 ? (
                        <div className="mt-4 p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border-2 border-slate-200 hover:border-[#044866]/30 hover:shadow-md transition-all group">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                        <FileText className="w-6 h-6 text-slate-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm text-slate-900 truncate mb-1">
                                            {ellipsisText(
                                                getRtoCourseChecklist?.data
                                                    ?.files?.[0],
                                                30
                                            )}
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
                                    <Button
                                        outline
                                        variant="primaryNew"
                                        onClick={() => {
                                            const extension =
                                                getRtoCourseChecklist.data?.files?.[0]
                                                    ?.split('.')
                                                    ?.pop()
                                                    ?.split('?')[0]

                                            // For DOCX files, open in Google Docs viewer
                                            if (
                                                extension === 'docx' ||
                                                extension === 'doc'
                                            ) {
                                                const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
                                                    getRtoCourseChecklist.data
                                                        ?.files?.[0]
                                                )}&embedded=true`
                                                window.open(viewerUrl, '_blank')
                                            } else {
                                                onFileClicked({
                                                    file: getRtoCourseChecklist
                                                        ?.data?.files?.[0],
                                                    extension:
                                                        getRtoCourseChecklist
                                                            ?.data?.files?.[0]
                                                            ? getRtoCourseChecklist.data?.files?.[0]
                                                                  ?.split('.')
                                                                  ?.pop()
                                                                  ?.split(
                                                                      '?'
                                                                  )[0]
                                                            : undefined,
                                                    type: 'all',
                                                })
                                            }
                                        }}
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        View
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : getRtoCourseChecklist?.isSuccess ? (
                        <NoData simple text="No RTO Facility Checklist found" />
                    ) : null}
                </div>
            </Card>
        </>
    )
}
