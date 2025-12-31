import { useState } from 'react'
import { X, Calendar, Clock, MapPin, User, FileText } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@components/ui/dialog'
import { Button, TextArea, TextInput, Typography } from '@components'
import { OptionType } from '@types'
import { Select } from '@components'
interface NewAppointmentModalProps {
    isOpen: boolean
    onClose: () => void
}

const appointmentTypeOptions: OptionType[] = [
    { label: 'Interview', value: 'interview' },
    { label: 'Site Visit', value: 'site-visit' },
    { label: 'Training', value: 'training' },
    { label: 'Meeting', value: 'meeting' },
]

export function NewAppointmentModal({
    isOpen,
    onClose,
}: NewAppointmentModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        type: 'meeting',
        date: '',
        time: '',
        location: '',
        description: '',
        attendees: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log('New appointment:', formData)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-[#1A2332]">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-lg flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-white" />
                        </div>
                        Create New Appointment
                    </DialogTitle>
                    <DialogDescription>
                        Schedule a new meeting, interview, training session, or
                        site visit
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                        <TextInput
                            label={'Title'}
                            name="title"
                            placeholder="e.g., Student Placement Interview"
                            value={formData.title}
                            onChange={(e: any) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    {/* Type and Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Select
                                label={'Type *'}
                                name="type"
                                options={appointmentTypeOptions}
                                value={formData.type}
                                onChange={(e: OptionType) =>
                                    setFormData({
                                        ...formData,
                                        type: e.value as string,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <TextInput
                                label={'Date *'}
                                name="date"
                                placeholder="Select Date"
                                value={formData.date}
                                onChange={(e: any) =>
                                    setFormData({
                                        ...formData,
                                        date: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* Time and Location */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <TextInput
                                label={'Time *'}
                                name="time"
                                placeholder="Select Time"
                                value={formData.time}
                                onChange={(e: any) =>
                                    setFormData({
                                        ...formData,
                                        time: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <TextInput
                                label={'Location *'}
                                name="location"
                                placeholder="e.g., Head Office - Meeting Room 2"
                                value={formData.location}
                                onChange={(e: any) =>
                                    setFormData({
                                        ...formData,
                                        location: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* Attendees */}
                    <div className="space-y-2">
                        <TextInput
                            label={'Attendees'}
                            name="attendees"
                            placeholder="Comma-separated names"
                            value={formData.attendees}
                            onChange={(e: any) =>
                                setFormData({
                                    ...formData,
                                    attendees: e.target.value,
                                })
                            }
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <TextArea
                            label={'Description'}
                            name="description"
                            placeholder="Additional details about the appointment..."
                            value={formData.description}
                            onChange={(e: any) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            rows={3}
                            className="border-[#E2E8F0] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20 resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            className="px-4 py-2 border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFB]"
                        >
                            Cancel
                        </Button>
                        <Button
                            submit
                            variant="primaryNew"
                            className="px-4 py-2 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white hover:shadow-lg transition-all"
                        >
                            Create Appointment
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
