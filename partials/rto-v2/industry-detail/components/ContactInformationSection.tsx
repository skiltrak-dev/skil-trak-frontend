import { Briefcase, Edit2, Mail, Phone, Save, User, X } from 'lucide-react'
import { useState } from 'react'
import { Select, Button, TextInput } from '@components'

export function ContactInformationSection() {
    const [isEditingPrimary, setIsEditingPrimary] = useState(false)
    const [isEditingSecondary, setIsEditingSecondary] = useState(false)
    const [workplaceType, setWorkplaceType] = useState('Office-based')
    const [isEditingWorkplaceType, setIsEditingWorkplaceType] = useState(false)

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

    const workplaceTypes = [
        { label: 'Office-based', value: 'Office-based' },
        { label: 'Remote', value: 'Remote' },
        { label: 'Hybrid', value: 'Hybrid' },
        { label: 'On-site', value: 'On-site' },
        { label: 'Flexible', value: 'Flexible' },
        { label: 'Field-based', value: 'Field-based' },
    ]

    return (
        <div className="space-y-3">
            {/* Primary Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all">
                <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-2.5 flex items-center justify-between">
                    <h3 className="text-white flex items-center gap-1.5 text-xs font-medium">
                        <User className="w-3 h-3" />
                        Primary Contact
                    </h3>
                    {!isEditingPrimary && (
                        <Button
                            onClick={() => setIsEditingPrimary(true)}
                            variant="secondary"
                            className="text-white/80 hover:text-white transition-colors p-1 h-auto"
                        >
                            <Edit2 className="w-3 h-3" />
                        </Button>
                    )}
                </div>

                <div className="p-2.5 space-y-2">
                    {isEditingPrimary ? (
                        <>
                            <div>
                                <TextInput
                                    label="Full Name"
                                    name="primaryName"
                                    id="primaryName"
                                    type="text"
                                    value={primaryContact.name}
                                    onChange={(e: any) =>
                                        setPrimaryContact({
                                            ...primaryContact,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full px-2 py-1.5 text-[10px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                />
                            </div>
                            <div>
                                <TextInput
                                    label="Designation"
                                    name="primaryDesignation"
                                    id="primaryDesignation"
                                    type="text"
                                    value={primaryContact.designation}
                                    onChange={(e: any) =>
                                        setPrimaryContact({
                                            ...primaryContact,
                                            designation: e.target.value,
                                        })
                                    }
                                    className="w-full px-2 py-1.5 text-[10px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                />
                            </div>
                            <div>
                                <TextInput
                                    label="Email"
                                    name="primaryEmail"
                                    id="primaryEmail"
                                    type="email"
                                    value={primaryContact.email}
                                    onChange={(e: any) =>
                                        setPrimaryContact({
                                            ...primaryContact,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full px-2 py-1.5 text-[10px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                />
                            </div>
                            <div>
                                <TextInput
                                    label="Phone"
                                    name="primaryPhone"
                                    id="primaryPhone"
                                    type="tel"
                                    value={primaryContact.phone}
                                    onChange={(e: any) =>
                                        setPrimaryContact({
                                            ...primaryContact,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="w-full px-2 py-1.5 text-[10px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]/20"
                                />
                            </div>
                            <div className="flex gap-2 pt-1">
                                <Button
                                    onClick={() => setIsEditingPrimary(false)}
                                    className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 bg-gradient-to-br from-[#10B981] to-[#059669] text-white rounded-lg text-[9px] font-medium hover:shadow-md transition-all h-auto"
                                >
                                    <Save className="w-2.5 h-2.5" />
                                    Save
                                </Button>
                                <Button
                                    onClick={() => setIsEditingPrimary(false)}
                                    variant="secondary"
                                    className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] rounded-lg text-[9px] font-medium transition-all h-auto"
                                >
                                    <X className="w-2.5 h-2.5" />
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-1.5">
                            <div className="flex items-start gap-1.5 p-1.5 rounded-lg bg-[#F8FAFB] hover:bg-[#E8F4F8] transition-colors">
                                <div className="w-5 h-5 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <User className="w-2.5 h-2.5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[#1A2332] text-[10px] font-medium">
                                        {primaryContact.name}
                                    </p>
                                    <p className="text-[#64748B] text-[9px]">
                                        {primaryContact.designation}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#F8FAFB] hover:bg-[#E8F4F8] transition-colors">
                                <div className="w-5 h-5 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-2.5 h-2.5 text-[#044866]" />
                                </div>
                                <p className="text-[#1A2332] text-[10px] font-medium">
                                    {primaryContact.email}
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#F8FAFB] hover:bg-[#E8F4F8] transition-colors">
                                <div className="w-5 h-5 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-2.5 h-2.5 text-[#044866]" />
                                </div>
                                <p className="text-[#1A2332] text-[10px] font-medium">
                                    {primaryContact.phone}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Secondary Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all">
                <div className="bg-gradient-to-r from-[#10B981] to-[#059669] p-2.5 flex items-center justify-between">
                    <h3 className="text-white flex items-center gap-1.5 text-xs font-medium">
                        <User className="w-3 h-3" />
                        Secondary Contact
                    </h3>
                    {!isEditingSecondary && (
                        <Button
                            onClick={() => setIsEditingSecondary(true)}
                            variant="secondary"
                            className="text-white/80 hover:text-white transition-colors p-1 h-auto"
                        >
                            <Edit2 className="w-3 h-3" />
                        </Button>
                    )}
                </div>

                <div className="p-2.5 space-y-2">
                    {isEditingSecondary ? (
                        <>
                            <div>
                                <TextInput
                                    label="Full Name"
                                    name="secondaryName"
                                    id="secondaryName"
                                    type="text"
                                    value={secondaryContact.name}
                                    onChange={(e: any) =>
                                        setSecondaryContact({
                                            ...secondaryContact,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full px-2 py-1.5 text-[10px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]/20"
                                />
                            </div>
                            <div>
                                <TextInput
                                    label="Designation"
                                    name="secondaryDesignation"
                                    id="secondaryDesignation"
                                    type="text"
                                    value={secondaryContact.designation}
                                    onChange={(e: any) =>
                                        setSecondaryContact({
                                            ...secondaryContact,
                                            designation: e.target.value,
                                        })
                                    }
                                    className="w-full px-2 py-1.5 text-[10px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]/20"
                                />
                            </div>
                            <div>
                                <TextInput
                                    label="Email"
                                    name="secondaryEmail"
                                    id="secondaryEmail"
                                    type="email"
                                    value={secondaryContact.email}
                                    onChange={(e: any) =>
                                        setSecondaryContact({
                                            ...secondaryContact,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full px-2 py-1.5 text-[10px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]/20"
                                />
                            </div>
                            <div>
                                <TextInput
                                    label="Phone"
                                    name="secondaryPhone"
                                    id="secondaryPhone"
                                    type="tel"
                                    value={secondaryContact.phone}
                                    onChange={(e: any) =>
                                        setSecondaryContact({
                                            ...secondaryContact,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="w-full px-2 py-1.5 text-[10px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]/20"
                                />
                            </div>
                            <div className="flex gap-2 pt-1">
                                <Button
                                    onClick={() => setIsEditingSecondary(false)}
                                    className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 bg-gradient-to-br from-[#10B981] to-[#059669] text-white rounded-lg text-[9px] font-medium hover:shadow-md transition-all h-auto"
                                >
                                    <Save className="w-2.5 h-2.5" />
                                    Save
                                </Button>
                                <Button
                                    onClick={() => setIsEditingSecondary(false)}
                                    variant="secondary"
                                    className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] rounded-lg text-[9px] font-medium transition-all h-auto"
                                >
                                    <X className="w-2.5 h-2.5" />
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-1.5">
                            <div className="flex items-start gap-1.5 p-1.5 rounded-lg bg-[#F8FAFB] hover:bg-[#E8F4F8] transition-colors">
                                <div className="w-5 h-5 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <User className="w-2.5 h-2.5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[#1A2332] text-[10px] font-medium">
                                        {secondaryContact.name}
                                    </p>
                                    <p className="text-[#64748B] text-[9px]">
                                        {secondaryContact.designation}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#F8FAFB] hover:bg-[#E8F4F8] transition-colors">
                                <div className="w-5 h-5 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-2.5 h-2.5 text-[#044866]" />
                                </div>
                                <p className="text-[#1A2332] text-[10px] font-medium">
                                    {secondaryContact.email}
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#F8FAFB] hover:bg-[#E8F4F8] transition-colors">
                                <div className="w-5 h-5 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-2.5 h-2.5 text-[#044866]" />
                                </div>
                                <p className="text-[#1A2332] text-[10px] font-medium">
                                    {secondaryContact.phone}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Workplace Type */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all">
                <div className="bg-gradient-to-r from-[#F7A619] to-[#EA580C] p-2.5 flex items-center justify-between">
                    <h3 className="text-white flex items-center gap-1.5 text-xs font-medium">
                        <Briefcase className="w-3 h-3" />
                        Workplace Type
                    </h3>
                    {!isEditingWorkplaceType && (
                        <Button
                            onClick={() => setIsEditingWorkplaceType(true)}
                            variant="secondary"
                            className="text-white/80 hover:text-white transition-colors p-1 h-auto"
                        >
                            <Edit2 className="w-3 h-3" />
                        </Button>
                    )}
                </div>

                <div className="p-2.5">
                    {isEditingWorkplaceType ? (
                        <div className="space-y-2">
                            <Select
                                label="Select Workplace Type"
                                name="workplaceType"
                                options={workplaceTypes}
                                onChange={(value: any) =>
                                    setWorkplaceType(value)
                                }
                            />
                            <div className="flex gap-2 pt-1">
                                <Button
                                    onClick={() =>
                                        setIsEditingWorkplaceType(false)
                                    }
                                    className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 bg-gradient-to-br from-[#10B981] to-[#059669] text-white rounded-lg text-[9px] font-medium hover:shadow-md transition-all h-auto"
                                >
                                    <Save className="w-2.5 h-2.5" />
                                    Save
                                </Button>
                                <Button
                                    onClick={() =>
                                        setIsEditingWorkplaceType(false)
                                    }
                                    variant="secondary"
                                    className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] rounded-lg text-[9px] font-medium transition-all h-auto"
                                >
                                    <X className="w-2.5 h-2.5" />
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-br from-[#F7A619]/10 to-[#EA580C]/10 border border-[#F7A619]/20">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#F7A619] to-[#EA580C] rounded-lg flex items-center justify-center flex-shrink-0">
                                <Briefcase className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[#1A2332]">
                                    {workplaceType}
                                </p>
                                <p className="text-[9px] text-[#64748B]">
                                    Current work environment
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
