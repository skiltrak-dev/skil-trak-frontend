import { Badge } from '@components/ui/badge'
import { Progress } from '@components/ui/progress'
import { RtoV2Api } from '@queries'
import { CheckCircle2, Clock, FileText, Target } from 'lucide-react'
import React from 'react'
import { PulseLoader } from 'react-spinners'

export const CourseHeaderStats = ({ course }: any) => {
    const setupConfirmationPercentage =
        RtoV2Api.Courses.setupConfirmationPercentage(course?.id, {
            skip: !course?.id,
        })

    console.log({ setupConfirmationPercentage })

    const getCompletionColor = (progress: number) => {
        if (progress >= 80) return 'text-success'
        if (progress >= 50) return 'text-warning'
        return 'text-destructive'
    }

    const filesUploaded = course?.rtoCourseFiles?.length || 0
    return (
        <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-100/50 rounded-lg p-3 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs">Placement Hours</span>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className={`text-lg font-semibold  text-success`}>
                        {course?.extraHours && course?.extraHours?.length > 0
                            ? course?.extraHours?.[0]?.hours
                            : course?.hours ?? 0}
                    </span>
                    <span className="text-xs text-muted-foreground">hours</span>
                </div>
                {course?.hours !== null && (
                    <Badge
                        variant="outline"
                        className="mt-1 text-[10px] h-5 px-1.5 bg-success/10 text-success border-success/20"
                    >
                        <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                        Confirmed
                    </Badge>
                )}
            </div>

            <div className="bg-gray-100/50 rounded-lg p-3 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <FileText className="h-3.5 w-3.5" />
                    <span className="text-xs">Documents</span>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-lg font-semibold">
                        {filesUploaded}
                    </span>
                    <span className="text-xs text-muted-foreground">/ 3</span>
                </div>
                <div className="mt-1">
                    <Progress
                        // value={([
                        //     course.documents.facilityChecklist.uploaded,
                        //     course.documents.placementAgreement.uploaded,
                        //     course.documents.logbookWorkbook.uploaded
                        // ].filter(Boolean).length / 3) * 100}
                        value={(filesUploaded / 3) * 100}
                        className="h-1.5"
                    />
                </div>
            </div>

            <div className="bg-gray-100/50 rounded-lg p-3 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Target className="h-3.5 w-3.5" />
                    <span className="text-xs">Setup Progress</span>
                </div>
                <div className="flex items-baseline gap-1">
                    <span
                        className={`text-lg font-semibold ${getCompletionColor(
                            20
                        )}`}
                    >
                        {/* {currentProgress} */}
                        {setupConfirmationPercentage?.isLoading ? (
                            <PulseLoader size={5} color={'#044866'} />
                        ) : (
                            setupConfirmationPercentage?.data ?? 0
                        )}
                    </span>
                    <span className="text-xs text-muted-foreground">%</span>
                </div>
                <div className="mt-1">
                    <Progress
                        // value={currentProgress}
                        value={20}
                        className="h-1.5"
                    />
                </div>
            </div>
        </div>
    )
}
