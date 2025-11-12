import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { CardContent } from '@components/ui/card';
import { CollapsibleContent } from '@components/ui/collapsible';
import { Input } from '@components/ui/input';
import { Separator } from '@components/ui/separator';
import { AlertCircle, CheckCircle2, Clock, Edit, FileText, Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DocumentsSection } from './cards/DocumentsSection';
import { RtoApi } from '@queries';
import { useNotification } from '@hooks';
import { RequiredPlacementHours } from './RequiredPlacementHours';

type LogbookStatus = "uploaded" | "summarized" | "formReady" | "inProgress" | "pendingSign" | "signedLocked";

export const RequiredPlacementDocuments = ({ course }: any) => {
    const [isEditing, setIsEditing] = useState(false)
    const [tempHours, setTempHours] = useState<number | null>(null)

    const { notification } = useNotification()
    const [updateHours, updateHoursResult] = RtoApi.Courses.useUpdateCourseHours()

    // Sync tempHours when course.hours changes
    useEffect(() => {
        setTempHours(course?.hours ?? null)
    }, [course?.hours])

    // Show notifications on success or error
    useEffect(() => {
        if (updateHoursResult.isSuccess) {
            notification.success({
                title: 'Course Hours Updated',
                description: 'Course hours updated successfully',
            })
            setIsEditing(false)
        }
        if (updateHoursResult.isError) {
            notification.error({
                title: 'Update Failed',
                description: 'Failed to update course hours',
            })
        }
    }, [updateHoursResult.isSuccess, updateHoursResult.isError, notification])

    // Handle save button
    const handleSave = () => {
        if (tempHours === null || tempHours < 0) return

        updateHours({
            body: {
                courses: [
                    {
                        course: course?.id,
                        hours: tempHours,
                    },
                ],
            },
        })
    }

    return (
        <div>

            <CollapsibleContent>
                <Separator />
                <CardContent className="p-6 space-y-8">
                    {/* Required Hours */}
                    <RequiredPlacementHours course={course} />

                    {/* Documents */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-primaryNew/10 flex items-center justify-center">
                                <FileText className="h-4 w-4 text-primaryNew" />
                            </div>
                            <h3 className="font-semibold text-base">Required Documents</h3>
                        </div>
                        <DocumentsSection
                            course={course}
                        />
                    </div>
                </CardContent>
            </CollapsibleContent>

            {/* {showAssessmentForm && logbookSummaries[showAssessmentForm] && (
                <LogbookAssessmentForm
                    open={true}
                    onClose={() => setShowAssessmentForm(null)}
                    courseId={showAssessmentForm}
                    courseName={coursesData.find((c: any) => c.id === showAssessmentForm)?.name || ""}
                    logbookSummary={logbookSummaries[showAssessmentForm]}
                    currentRole="student"
                    status={logbookStatus[showAssessmentForm] || "formReady"}
                    onStatusChange={(newStatus) => {
                        setLogbookStatus(prev => ({ ...prev, [showAssessmentForm]: newStatus }));
                    }}
                />
            )} */}
        </div>
    )

}
