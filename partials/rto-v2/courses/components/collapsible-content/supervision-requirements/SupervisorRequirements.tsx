"use client";

import { ShowErrorNotifications } from '@components';
import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import { useNotification } from '@hooks';
import { RtoV2Api } from '@queries';
import { Edit, Save, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SupervisorRequirementsProps {
    course: any;
}

export const SupervisorRequirements: React.FC<SupervisorRequirementsProps> = ({ course }) => {
    const { notification } = useNotification();

    const [updateSupervisorReq, updateSupervisorReqResult] = RtoV2Api.Courses.useUpdateSupervisorRequirements();

    const qualification =
        course?.rtoSupervisorQualification?.[0]?.qualification
        || course?.sector?.supervisors?.[0]?.qualification
        || "";

    const [isEditing, setIsEditing] = useState(false);
    const [supervisionQualifications, setSupervisionQualifications] = useState<string>(qualification);

    // Sync state when course changes
    useEffect(() => {
        setSupervisionQualifications(qualification);
    }, [course]);

    // Notifications
    useEffect(() => {
        if (updateSupervisorReqResult.isSuccess) {
            notification.success({
                title: 'Supervisor requirements updated',
                description: 'Supervisor requirements updated successfully',
            });
            setIsEditing(false);
        }
    }, [updateSupervisorReqResult.isSuccess]);

    const handleSave = async () => {
        if (!supervisionQualifications.trim()) return;

        await updateSupervisorReq({
            course: course.id,
            qualification: supervisionQualifications.trim(),
        });
    };

    return (
        <>
            <ShowErrorNotifications result={updateSupervisorReqResult} />

            <div className="mx-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-sky-950/10 flex items-center justify-center">
                        <UserCheck className="h-4 w-4 text-sky-900" />
                    </div>
                    <h3 className="font-semibold text-base">Supervision Requirements</h3>
                </div>

                <div className="bg-gradient-to-br from-secondaryNew/5 to-secondaryNew/10 rounded-xl p-5 border border-secondaryNew/20">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-500">Minimum Qualifications</label>

                        {isEditing ? (
                            <div className="space-y-3">
                                <Textarea
                                    value={supervisionQualifications}
                                    onChange={(e) => setSupervisionQualifications(e.target.value)}
                                    placeholder="e.g., Certificate IV in Ageing Support, Disability, or Individual Support"
                                    className="min-h-[80px] bg-[#fafbfc]/50"
                                />

                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        onClick={handleSave}
                                        className="bg-success hover:bg-success/90 flex items-center gap-1"
                                        disabled={updateSupervisorReqResult.isLoading || !supervisionQualifications.trim()}
                                    >
                                        <Save className="h-3.5 w-3.5" />
                                        {updateSupervisorReqResult.isLoading ? "Saving..." : "Save"}
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            setSupervisionQualifications(qualification);
                                            setIsEditing(false);
                                        }}
                                        disabled={updateSupervisorReqResult.isLoading}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start justify-between gap-3">
                                <p className="text-sm text-slate-800 flex-1 bg-[#fafbfc]/30 rounded-lg p-3 border border-secondaryNew/10">
                                    {supervisionQualifications || <span className="text-muted-foreground">Not specified</span>}
                                </p>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setIsEditing(true)}
                                    className="gap-2 shrink-0 flex items-center"
                                >
                                    <Edit className="h-3.5 w-3.5" />
                                    Edit
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
