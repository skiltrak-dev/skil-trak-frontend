import {
    Checkbox,
    Select,
    ShowErrorNotifications,
    TextArea,
    TextInput,
    Typography,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Rto } from '@types'
import { MessageSquare } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import {
    InfoBanner,
    RtoInfoCard,
    Service,
    ServiceFormActions,
    Title,
    ViewUploadedFiles,
} from '../components'
import {
    AvailableServiceBaseForm,
    AvailableServiceCourseForm,
    FileUpload,
} from '../forms'
import { getDate } from '@utils'
import { useSubmitForm } from '../hooks'

export const AdvancedSimulationRoomForm = ({
    service,
    rto,
    onCancel,
}: {
    rto: Rto
    service: Service
    onCancel: () => void
}) => {
    const { onSubmit, submitResult } = useSubmitForm({ onCancel })

    const validationSchema = Yup.object({
        // Base form fields
        contactPersonName: Yup.string().required('Full name is required'),
        role: Yup.string().required('Role/Title is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),

        // Course selection
        courses: Yup.array()
            .min(1, 'Please select at least one course')
            .required('Course selection is required'),

        // Service specific fields
        jurisdiction: Yup.string().required('Jurisdiction is required'),
        studentCount: Yup.number()
            .typeError('Student count must be a number')
            .positive('Student count must be positive')
            .integer('Student count must be a whole number')
            .required('Student count is required'),

        // Intended use (checkbox array)
        type: Yup.array()
            .min(1, 'Please select at least one intended use')
            .required('Intended use is required'),

        // Date fields
        startDate: Yup.date()
            .typeError('Please enter a valid start date')
            .required('Start date is required'),
        endDate: Yup.date()
            .typeError('Please enter a valid end date')
            .min(Yup.ref('startDate'), 'End date must be after start date')
            .required('End date is required'),

        // Text fields
        equipment: Yup.string().required(
            'Equipment/Setup information is required'
        ),
        trainer: Yup.string().required(
            'Trainer/Assessor information is required'
        ),
        summary: Yup.string().required('Summary of requirements is required'),
        accessibility: Yup.string().optional(),

        // File upload
        fileUpload: Yup.array().optional(),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
        defaultValues: {
            type: [],
            premiumFeature: service?.premiumFeature,
        },
    })

    const getServiceColor = () => {
        switch (service?.title) {
            case 'Expert Industry Consultation':
                return {
                    from: 'from-primaryNew',
                    to: 'to-primaryNew',
                    bg: 'bg-primaryNew/5',
                }
            case 'MOU & Legal Services':
                return {
                    from: 'from-primary',
                    to: 'to-primary-light',
                    bg: 'bg-primary/5',
                }
            case 'Advanced Simulation Tools':
                return {
                    from: 'from-primaryNew',
                    to: 'to-primaryNew',
                    bg: 'bg-primaryNew/5',
                }
            case 'Professional Webinar Platform':
                return {
                    from: 'from-success',
                    to: 'to-success-dark',
                    bg: 'bg-success/5',
                }
            default:
                return {
                    from: 'from-primary',
                    to: 'to-secondary',
                    bg: 'bg-primary/5',
                }
        }
    }

    const colors = getServiceColor()

    const type = methods.watch('type') as string[]

    return (
        <>
            <ShowErrorNotifications result={submitResult} />
            <FormProvider {...methods}>
                <form
                    // id="enquiry-form"
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-3.5"
                >
                    {/* RTO Information Card */}
                    <RtoInfoCard rto={rto} variant={service?.variant} />

                    {/* Contact Person Section */}
                    <AvailableServiceBaseForm variant={service?.variant} />

                    <div className="h-0.5 w-full bg-gray-300" />
                    {/* Service-Specific Fields */}
                    <div className="space-y-4">
                        <Title
                            Icon={MessageSquare}
                            title="Service Details"
                            description="Please provide the following information"
                            iconClasses={`bg-gradient-to-br ${colors.from} ${colors.to}`}
                        />

                        {/* Expert Industry Consultation Fields */}

                        <div className="space-y-4">
                            <AvailableServiceCourseForm rto={rto} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    required
                                    name={'jurisdiction'}
                                    label={'Jurisdiction'}
                                    options={[
                                        { value: 'VIC', label: 'Victoria' },
                                        {
                                            value: 'NSW',
                                            label: 'New South Wales',
                                        },
                                        { value: 'QLD', label: 'Queensland' },
                                        {
                                            value: 'SA',
                                            label: 'South Australia',
                                        },
                                        {
                                            value: 'WA',
                                            label: 'Western Australia',
                                        },
                                        { value: 'TAS', label: 'Tasmania' },
                                        {
                                            value: 'NT',
                                            label: 'Northern Territory',
                                        },
                                        {
                                            value: 'ACT',
                                            label: 'Australian Capital Territory',
                                        },
                                        {
                                            value: 'MULTI',
                                            label: 'Multi-state',
                                        },
                                    ]}
                                    onlyValue
                                />
                                <TextInput
                                    required
                                    name="studentCount"
                                    label={'Student Count'}
                                    placeholder="Number of students"
                                />
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div className="space-y-2">
                        <Typography variant="small" semibold>
                            Intended Use{' '}
                            <span className="text-destructive">*</span>
                        </Typography>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {[
                                'Assessment',
                                'Practice',
                                'Orientation',
                                'Filming',
                                'Other',
                            ].map((use) => (
                                <div
                                    key={use}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                        type.includes(use)
                                            ? 'border-primaryNew bg-primaryNew/10'
                                            : 'border-border hover:border-primaryNew/50 hover:bg-muted/50'
                                    }`}
                                >
                                    <Checkbox
                                        name={'type'}
                                        value={use}
                                        label={use}
                                        showError={false}
                                        className="pointer-events-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Typography variant="small" semibold>
                            Required Dates{' '}
                            <span className="text-destructive">*</span>
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextInput
                                label={'Start Date'}
                                name="startDate"
                                type="date"
                                required
                                max={getDate()}
                            />

                            <TextInput
                                label={'End Date'}
                                name="endDate"
                                type="date"
                                required
                                min={getDate()}
                            />
                        </div>
                    </div>

                    <TextArea
                        label={'Equipment / Setup Needed'}
                        name="equipment"
                        required
                        placeholder="e.g., manikins, PPE, tools, specific equipment..."
                        rows={4}
                    />

                    <TextInput
                        label={'Trainer/Assessor Attending'}
                        name="trainer"
                        required
                        placeholder="Name and contact details"
                    />

                    <TextArea
                        label={'Summary of Requirements'}
                        name="summary"
                        required
                        placeholder="Describe your simulation room requirements..."
                        rows={3}
                    />

                    <TextArea
                        placeholder="Any accessibility requirements or work health & safety considerations..."
                        label={'Accessibility or WHS Notes (Optional)'}
                        rows={4}
                        required
                        name="accessibility"
                    />
                    {/* Info Banner */}
                    <InfoBanner colors={colors} service={service} />

                    <ServiceFormActions
                        onCancel={onCancel}
                        variant={service?.variant}
                        loading={submitResult?.isLoading}
                    />
                </form>
            </FormProvider>
        </>
    )
}
