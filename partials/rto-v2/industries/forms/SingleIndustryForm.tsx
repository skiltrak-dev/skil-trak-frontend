import { FormProvider, useForm } from 'react-hook-form'
import { Plus, Sparkles } from 'lucide-react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Button,
    Select,
    TextArea,
    TextInput,
    Typography,
    Card,
    AddressFieldInput,
} from '@components'
import { RtoApi } from '@redux'
import { Course } from '@types'

interface SingleIndustryFormProps {
    onSubmit: (values: any) => void
}

const sectorOptions = [
    { value: 'Community Services', label: 'Community Services' },
    { value: 'IT & Digital', label: 'IT & Digital' },
    { value: 'Hospitality', label: 'Hospitality' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Education', label: 'Education' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Other', label: 'Other' },
]

type SingleIndustryFormValues = {
    name: string
    abn?: string
    website?: string
    phone: string
    courses: number[]
    contactPerson: string
    contactPhone?: string
    email: string
    // Address fields from AddressFieldInput
    addressLine1?: string
    suburb?: string
    state?: string
    zipCode: string
}

// Yup validation schema
const validationSchema = yup.object({
    name: yup
        .string()
        .required('Industry name is required')
        .min(2, 'Industry name must be at least 2 characters'),

    abn: yup
        .string()
        .matches(/^[0-9\s]*$/, 'ABN must contain only numbers')
        .test('abn-length', 'ABN must be 11 digits', (value) => {
            if (!value) return true // Optional field
            const digitsOnly = value.replace(/\s/g, '')
            return digitsOnly.length === 0 || digitsOnly.length === 11
        }),

    website: yup
        .string()
        .url('Invalid website URL')
        .test(
            'url-protocol',
            'Website must start with http:// or https://',
            (value) => {
                if (!value) return true // Optional field
                return (
                    value.startsWith('http://') || value.startsWith('https://')
                )
            }
        ),

    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .matches(
            /^[0-9\s\-\(\)]*$/,
            'Phone number must contain only numbers and valid characters'
        ),

    courses: yup
        .array()
        .of(yup.number())
        .min(1, 'At least one course must be selected')
        .required('Courses are required'),

    contactPersonName: yup
        .string()
        .required('Contact person is required')
        .min(2, 'Contact person name must be at least 2 characters'),

    contactPersonNumber: yup
        .string()
        .matches(
            /^[0-9\s\-\(\)]*$/,
            'Phone number must contain only numbers and valid characters'
        ),

    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email address'),

    // Address fields
    addressLine1: yup.string(),
    suburb: yup.string(),
    state: yup.string(),

    zipCode: yup.string().required('Zip code is required'),
})

export const SingleIndustryForm = ({ onSubmit }: SingleIndustryFormProps) => {
    const methods = useForm<SingleIndustryFormValues>({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const rto = RtoApi.Rto.useProfile()

    const rtoCoursesOptions =
        rto.isSuccess && rto?.data?.courses && rto?.data?.courses?.length > 0
            ? rto?.data?.courses?.map((course: Course) => ({
                  label: course?.title,
                  value: course?.id,
                  item: course,
              }))
            : []

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4 mt-4 animate-fadeIn"
            >
                <Card className="border border-primaryNew/15 bg-gradient-to-br from-primaryNew/5 via-background to-primaryNew/10 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primaryNew to-primaryNew flex items-center justify-center shadow-md">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div className="space-y-1">
                            <Typography variant="subtitle" semibold>
                                Create a new industry partner
                            </Typography>
                            <Typography variant="xs" color="text-muted">
                                Capture rich details about the partner so your
                                team can manage placements, capacity and
                                communication with ease.
                            </Typography>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <TextInput
                            name="name"
                            label="Industry Name"
                            placeholder="e.g., Sunshine Aged Care"
                            required
                            validationIcons
                        />
                    </div>

                    <TextInput
                        name="abn"
                        label="ABN Number"
                        placeholder="e.g., 12 345 678 901"
                        validationIcons
                    />

                    <TextInput
                        name="website"
                        label="Website"
                        type="url"
                        placeholder="e.g., https://example.com.au"
                        validationIcons
                    />

                    <TextInput
                        name="phoneNumber"
                        label="Phone"
                        placeholder="e.g., (03) 9876 5432"
                        required
                        validationIcons
                    />

                    <Select
                        name="courses"
                        label="Courses"
                        options={rtoCoursesOptions}
                        required
                        multi
                        onlyValue
                        placeholder="Select sector"
                        validationIcons
                    />

                    <TextInput
                        name="contactPerson"
                        label="Contact Person"
                        placeholder="e.g., Sarah Johnson"
                        required
                        validationIcons
                    />

                    <TextInput
                        name="contactPersonNumber"
                        label="Contact Phone"
                        type="tel"
                        placeholder="e.g., (03) 9876 5432"
                        validationIcons
                    />

                    <div className="md:col-span-2">
                        <TextInput
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="e.g., industry@example.com.au"
                            required
                            validationIcons
                        />
                    </div>

                    <AddressFieldInput
                        placesSuggetions={{
                            placesSuggetions: true,
                            setIsPlaceSelected: () => {},
                        }}
                    />

                    <TextInput
                        name="zipCode"
                        label="Zip Code"
                        placeholder="e.g., 3000"
                        required
                        validationIcons
                    />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Typography variant="xs" color="text-muted">
                        * Required fields
                    </Typography>
                    <div className="flex gap-2">
                        <Button
                            text="Add Industry Partner"
                            variant="primaryNew"
                            Icon={Plus}
                            submit
                            loading={methods?.formState?.isSubmitting}
                            disabled={methods?.formState?.isSubmitting}
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
