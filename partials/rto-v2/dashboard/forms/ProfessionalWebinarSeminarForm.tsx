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
import { MessageSquare, Users, Video } from 'lucide-react'
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
import classNames from 'classnames'
import { useSubmitForm } from '../hooks'

export const ProfessionalWebinarSeminarForm = ({
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
        format: Yup.string().required('Format selection is required'),
        sessionTitle: Yup.string().required('Topic/Session title is required'),
        preferredDate: Yup.date()
            .typeError('Please enter a valid date and time')
            .min(new Date(), 'Preferred date/time must be in the future')
            .required('Preferred date/time is required'),
        duration: Yup.string().required('Duration is required'),
        expectedAttendees: Yup.number()
            .typeError('Expected attendees must be a number')
            .positive('Expected attendees must be positive')
            .integer('Expected attendees must be a whole number')
            .required('Expected attendees is required'),
        learningOutcomes: Yup.string()
            .min(
                20,
                'Please provide at least 20 characters for learning outcomes'
            )
            .required('Learning outcomes are required'),

        // Optional fields
        accessibility: Yup.string().optional(),
        budget: Yup.number()
            .typeError('Budget must be a number')
            .min(0, 'Budget cannot be negative')
            .optional(),
        recording: Yup.array().optional(),

        // File upload
        fileUpload: Yup.array().optional(),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
        defaultValues: {
            format: '',
            recording: [''],
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

    const format = methods.watch('format')
    const recording = methods.watch('recording')

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

                        <div className="space-y-2">
                            <Typography variant="small" medium>
                                Format{' '}
                                <span className="text-destructive">*</span>
                            </Typography>

                            <div className="flex items-center gap-x-2 w-full">
                                {[
                                    {
                                        Icon: Video,
                                        title: 'Webinar (online)',
                                    },
                                    {
                                        Icon: Users,
                                        title: 'Seminar (on-campus)',
                                    },
                                ]?.map(({ Icon, title }) => (
                                    <div
                                        onClick={() => {
                                            methods.setValue('format', title)
                                        }}
                                        className={classNames({
                                            'w-full flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all peer-data-[state=checked]:border-success peer-data-[state=checked]:bg-success/10 hover:border-success/50':
                                                true,
                                            'border-success/50':
                                                format === title,
                                        })}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="font-medium">
                                            {title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <TextInput
                            required
                            name="sessionTitle"
                            label={'Topic / Session Title'}
                            placeholder="Enter session title"
                        />

                        <AvailableServiceCourseForm rto={rto} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TextInput
                            label={'Preferred Date/Time'}
                            name="preferredDate"
                            type="datetime-local"
                            required
                            className="h-10"
                            min={new Date().toISOString().slice(0, 16)}
                        />

                        <Select
                            required
                            name={'duration'}
                            label={'Duration'}
                            options={[
                                { value: '30', label: '30 minutes' },
                                { value: '45', label: '45 minutes' },
                                { value: '60', label: '60 minutes' },
                                { value: '90', label: '90 minutes' },
                            ]}
                            onlyValue
                        />

                        <TextInput
                            label={'Expected Attendees'}
                            name="expectedAttendees"
                            type="number"
                            required
                            min="1"
                            placeholder="Number of attendees"
                            className="h-10"
                        />
                    </div>

                    <TextArea
                        label={'Learning Outcomes'}
                        name="learningOutcomes"
                        required
                        placeholder="• Outcome 1&#10;• Outcome 2&#10;• Outcome 3"
                        rows={5}
                        className="resize-none"
                        recomendedText="Please list 3-5 key learning outcomes or objectives"
                    />

                    <div className="space-y-2">
                        <Typography variant="small" semibold>
                            Recording & Materials
                        </Typography>
                        <div className="flex items-center gap-2">
                            {[
                                'Record session',
                                'Need slides',
                                'Attendance report',
                            ].map((option) => (
                                <div
                                    key={option}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                        recording?.includes(option)
                                            ? 'border-primaryNew bg-primaryNew/10'
                                            : 'border-border hover:border-primaryNew/50 hover:bg-muted/50'
                                    }`}
                                >
                                    <Checkbox
                                        name={'recording'}
                                        value={option}
                                        label={option}
                                        showError={false}
                                        className="pointer-events-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextArea
                            label={'Accessibility Needs (Optional)'}
                            name="accessibility"
                            placeholder="e.g., captioning, sign language..."
                            rows={3}
                            className="resize-none"
                        />

                        <TextInput
                            label={'Budget (AUD $) (Optional)'}
                            name="budget"
                            type="number"
                            min={0}
                            // step="0.01"
                            placeholder="0.00"
                        />
                    </div>

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
