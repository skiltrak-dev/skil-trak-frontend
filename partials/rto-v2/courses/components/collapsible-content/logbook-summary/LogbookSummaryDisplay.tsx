import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import {
    ArrowRight,
    CheckCircle2,
    Eye,
    FileCheck,
    Info,
    Sparkles,
} from 'lucide-react'
import React from 'react'

export const LogbookSummaryDisplay = ({ course }: any) => {
    const rtoLogbookSummary = course.rtoCourseFiles.map(
        (logbook: any) =>
            logbook?.rtoLogbookSummary?.length > 0 &&
            logbook?.rtoLogbookSummary?.map((summary: any) => summary)
    )

    return (
        <div>
            <div className="flex items-center gap-2 mb-4 px-4">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-accent" />
                </div>
                <h3 className="font-semibold text-base">
                    Auto-Extracted Logbook Summary
                </h3>
                <Badge className={`ml-auto`}>Uploaded</Badge>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/30 p-5 space-y-4">
                {/* Summary Header Info */}
                <div className="grid grid-cols-4 gap-4 pb-4 border-b border-accent/20">
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">
                            Student
                        </p>
                        <p className="font-semibold text-sm">student</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">
                            Placement Site
                        </p>
                        <p className="font-semibold text-sm">site</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">
                            Date Range
                        </p>
                        <p className="font-semibold text-sm">date range</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">
                            Total Hours
                        </p>
                        <p className="font-semibold text-sm">hours</p>
                    </div>
                </div>

                {/* Key Activities */}
                <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                        Key Activities
                    </p>
                    <ul className="space-y-1.5">
                        {/* {logbookSummaries[course.id].keyActivities.map((activity: string, index: number) => ( */}
                        <li className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span>activity</span>
                        </li>
                        {/* ))} */}
                    </ul>
                </div>

                {/* Supervisor Info */}
                <div className="pt-2 border-t border-accent/20">
                    <p className="text-xs text-muted-foreground mb-1">
                        Supervised By
                    </p>
                    <p className="text-sm font-semibold">supervisor</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-accent/20">
                    <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 h-9"
                        onClick={(e) => {
                            e.stopPropagation()
                            // setShowLogbookPDF(course.id);
                        }}
                    >
                        <Eye className="h-3.5 w-3.5" />
                        View Original
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 h-9"
                        onClick={(e) => {
                            e.stopPropagation()
                            // Append summary to RTO requirements
                        }}
                    >
                        <ArrowRight className="h-3.5 w-3.5" />
                        Append to RTO Requirements
                    </Button>

                    <Button
                        size="sm"
                        className="gap-2 h-9 bg-accent hover:bg-accent/90 ml-auto"
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <FileCheck className="h-3.5 w-3.5" />
                        Generate Assessment Form
                    </Button>
                </div>

                {/* Info Message */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        <strong className="text-accent">Next Steps:</strong>{' '}
                        Review the extracted summary, append it to RTO
                        requirements if needed, then generate the assessment
                        form with three sections for Student, Industry
                        Supervisor, and RTO Assessor completion with e-sign
                        capabilities.
                    </p>
                </div>
            </div>
        </div>
    )
}
