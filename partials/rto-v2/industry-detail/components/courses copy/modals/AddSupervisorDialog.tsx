import { Button, TextArea, TextInput } from '@components'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { useState } from 'react'

import { Award, Briefcase, Sparkles, UserCheck } from 'lucide-react'
import { Course } from '../types'

interface AddSupervisorDialogProps {
    open: boolean
    course: Course | null
    sectorId: number | null
    onOpenChange: (open: boolean) => void
    onAddSupervisor: (
        courseId: number,
        sectorId: number,
        supervisor: {
            name: string
            title: string
            role: string
            experience: number
            description: string
            phone: string
            email: string
        }
    ) => void
}

export function AddSupervisorDialog({
    open,
    course,
    sectorId,
    onOpenChange,
    onAddSupervisor,
}: AddSupervisorDialogProps) {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        role: '',
        experience: '',
        description: '',
        phone: '',
        email: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!course || !sectorId) return

        onAddSupervisor(course.id, sectorId, {
            ...formData,
            experience: parseInt(formData.experience) || 0,
        })

        // Reset form
        setFormData({
            name: '',
            title: '',
            role: '',
            experience: '',
            description: '',
            phone: '',
            email: '',
        })

        onOpenChange(false)
    }

    if (!course) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center relative">
                            <UserCheck className="w-6 h-6 text-white" />
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#F7A619] rounded-full flex items-center justify-center">
                                <Sparkles className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div>
                            <DialogTitle className="text-lg">
                                Add Supervisor Details
                            </DialogTitle>
                            <DialogDescription className="text-xs">
                                {course.code} - {course.name}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* Success Banner */}
                <div className="bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-[#10B981] mb-1">
                                🎉 Facility Checklist Approved!
                            </h4>
                            <p className="text-xs text-[#059669]">
                                Great job! The facility checklist has been
                                approved. Now let's add a supervisor to complete
                                the course setup and turn it green.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Personal Information */}
                    <div className="bg-[#F8FAFB] rounded-lg p-4 border border-[#E2E8F0] space-y-3">
                        <h4 className="text-sm font-bold text-[#1A2332] flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-[#044866]" />
                            Personal Information
                        </h4>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <TextInput
                                    name="name"
                                    label={'Full Name'}
                                    value={formData.name}
                                    onChange={(e: any) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="e.g., Sarah Johnson"
                                    className="text-xs h-9"
                                />
                            </div>

                            <div>
                                <TextInput
                                    name="role"
                                    label={'Role/Position'}
                                    required
                                    value={formData.role}
                                    onChange={(e: any) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value,
                                        })
                                    }
                                    placeholder="e.g., Senior Manager"
                                    className="text-xs h-9"
                                />
                            </div>

                            <div>
                                <TextInput
                                    name="experience"
                                    label={'Years of Experience'}
                                    required
                                    type="number"
                                    value={formData.experience}
                                    onChange={(e: any) =>
                                        setFormData({
                                            ...formData,
                                            experience: e.target.value,
                                        })
                                    }
                                    placeholder="e.g., 12"
                                    min="0"
                                    className="text-xs h-9"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Qualifications */}
                    <div className="bg-[#F8FAFB] rounded-lg p-4 border border-[#E2E8F0] space-y-3">
                        <h4 className="text-sm font-bold text-[#1A2332] flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#044866]" />
                            Qualifications
                        </h4>

                        <div>
                            <TextInput
                                name="title"
                                label={'Qualifications/Certifications'}
                                required
                                value={formData.title}
                                onChange={(e: any) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                placeholder="e.g., Registered Nurse, Bachelor of Nursing"
                                className="text-xs h-9"
                            />
                        </div>

                        <div>
                            <TextArea
                                name="description"
                                label={'Professional Background'}
                                required
                                value={formData.description}
                                onChange={(e: any) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Describe expertise, specializations, and experience in student mentoring..."
                                rows={3}
                                className="text-xs resize-none"
                            />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-[#F8FAFB] rounded-lg p-4 border border-[#E2E8F0] space-y-3">
                        <h4 className="text-sm font-bold text-[#1A2332] flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-[#044866]" />
                            Contact Information
                        </h4>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <TextInput
                                    name="email"
                                    label={'Email Address'}
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e: any) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    placeholder="supervisor@company.com.au"
                                    className="text-xs h-9"
                                />
                            </div>

                            <div>
                                <TextInput
                                    name="phone"
                                    label={'Phone Number'}
                                    required
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e: any) =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                        })
                                    }
                                    placeholder="+61 2 9876 5432"
                                    className="text-xs h-9"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                        <Button
                            variant="secondary"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 h-10"
                        >
                            Skip for Now
                        </Button>
                        <Button
                            submit
                            className="flex-1 bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white gap-2 h-10"
                        >
                            <UserCheck className="w-4 h-4" />
                            Add Supervisor & Complete Setup
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
