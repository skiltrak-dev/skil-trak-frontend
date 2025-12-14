import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    X,
    User,
    Mail,
    Phone,
    Edit2,
    Save,
    Briefcase,
    FileText,
    Building,
} from 'lucide-react'
import { Button, TextInput, Select, TextArea } from '@components'

interface ContactBiographyModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ContactBiographyModal({
    isOpen,
    onClose,
}: ContactBiographyModalProps) {
    const [isEditingPrimary, setIsEditingPrimary] = useState(false)
    const [isEditingSecondary, setIsEditingSecondary] = useState(false)
    const [workplaceType, setWorkplaceType] = useState('Office-based')
    const [isEditingWorkplaceType, setIsEditingWorkplaceType] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const [primaryContact, setPrimaryContact] = useState({
        name: 'Sarah Mitchell',
        designation: 'Operations Manager',
        email: 'sarah.mitchell@techcorp.com.au',
        phone: '+61 2 9876 5432',
    })

    const [secondaryContact, setSecondaryContact] = useState({
        name: 'Michael Thompson',
        designation: 'HR Coordinator',
        email: 'michael.thompson@techcorp.com.au',
        phone: '+61 2 9876 5433',
    })

    const [bio, setBio] = useState(
        'TechCorp Solutions is a leading technology company specializing in innovative software development and IT consulting services. With over 15 years of industry experience, we pride ourselves on delivering cutting-edge solutions to our clients across Australia. Our team of expert professionals is dedicated to fostering a collaborative learning environment, making us an ideal partner for student placements and professional development programs. We offer comprehensive mentorship, hands-on experience with the latest technologies, and a supportive workplace culture that encourages growth and innovation.'
    )

    const workplaceTypes = [
        { label: 'Office-based', value: 'Office-based' },
        { label: 'Remote', value: 'Remote' },
        { label: 'Hybrid', value: 'Hybrid' },
        { label: 'On-site', value: 'On-site' },
        { label: 'Flexible', value: 'Flexible' },
        { label: 'Field-based', value: 'Field-based' },
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                        onClick={(e: any) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] px-6 py-5 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
                            </div>
                            <div className="relative">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h2 className="text-white text-xl font-bold mb-1">
                                            Contact & Biography Information
                                        </h2>
                                        <p className="text-white/80 text-sm">
                                            Manage contact details and company
                                            biography
                                        </p>
                                    </div>
                                    <Button
                                        onClick={onClose}
                                        variant="secondary"
                                        className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all text-white p-0"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Left Column - Contacts */}
                                <div className="space-y-4">
                                    {/* Primary Contact Information */}
                                    <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all">
                                        <div className="bg-[#F8FAFB] border-b border-[#E2E8F0] p-3 flex items-center justify-between">
                                            <h3 className="text-[#1A2332] flex items-center gap-2 text-sm font-medium">
                                                <User className="w-4 h-4 text-[#64748B]" />
                                                Primary Contact
                                            </h3>
                                            {!isEditingPrimary && (
                                                <Button
                                                    onClick={() =>
                                                        setIsEditingPrimary(
                                                            true
                                                        )
                                                    }
                                                    variant="secondary"
                                                    className="text-[#64748B] hover:text-[#044866] transition-colors p-1 h-auto"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="p-3 space-y-2.5">
                                            {isEditingPrimary ? (
                                                <>
                                                    <div>
                                                        <TextInput
                                                            label="Full Name"
                                                            name="primaryName"
                                                            id="primaryName"
                                                            type="text"
                                                            value={
                                                                primaryContact.name
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setPrimaryContact(
                                                                    {
                                                                        ...primaryContact,
                                                                        name: e
                                                                            .target
                                                                            .value,
                                                                    }
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextInput
                                                            label="Designation"
                                                            name="primaryDesignation"
                                                            id="primaryDesignation"
                                                            type="text"
                                                            value={
                                                                primaryContact.designation
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setPrimaryContact(
                                                                    {
                                                                        ...primaryContact,
                                                                        designation:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    }
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextInput
                                                            label="Email"
                                                            name="primaryEmail"
                                                            id="primaryEmail"
                                                            type="email"
                                                            value={
                                                                primaryContact.email
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setPrimaryContact(
                                                                    {
                                                                        ...primaryContact,
                                                                        email: e
                                                                            .target
                                                                            .value,
                                                                    }
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextInput
                                                            label="Phone"
                                                            name="primaryPhone"
                                                            id="primaryPhone"
                                                            type="tel"
                                                            value={
                                                                primaryContact.phone
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setPrimaryContact(
                                                                    {
                                                                        ...primaryContact,
                                                                        phone: e
                                                                            .target
                                                                            .value,
                                                                    }
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 pt-2">
                                                        <Button
                                                            onClick={() =>
                                                                setIsEditingPrimary(
                                                                    false
                                                                )
                                                            }
                                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#044866] hover:bg-[#0D5468] text-white rounded-lg text-sm font-medium transition-all h-auto"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                            Save
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                setIsEditingPrimary(
                                                                    false
                                                                )
                                                            }
                                                            variant="secondary"
                                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] rounded-lg text-sm font-medium transition-all h-auto"
                                                        >
                                                            <X className="w-4 h-4" />
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="space-y-2">
                                                    <div className="flex items-start gap-2 p-2 rounded-lg bg-[#F8FAFB] hover:bg-[#F1F5F9] transition-colors">
                                                        <div className="w-8 h-8 bg-[#E2E8F0] rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <User className="w-4 h-4 text-[#64748B]" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-[#1A2332] text-sm font-medium">
                                                                {
                                                                    primaryContact.name
                                                                }
                                                            </p>
                                                            <p className="text-[#64748B] text-xs">
                                                                {
                                                                    primaryContact.designation
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFB] hover:bg-[#F1F5F9] transition-colors">
                                                        <div className="w-8 h-8 bg-[#E2E8F0] rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <Mail className="w-4 h-4 text-[#64748B]" />
                                                        </div>
                                                        <p className="text-[#1A2332] text-sm font-medium">
                                                            {
                                                                primaryContact.email
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFB] hover:bg-[#F1F5F9] transition-colors">
                                                        <div className="w-8 h-8 bg-[#E2E8F0] rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <Phone className="w-4 h-4 text-[#64748B]" />
                                                        </div>
                                                        <p className="text-[#1A2332] text-sm font-medium">
                                                            {
                                                                primaryContact.phone
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Secondary Contact Information */}
                                    <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all">
                                        <div className="bg-[#F8FAFB] border-b border-[#E2E8F0] p-3 flex items-center justify-between">
                                            <h3 className="text-[#1A2332] flex items-center gap-2 text-sm font-medium">
                                                <User className="w-4 h-4 text-[#64748B]" />
                                                Secondary Contact
                                            </h3>
                                            {!isEditingSecondary && (
                                                <Button
                                                    onClick={() =>
                                                        setIsEditingSecondary(
                                                            true
                                                        )
                                                    }
                                                    variant="secondary"
                                                    className="text-[#64748B] hover:text-[#044866] transition-colors p-1 h-auto"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="p-3 space-y-2.5">
                                            {isEditingSecondary ? (
                                                <>
                                                    <div>
                                                        <TextInput
                                                            label="Full Name"
                                                            name="secondaryName"
                                                            id="secondaryName"
                                                            type="text"
                                                            value={
                                                                secondaryContact.name
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setSecondaryContact(
                                                                    {
                                                                        ...secondaryContact,
                                                                        name: e
                                                                            .target
                                                                            .value,
                                                                    }
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextInput
                                                            label="Designation"
                                                            name="secondaryDesignation"
                                                            id="secondaryDesignation"
                                                            type="text"
                                                            value={
                                                                secondaryContact.designation
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setSecondaryContact(
                                                                    {
                                                                        ...secondaryContact,
                                                                        designation:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    }
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextInput
                                                            label="Email"
                                                            name="secondaryEmail"
                                                            type="email"
                                                            value={
                                                                secondaryContact.email
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setSecondaryContact(
                                                                    {
                                                                        ...secondaryContact,
                                                                        email: e
                                                                            .target
                                                                            .value,
                                                                    }
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextInput
                                                            label="Phone"
                                                            name="secondaryPhone"
                                                            type="tel"
                                                            value={
                                                                secondaryContact.phone
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setSecondaryContact(
                                                                    {
                                                                        ...secondaryContact,
                                                                        phone: e
                                                                            .target
                                                                            .value,
                                                                    }
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 pt-2">
                                                        <Button
                                                            onClick={() =>
                                                                setIsEditingSecondary(
                                                                    false
                                                                )
                                                            }
                                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#044866] hover:bg-[#0D5468] text-white rounded-lg text-sm font-medium transition-all h-auto"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                            Save
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                setIsEditingSecondary(
                                                                    false
                                                                )
                                                            }
                                                            variant="secondary"
                                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] rounded-lg text-sm font-medium transition-all h-auto"
                                                        >
                                                            <X className="w-4 h-4" />
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="space-y-2">
                                                    <div className="flex items-start gap-2 p-2 rounded-lg bg-[#F8FAFB] hover:bg-[#F1F5F9] transition-colors">
                                                        <div className="w-8 h-8 bg-[#E2E8F0] rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <User className="w-4 h-4 text-[#64748B]" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-[#1A2332] text-sm font-medium">
                                                                {
                                                                    secondaryContact.name
                                                                }
                                                            </p>
                                                            <p className="text-[#64748B] text-xs">
                                                                {
                                                                    secondaryContact.designation
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFB] hover:bg-[#F1F5F9] transition-colors">
                                                        <div className="w-8 h-8 bg-[#E2E8F0] rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <Mail className="w-4 h-4 text-[#64748B]" />
                                                        </div>
                                                        <p className="text-[#1A2332] text-sm font-medium">
                                                            {
                                                                secondaryContact.email
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFB] hover:bg-[#F1F5F9] transition-colors">
                                                        <div className="w-8 h-8 bg-[#E2E8F0] rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <Phone className="w-4 h-4 text-[#64748B]" />
                                                        </div>
                                                        <p className="text-[#1A2332] text-sm font-medium">
                                                            {
                                                                secondaryContact.phone
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Workplace Type */}
                                    <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all">
                                        <div className="bg-[#F8FAFB] border-b border-[#E2E8F0] p-3 flex items-center justify-between">
                                            <h3 className="text-[#1A2332] flex items-center gap-2 text-sm font-medium">
                                                <Briefcase className="w-4 h-4 text-[#64748B]" />
                                                Workplace Type
                                            </h3>
                                            {!isEditingWorkplaceType && (
                                                <Button
                                                    onClick={() =>
                                                        setIsEditingWorkplaceType(
                                                            true
                                                        )
                                                    }
                                                    variant="secondary"
                                                    className="text-[#64748B] hover:text-[#044866] transition-colors p-1 h-auto"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="p-3">
                                            {isEditingWorkplaceType ? (
                                                <div className="space-y-2.5">
                                                    <Select
                                                        label="Select Workplace Type"
                                                        name="workplaceType"
                                                        options={workplaceTypes}
                                                        onChange={(
                                                            value: any
                                                        ) =>
                                                            setWorkplaceType(
                                                                value
                                                            )
                                                        }
                                                    />
                                                    <div className="flex gap-2 pt-1">
                                                        <Button
                                                            onClick={() =>
                                                                setIsEditingWorkplaceType(
                                                                    false
                                                                )
                                                            }
                                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#044866] hover:bg-[#0D5468] text-white rounded-lg text-sm font-medium transition-all h-auto"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                            Save
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                setIsEditingWorkplaceType(
                                                                    false
                                                                )
                                                            }
                                                            variant="secondary"
                                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] rounded-lg text-sm font-medium transition-all h-auto"
                                                        >
                                                            <X className="w-4 h-4" />
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <div className="w-10 h-10 bg-[#E2E8F0] rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <Briefcase className="w-5 h-5 text-[#64748B]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#1A2332]">
                                                            {workplaceType}
                                                        </p>
                                                        <p className="text-xs text-[#64748B]">
                                                            Current work
                                                            environment
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Biography */}
                                <div>
                                    <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all h-full">
                                        <div className="bg-[#F8FAFB] border-b border-[#E2E8F0] p-3 flex items-center justify-between">
                                            <h3 className="text-[#1A2332] flex items-center gap-2 text-sm font-medium">
                                                <FileText className="w-4 h-4 text-[#64748B]" />
                                                Industry Biography
                                            </h3>
                                            {!isEditing && (
                                                <Button
                                                    onClick={() =>
                                                        setIsEditing(true)
                                                    }
                                                    variant="secondary"
                                                    className="text-[#64748B] hover:text-[#044866] transition-colors p-1 h-auto"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="p-3">
                                            {isEditing ? (
                                                <div className="space-y-2.5">
                                                    <TextArea
                                                        label="Company Biography"
                                                        name="bio"
                                                        value={bio}
                                                        onChange={(e: any) =>
                                                            setBio(
                                                                e.target.value
                                                            )
                                                        }
                                                        rows={16}
                                                        className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20 resize-none leading-relaxed"
                                                        placeholder="Describe your industry, values, culture, and what makes you a great placement partner..."
                                                    />
                                                    <div className="text-xs text-[#64748B] flex items-center justify-between">
                                                        <span>
                                                            {bio.length}{' '}
                                                            characters
                                                        </span>
                                                        <span>
                                                            Maximum 1000
                                                            characters
                                                            recommended
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2 pt-1">
                                                        <Button
                                                            onClick={() =>
                                                                setIsEditing(
                                                                    false
                                                                )
                                                            }
                                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#044866] hover:bg-[#0D5468] text-white rounded-lg text-sm font-medium transition-all h-auto"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                            Save Changes
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                setIsEditing(
                                                                    false
                                                                )
                                                            }
                                                            variant="secondary"
                                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] rounded-lg text-sm font-medium transition-all h-auto"
                                                        >
                                                            <X className="w-4 h-4" />
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                        <div className="w-10 h-10 bg-[#E2E8F0] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <Building className="w-5 h-5 text-[#64748B]" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm leading-relaxed text-[#1A2332]">
                                                                {bio}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 flex items-center gap-2 text-xs text-[#64748B]">
                                                        <FileText className="w-3 h-3" />
                                                        <span>
                                                            Last updated:{' '}
                                                            {new Date().toLocaleDateString(
                                                                'en-AU',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-[#F8FAFB] border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                            <Button
                                onClick={onClose}
                                className="px-4 py-2 bg-gradient-to-br from-[#044866] to-[#0D5468] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all h-auto"
                            >
                                Done
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
