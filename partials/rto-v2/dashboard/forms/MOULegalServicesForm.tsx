import {
    Select,
    ShowErrorNotifications,
    TextArea,
    TextInput,
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
import { useSubmitForm } from '../hooks'

export const MOULegalServicesForm = ({
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
        deadline: Yup.date()
            .typeError('Please enter a valid deadline')
            .min(new Date(), 'Deadline must be in the future')
            .required('Deadline is required'),
        summary: Yup.string()
            .min(50, 'Please provide at least 50 characters')
            .max(1000, 'Description must not exceed 1000 characters')
            .required('Summary of requirements is required'),

        // File upload
        fileUpload: Yup.array().optional(),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
        defaultValues: {
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
                                    type="date"
                                    name="deadline"
                                    label={'Deadline'}
                                />
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <TextArea
                        placeholder="Describe the MOU requirements, changes, or specific terms needed..."
                        label={'Summary of Requirements/Changes'}
                        rows={5}
                        required
                        name="summary"
                    />

                    <FileUpload />
                    <ViewUploadedFiles variant={service?.variant} />
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
