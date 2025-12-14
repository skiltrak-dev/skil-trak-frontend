import { Button, Select, TextArea, TextInput, Typography } from '@components'
import { AnimatePresence, motion } from 'framer-motion'
import {
    Briefcase,
    Building2,
    Calendar,
    Edit2,
    Globe,
    MapPin,
    Save,
    Users,
    X,
} from 'lucide-react'
import { useState } from 'react'

interface EditProfileModalProps {
    isOpen: boolean
    onClose: () => void
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
    const [isEditing, setIsEditing] = useState(false)

    const [companyProfile, setCompanyProfile] = useState({
        companyName: 'TechCorp Solutions',
        abn: '12 345 678 901',
        industry: 'Technology & IT Services',
        sector: 'Health & Community Services',
        address: '123 Tech Street',
        suburb: 'Sydney',
        state: 'NSW',
        postcode: '2000',
        country: 'Australia',
        website: 'www.techcorp.com.au',
        phone: '+61 2 9876 5432',
        email: 'info@techcorp.com.au',
        employeeCount: '50-100',
        yearEstablished: '2008',
        description:
            'Leading technology solutions provider specializing in innovative software development and IT consulting services across Australia.',
    })

    // Store original values for reset on cancel
    const [originalProfile, setOriginalProfile] = useState(companyProfile)

    const industryOptions = [
        {
            label: 'Technology & IT Services',
            value: 'Technology & IT Services',
        },
        { label: 'Healthcare & Medical', value: 'Healthcare & Medical' },
        { label: 'Education & Training', value: 'Education & Training' },
        { label: 'Finance & Banking', value: 'Finance & Banking' },
        { label: 'Retail & E-commerce', value: 'Retail & E-commerce' },
        { label: 'Manufacturing', value: 'Manufacturing' },
        { label: 'Construction', value: 'Construction' },
        { label: 'Hospitality & Tourism', value: 'Hospitality & Tourism' },
        { label: 'Professional Services', value: 'Professional Services' },
        { label: 'Other', value: 'Other' },
    ]

    const sectorOptions = [
        {
            label: 'Health & Community Services',
            value: 'Health & Community Services',
        },
        { label: 'Aged Care', value: 'Aged Care' },
        { label: 'Disability Services', value: 'Disability Services' },
        { label: 'Mental Health', value: 'Mental Health' },
        { label: 'Child Care', value: 'Child Care' },
        { label: 'Youth Services', value: 'Youth Services' },
        { label: 'Family Services', value: 'Family Services' },
        { label: 'Not Applicable', value: 'Not Applicable' },
    ]

    const stateOptions = [
        { label: 'NSW', value: 'NSW' },
        { label: 'VIC', value: 'VIC' },
        { label: 'QLD', value: 'QLD' },
        { label: 'WA', value: 'WA' },
        { label: 'SA', value: 'SA' },
        { label: 'TAS', value: 'TAS' },
        { label: 'ACT', value: 'ACT' },
        { label: 'NT', value: 'NT' },
    ]

    const employeeCountOptions = [
        { label: '1-10', value: '1-10' },
        { label: '11-50', value: '11-50' },
        { label: '50-100', value: '50-100' },
        { label: '100-250', value: '100-250' },
        { label: '250-500', value: '250-500' },
        { label: '500-1000', value: '500-1000' },
        { label: '1000+', value: '1000+' },
    ]

    const handleSave = () => {
        // Here you would typically save to backend
        setOriginalProfile(companyProfile)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setCompanyProfile(originalProfile)
        setIsEditing(false)
    }

    const handleEditToggle = () => {
        setOriginalProfile(companyProfile)
        setIsEditing(true)
    }

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
                        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
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
                                            Edit Industry Profile
                                        </h2>
                                        <p className="text-white/80 text-sm">
                                            Manage your company information and
                                            details
                                        </p>
                                    </div>
                                    <Button
                                        onClick={onClose}
                                        variant="action"
                                        className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all text-white p-0"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                            <div className="space-y-5">
                                {/* Edit Mode Toggle */}
                                <div className="flex items-center justify-between p-4 bg-[#F8FAFB] rounded-xl border border-[#E2E8F0]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-lg flex items-center justify-center">
                                            <Edit2 className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#1A2332]">
                                                {isEditing
                                                    ? 'Editing Mode Active'
                                                    : 'View Mode'}
                                            </p>
                                            <p className="text-xs text-[#64748B]">
                                                {isEditing
                                                    ? 'Make changes to your profile'
                                                    : 'Click edit to modify profile information'}
                                            </p>
                                        </div>
                                    </div>
                                    {!isEditing && (
                                        <Button
                                            onClick={handleEditToggle}
                                            className="px-4 py-2 bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white rounded-lg text-sm font-medium transition-all h-auto"
                                        >
                                            <Edit2 className="w-4 h-4 mr-2" />
                                            Edit Profile
                                        </Button>
                                    )}
                                </div>

                                {/* Company Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                                    <div className="bg-[#F8FAFB] border-b border-[#E2E8F0] p-4 flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-[#044866]" />
                                        <h3 className="text-[#1A2332] font-bold">
                                            Company Information
                                        </h3>
                                    </div>

                                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Company Name */}
                                        <div className="md:col-span-2">
                                            <Typography
                                                htmlFor="companyName"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                Company Name *
                                            </Typography>
                                            {isEditing ? (
                                                <TextInput
                                                    id="companyName"
                                                    name="companyName"
                                                    value={
                                                        companyProfile.companyName
                                                    }
                                                    onChange={(e: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            companyName:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {
                                                            companyProfile.companyName
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* ABN */}
                                        <div>
                                            <Typography
                                                htmlFor="abn"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                ABN *
                                            </Typography>
                                            {isEditing ? (
                                                <TextInput
                                                    id="abn"
                                                    name="abn"
                                                    value={companyProfile.abn}
                                                    onChange={(e: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            abn: e.target.value,
                                                        })
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {companyProfile.abn}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Year Established */}
                                        <div>
                                            <Typography
                                                htmlFor="yearEstablished"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                <Calendar className="w-3.5 h-3.5 inline mr-1" />
                                                Year Established
                                            </Typography>
                                            {isEditing ? (
                                                <TextInput
                                                    id="yearEstablished"
                                                    name="yearEstablished"
                                                    value={
                                                        companyProfile.yearEstablished
                                                    }
                                                    onChange={(e: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            yearEstablished:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {
                                                            companyProfile.yearEstablished
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Industry */}
                                        <div>
                                            <Typography
                                                htmlFor="industry"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                <Briefcase className="w-3.5 h-3.5 inline mr-1" />
                                                Industry *
                                            </Typography>
                                            {isEditing ? (
                                                <Select
                                                    name="industry"
                                                    options={industryOptions}
                                                    onChange={(value: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            industry: value,
                                                        })
                                                    }
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {
                                                            companyProfile.industry
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Sector */}
                                        <div>
                                            <Typography
                                                htmlFor="sector"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                Sector
                                            </Typography>
                                            {isEditing ? (
                                                <Select
                                                    name="sector"
                                                    options={sectorOptions}
                                                    onChange={(value: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            sector: value,
                                                        })
                                                    }
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {companyProfile.sector}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Employee Count */}
                                        <div>
                                            <Typography
                                                htmlFor="employeeCount"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                <Users className="w-3.5 h-3.5 inline mr-1" />
                                                Employee Count
                                            </Typography>
                                            {isEditing ? (
                                                <Select
                                                    name="employeeCount"
                                                    options={
                                                        employeeCountOptions
                                                    }
                                                    onChange={(value: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            employeeCount:
                                                                value,
                                                        })
                                                    }
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {
                                                            companyProfile.employeeCount
                                                        }{' '}
                                                        employees
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <Typography
                                                htmlFor="description"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                Company Description
                                            </Typography>
                                            {isEditing ? (
                                                <TextArea
                                                    id="description"
                                                    name="description"
                                                    placeholder="Brief description of your company..."
                                                    value={
                                                        companyProfile.description
                                                    }
                                                    onChange={(e: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                    rows={3}
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm text-[#1A2332] leading-relaxed">
                                                        {
                                                            companyProfile.description
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Address Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                                    <div className="bg-[#F8FAFB] border-b border-[#E2E8F0] p-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-[#044866]" />
                                        <h3 className="text-[#1A2332] font-bold">
                                            Address Information
                                        </h3>
                                    </div>

                                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Street Address */}
                                        <div className="md:col-span-2">
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                Street Address *
                                            </Typography>
                                            {isEditing ? (
                                                <TextInput
                                                    id="address"
                                                    name="address"
                                                    value={
                                                        companyProfile.address
                                                    }
                                                    onChange={(e: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            address:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {companyProfile.address}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Suburb */}
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                Suburb *
                                            </Typography>
                                            {isEditing ? (
                                                <TextInput
                                                    id="suburb"
                                                    name="suburb"
                                                    value={
                                                        companyProfile.suburb
                                                    }
                                                    onChange={(e: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            suburb: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {companyProfile.suburb}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* State */}
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                State *
                                            </Typography>
                                            {isEditing ? (
                                                <Select
                                                    name="state"
                                                    options={stateOptions}
                                                    onChange={(value: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            state: value,
                                                        })
                                                    }
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {companyProfile.state}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Postcode */}
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                Postcode *
                                            </Typography>
                                            {isEditing ? (
                                                <TextInput
                                                    id="postcode"
                                                    name="postcode"
                                                    value={
                                                        companyProfile.postcode
                                                    }
                                                    onChange={(e: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            postcode:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {
                                                            companyProfile.postcode
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Country */}
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                Country *
                                            </Typography>
                                            {isEditing ? (
                                                <TextInput
                                                    id="country"
                                                    name="country"
                                                    value={
                                                        companyProfile.country
                                                    }
                                                    onChange={(e: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            country:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {companyProfile.country}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                                    <div className="bg-[#F8FAFB] border-b border-[#E2E8F0] p-4 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-[#044866]" />
                                        <h3 className="text-[#1A2332] font-bold">
                                            Contact Information
                                        </h3>
                                    </div>

                                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Website */}
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                <Globe className="w-3.5 h-3.5 inline mr-1" />
                                                Website
                                            </Typography>
                                            {isEditing ? (
                                                <TextInput
                                                    id="website"
                                                    name="website"
                                                    value={
                                                        companyProfile.website
                                                    }
                                                    onChange={(e: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            website:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#044866] hover:underline cursor-pointer">
                                                        {companyProfile.website}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                Phone *
                                            </Typography>
                                            {isEditing ? (
                                                <TextInput
                                                    id="phone"
                                                    name="phone"
                                                    value={companyProfile.phone}
                                                    onChange={(e: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            phone: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {companyProfile.phone}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div className="md:col-span-2">
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-[#64748B] mb-2 block"
                                            >
                                                Email Address *
                                            </Typography>
                                            {isEditing ? (
                                                <TextInput
                                                    id="email"
                                                    name="email"
                                                    value={companyProfile.email}
                                                    onChange={(e: any) =>
                                                        setCompanyProfile({
                                                            ...companyProfile,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                                                    <p className="text-sm font-medium text-[#1A2332]">
                                                        {companyProfile.email}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons - Show only in edit mode */}
                                {isEditing && (
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={handleSave}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#10B981] text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl h-auto"
                                        >
                                            <Save className="w-5 h-5" />
                                            Save Changes
                                        </Button>
                                        <Button
                                            onClick={handleCancel}
                                            variant="action"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-[#F8FAFB] text-[#64748B] border-2 border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl font-medium transition-all h-auto"
                                        >
                                            <X className="w-5 h-5" />
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-[#F8FAFB] border-t border-[#E2E8F0] flex items-center justify-between">
                            <p className="text-xs text-[#64748B]">
                                * Required fields
                            </p>
                            <Button
                                onClick={onClose}
                                className="px-4 py-2 bg-gradient-to-br from-[#044866] to-[#0D5468] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all h-auto"
                            >
                                Close
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
