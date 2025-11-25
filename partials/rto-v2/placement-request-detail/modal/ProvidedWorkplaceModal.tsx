import { useState } from 'react'
import { GlobalModal } from '@components/Modal/GlobalModal'
import { Button, Typography } from '@components'
import { TextInput } from '@components/inputs/TextInput'
import { Select } from '@components/inputs/Select'
import { TextArea } from '@components/inputs/TextArea'
import { Separator } from '@components/ui/separator'
import { ScrollArea } from '@components/ui/scroll-area'
import { motion } from 'framer-motion'
import {
    Building2,
    User,
    GraduationCap,
    CheckCircle2,
    AlertCircle,
    Info,
    ListChecks,
    ArrowLeft,
    ArrowRight,
} from 'lucide-react'
import { MdCancel } from 'react-icons/md'
import { Progressbar } from '@partials/rto-v2/components'

interface NewIndustryForm {
    industryName: string
    abn: string
    businessAddress: string
    website: string
    contactName: string
    contactPhone: string
    contactEmail: string
    offeredCourses: string
    additionalInfo: string
}

interface ProvidedWorkplaceModalProps {
    open: boolean
    onClose: () => void
    abnSearch: string
    onAbnSearchChange: (value: string) => void
    industryFound: boolean | null
    onIndustryFoundChange: (found: boolean | null) => void
    newIndustryForm: NewIndustryForm
    onNewIndustryFormChange: (form: NewIndustryForm) => void
    formErrors: { [key: string]: string }
    onFormErrorsChange: (errors: { [key: string]: string }) => void
    onSearch: () => void
    onSubmitNewIndustry: () => void
    onContinueToProof: () => void
    formatABN: (value: string) => string
}

export function ProvidedWorkplaceModal({
    open,
    onClose,
    abnSearch,
    onAbnSearchChange,
    industryFound,
    onIndustryFoundChange,
    newIndustryForm,
    onNewIndustryFormChange,
    formErrors,
    onFormErrorsChange,
    onSearch,
    onSubmitNewIndustry,
    onContinueToProof,
    formatABN,
}: ProvidedWorkplaceModalProps) {
    const updateFormField = (field: string, value: string) => {
        onNewIndustryFormChange({
            ...newIndustryForm,
            [field]: value,
        })
        // Clear error when user starts typing
        if (formErrors[field]) {
            const newErrors = { ...formErrors }
            delete newErrors[field]
            onFormErrorsChange(newErrors)
        }
    }

    const handleClose = () => {
        onClose()
        onIndustryFoundChange(null)
        onAbnSearchChange('')
        onNewIndustryFormChange({
            industryName: '',
            abn: '',
            businessAddress: '',
            website: '',
            contactName: '',
            contactPhone: '',
            contactEmail: '',
            offeredCourses: 'cert3-nursing',
            additionalInfo: '',
        })
        onFormErrorsChange({})
    }

    if (!open) return null

    const requiredFields = [
        'industryName',
        'abn',
        'businessAddress',
        'contactName',
        'contactPhone',
        'contactEmail',
    ]
    const filledFields = requiredFields.filter((field) =>
        newIndustryForm[field as keyof typeof newIndustryForm]
            ?.toString()
            .trim()
    )
    const progress = (filledFields.length / requiredFields.length) * 100

    const courseOptions = [
        {
            label: 'Certificate III in Individual Support (Ageing)',
            value: 'cert3-nursing',
        },
        { label: 'Certificate IV in Ageing Support', value: 'cert4-nursing' },
        { label: 'Diploma of Nursing', value: 'diploma-nursing' },
    ]

    return (
        <GlobalModal
            onCancel={handleClose}
            className="sm:max-w-[700px] max-h-[85vh]"
        >
            <div className="p-6 flex flex-col max-h-[85vh]">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div>
                        <Typography
                            variant="h3"
                            className="text-[#044866] flex items-center gap-2"
                        >
                            <Building2 className="h-5 w-5" />
                            Search Provided Workplace
                        </Typography>
                        <Typography
                            variant="small"
                            className="text-gray-600 mt-1"
                        >
                            Search for industry or add new industry details
                        </Typography>
                    </div>
                    <MdCancel
                        onClick={handleClose}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4 py-4">
                        {/* Search Section - Always visible unless industry not found */}
                        {industryFound !== false && (
                            <>
                                <div>
                                    <Typography
                                        variant="label"
                                        className="text-sm font-medium"
                                    >
                                        ABN or Industry Name
                                    </Typography>
                                    <TextInput
                                        name="abnSearch"
                                        placeholder="e.g., 12 345 678 901 or St Vincent's Hospital"
                                        className="mt-2"
                                        value={abnSearch}
                                        onChange={(e: any) =>
                                            onAbnSearchChange(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="label"
                                        className="text-sm font-medium"
                                    >
                                        Course
                                    </Typography>
                                    <Select
                                        name="course"
                                        options={courseOptions}
                                        value={newIndustryForm.offeredCourses}
                                        onChange={(val: any) =>
                                            updateFormField(
                                                'offeredCourses',
                                                val
                                            )
                                        }
                                        placeholder="Select a course"
                                    />
                                </div>
                            </>
                        )}

                        {/* Search Results */}
                        {industryFound !== null && (
                            <div
                                className={`p-4 rounded-lg border ${
                                    industryFound
                                        ? 'bg-emerald-50 border-emerald-200'
                                        : 'bg-amber-50 border-amber-200'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    {industryFound ? (
                                        <>
                                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                            <div className="flex-1">
                                                <Typography
                                                    variant="label"
                                                    className="text-emerald-900 font-medium"
                                                >
                                                    Industry Found
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    className="text-emerald-700"
                                                >
                                                    St Vincent's Hospital -
                                                    Melbourne
                                                </Typography>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="h-5 w-5 text-amber-600" />
                                            <div className="flex-1">
                                                <Typography
                                                    variant="label"
                                                    className="text-amber-900 font-medium"
                                                >
                                                    Industry Not Found in the
                                                    SkilTrak Database
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    className="text-amber-700"
                                                >
                                                    Please fill in the industry
                                                    details below
                                                </Typography>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* New Industry Form - Shown when industry not found */}
                        {industryFound === false && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-5 pt-2"
                            >
                                {/* Info Banner */}
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Info className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <Typography
                                                variant="label"
                                                className="text-blue-900 font-medium text-sm mb-1"
                                            >
                                                HOD Approval Required
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                className="text-blue-700"
                                            >
                                                Please provide complete and
                                                accurate details. This
                                                information will be reviewed by
                                                the Head of Department before
                                                approval.
                                            </Typography>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Completion Progress */}
                                <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <ListChecks className="h-4 w-4 text-slate-600" />
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-slate-700"
                                            >
                                                Form Completion
                                            </Typography>
                                        </div>
                                        <Typography
                                            variant="small"
                                            className="font-semibold text-[#044866]"
                                        >
                                            {filledFields.length} of{' '}
                                            {requiredFields.length} required
                                            fields
                                        </Typography>
                                    </div>
                                    <Progressbar value={progress} size="sm" />
                                </div>

                                {/* Business Information Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2">
                                        <Building2 className="h-4 w-4 text-[#044866]" />
                                        <Typography
                                            variant="h4"
                                            className="font-semibold text-[#044866]"
                                        >
                                            Business Information
                                        </Typography>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-slate-700"
                                            >
                                                Industry Name{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Typography>
                                            <TextInput
                                                name="industryName"
                                                placeholder="e.g., St Vincent's Hospital"
                                                className={`mt-2 ${
                                                    formErrors.industryName
                                                        ? 'border-red-300 focus-visible:ring-red-500'
                                                        : ''
                                                }`}
                                                value={
                                                    newIndustryForm.industryName
                                                }
                                                onChange={(e: any) =>
                                                    updateFormField(
                                                        'industryName',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {formErrors.industryName && (
                                                <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />{' '}
                                                    {formErrors.industryName}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-slate-700"
                                            >
                                                ABN{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Typography>
                                            <TextInput
                                                name="abn"
                                                placeholder="e.g., 12 345 678 901"
                                                className={`mt-2 ${
                                                    formErrors.abn
                                                        ? 'border-red-300 focus-visible:ring-red-500'
                                                        : ''
                                                }`}
                                                value={newIndustryForm.abn}
                                                onChange={(e: any) =>
                                                    updateFormField(
                                                        'abn',
                                                        formatABN(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                            />
                                            {formErrors.abn && (
                                                <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />{' '}
                                                    {formErrors.abn}
                                                </div>
                                            )}
                                            {!formErrors.abn &&
                                                newIndustryForm.abn && (
                                                    <div className="text-emerald-600 text-xs mt-1 flex items-center gap-1">
                                                        <CheckCircle2 className="h-3 w-3" />{' '}
                                                        Valid format
                                                    </div>
                                                )}
                                        </div>
                                    </div>

                                    <div>
                                        <Typography
                                            variant="label"
                                            className="text-sm font-medium text-slate-700"
                                        >
                                            Business Address{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Typography>
                                        <TextInput
                                            name="businessAddress"
                                            placeholder="e.g., 41 Victoria Parade, Fitzroy VIC 3065"
                                            className={`mt-2 ${
                                                formErrors.businessAddress
                                                    ? 'border-red-300 focus-visible:ring-red-500'
                                                    : ''
                                            }`}
                                            value={
                                                newIndustryForm.businessAddress
                                            }
                                            onChange={(e: any) =>
                                                updateFormField(
                                                    'businessAddress',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {formErrors.businessAddress && (
                                            <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" />{' '}
                                                {formErrors.businessAddress}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Typography
                                            variant="label"
                                            className="text-sm font-medium text-slate-700"
                                        >
                                            Website{' '}
                                            <span className="text-slate-400 text-xs">
                                                (optional)
                                            </span>
                                        </Typography>
                                        <TextInput
                                            name="website"
                                            placeholder="e.g., https://www.svhm.org.au"
                                            className={`mt-2 ${
                                                formErrors.website
                                                    ? 'border-red-300 focus-visible:ring-red-500'
                                                    : ''
                                            }`}
                                            value={newIndustryForm.website}
                                            onChange={(e: any) =>
                                                updateFormField(
                                                    'website',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {formErrors.website && (
                                            <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" />{' '}
                                                {formErrors.website}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                {/* Contact Information Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2">
                                        <User className="h-4 w-4 text-[#044866]" />
                                        <Typography
                                            variant="h4"
                                            className="font-semibold text-[#044866]"
                                        >
                                            Contact Information
                                        </Typography>
                                    </div>

                                    <div>
                                        <Typography
                                            variant="label"
                                            className="text-sm font-medium text-slate-700"
                                        >
                                            Contact Person Name{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Typography>
                                        <TextInput
                                            name="contactName"
                                            placeholder="e.g., Margaret Chen"
                                            className={`mt-2 ${
                                                formErrors.contactName
                                                    ? 'border-red-300 focus-visible:ring-red-500'
                                                    : ''
                                            }`}
                                            value={newIndustryForm.contactName}
                                            onChange={(e: any) =>
                                                updateFormField(
                                                    'contactName',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {formErrors.contactName && (
                                            <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" />{' '}
                                                {formErrors.contactName}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-slate-700"
                                            >
                                                Contact Phone{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Typography>
                                            <TextInput
                                                name="contactPhone"
                                                placeholder="e.g., 03 9288 2211"
                                                className={`mt-2 ${
                                                    formErrors.contactPhone
                                                        ? 'border-red-300 focus-visible:ring-red-500'
                                                        : ''
                                                }`}
                                                value={
                                                    newIndustryForm.contactPhone
                                                }
                                                onChange={(e: any) =>
                                                    updateFormField(
                                                        'contactPhone',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {formErrors.contactPhone && (
                                                <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />{' '}
                                                    {formErrors.contactPhone}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-sm font-medium text-slate-700"
                                            >
                                                Contact Email{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Typography>
                                            <TextInput
                                                name="contactEmail"
                                                type="email"
                                                placeholder="e.g., placements@example.com"
                                                className={`mt-2 ${
                                                    formErrors.contactEmail
                                                        ? 'border-red-300 focus-visible:ring-red-500'
                                                        : ''
                                                }`}
                                                value={
                                                    newIndustryForm.contactEmail
                                                }
                                                onChange={(e: any) =>
                                                    updateFormField(
                                                        'contactEmail',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {formErrors.contactEmail && (
                                                <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />{' '}
                                                    {formErrors.contactEmail}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                {/* Course & Additional Details Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2">
                                        <GraduationCap className="h-4 w-4 text-[#044866]" />
                                        <Typography
                                            variant="h4"
                                            className="font-semibold text-[#044866]"
                                        >
                                            Course & Additional Details
                                        </Typography>
                                    </div>

                                    <div>
                                        <Typography
                                            variant="label"
                                            className="text-sm font-medium text-slate-700"
                                        >
                                            Offered Courses{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Typography>
                                        <Select
                                            name="offeredCourses"
                                            options={courseOptions}
                                            value={
                                                newIndustryForm.offeredCourses
                                            }
                                            onChange={(val: any) =>
                                                updateFormField(
                                                    'offeredCourses',
                                                    val
                                                )
                                            }
                                            placeholder="Select a course"
                                        />
                                    </div>

                                    <div>
                                        <Typography
                                            variant="label"
                                            className="text-sm font-medium text-slate-700"
                                        >
                                            Additional Information{' '}
                                            <span className="text-slate-400 text-xs">
                                                (optional)
                                            </span>
                                        </Typography>
                                        <TextArea
                                            name="additionalInfo"
                                            placeholder="Add any other relevant information about the industry, such as specializations, facilities, or specific placement conditions..."
                                            className="mt-2"
                                            rows={5}
                                            value={
                                                newIndustryForm.additionalInfo
                                            }
                                            onChange={(e: any) =>
                                                updateFormField(
                                                    'additionalInfo',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Typography
                                            variant="xs"
                                            className="text-slate-400 text-right mt-1"
                                        >
                                            {
                                                newIndustryForm.additionalInfo
                                                    .length
                                            }
                                            /500 characters
                                        </Typography>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </ScrollArea>

                {/* Validation Summary */}
                {industryFound === false &&
                    Object.keys(formErrors).length > 0 && (
                        <div className="px-1 pb-2">
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <Typography
                                            variant="label"
                                            className="text-red-900 font-medium text-sm"
                                        >
                                            Please fix the following errors:
                                        </Typography>
                                        <ul className="text-red-700 text-sm mt-1 space-y-0.5">
                                            {Object.entries(formErrors).map(
                                                ([field, error]) => (
                                                    <li
                                                        key={field}
                                                        className="flex items-start gap-1"
                                                    >
                                                        <span className="text-red-500">
                                                            •
                                                        </span>
                                                        <span>{error}</span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                <div className="border-t pt-4 flex-shrink-0 mt-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                onClick={handleClose}
                                text="Cancel"
                            />

                            {industryFound === false && (
                                <Button
                                    outline
                                    variant="secondary"
                                    onClick={() => {
                                        onIndustryFoundChange(null)
                                        onFormErrorsChange({})
                                    }}
                                    Icon={ArrowLeft}
                                    text="Back to Search"
                                />
                            )}
                        </div>

                        {industryFound === false ? (
                            <Button
                                variant="primaryNew"
                                onClick={onSubmitNewIndustry}
                                Icon={CheckCircle2}
                                text="Submit & Continue"
                            />
                        ) : industryFound === true ? (
                            <Button
                                variant="primaryNew"
                                onClick={onContinueToProof}
                                Icon={ArrowRight}
                                text="Continue to Proof Upload"
                            />
                        ) : (
                            <Button
                                variant="primaryNew"
                                onClick={onSearch}
                                disabled={!abnSearch.trim()}
                                Icon={Building2}
                                text="Search Industry"
                            />
                        )}
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
