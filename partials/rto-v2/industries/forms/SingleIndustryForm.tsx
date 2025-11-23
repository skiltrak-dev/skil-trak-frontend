import { FormProvider, useForm } from 'react-hook-form'
import { Plus, Sparkles } from 'lucide-react'
import { Button, Select, TextArea, TextInput, Typography, Card } from '@components'

interface SingleIndustryFormProps {
    onClose: () => void
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
    sector: string
    location: string
    contactPerson: string
    contactEmail: string
    contactPhone?: string
    capacity: number | string
    website?: string
    facilities?: string
    notes?: string
}

export const SingleIndustryForm = ({ onClose }: SingleIndustryFormProps) => {
    const methods = useForm<SingleIndustryFormValues>()

    const handleSubmitSingle = methods.handleSubmit((data) => {
        // TODO: Wire this to actual API integration
        // For now, keep the same behaviour (log + close)
        console.log('Single industry data:', data)
        onClose()
    })

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmitSingle}
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
                                Capture rich details about the partner so your team can
                                manage placements, capacity and communication with ease.
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
                            rules={{
                                required: 'Industry name is required',
                            }}
                        />
                    </div>

                    <div>
                        <TextInput
                            name="abn"
                            label="ABN Number"
                            placeholder="e.g., 12 345 678 901"
                        />
                    </div>

                    <div>
                        <Select
                            name="sector"
                            label="Sector"
                            options={sectorOptions}
                            required
                            rules={{ required: 'Sector is required' }}
                            placeholder="Select sector"
                        />
                    </div>

                    <div>
                        <TextInput
                            name="location"
                            label="Location"
                            placeholder="e.g., Melbourne, VIC"
                            required
                            rules={{ required: 'Location is required' }}
                        />
                    </div>

                    <div>
                        <TextInput
                            name="contactPerson"
                            label="Contact Person"
                            placeholder="e.g., Sarah Johnson"
                            required
                            rules={{
                                required: 'Contact person is required',
                            }}
                        />
                    </div>

                    <div>
                        <TextInput
                            name="contactEmail"
                            label="Contact Email"
                            type="email"
                            placeholder="e.g., sarah@example.com.au"
                            required
                            rules={{
                                required: 'Contact email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            }}
                        />
                    </div>

                    <div>
                        <TextInput
                            name="contactPhone"
                            label="Contact Phone"
                            type="tel"
                            placeholder="e.g., (03) 9876 5432"
                        />
                    </div>

                    <div>
                        <TextInput
                            name="capacity"
                            label="Placement Capacity"
                            type="number"
                            placeholder="e.g., 15"
                            required
                            rules={{ required: 'Capacity is required' }}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <TextInput
                            name="website"
                            label="Website"
                            type="url"
                            placeholder="e.g., https://example.com.au"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <TextInput
                            name="facilities"
                            label="Facilities/Services"
                            placeholder="e.g., Aged Care, Disability Support, Dementia Care (separate with commas)"
                            helpText="Separate multiple facilities with commas"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <TextArea
                            name="notes"
                            label="Additional Notes"
                            placeholder="Any additional information about this industry partner..."
                            rows={3}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Typography variant="xs" color="text-muted">
                        * Required fields
                    </Typography>
                    <div className="flex gap-2">
                        <Button text="Cancel" outline onClick={onClose} />
                        <Button
                            text="Add Industry Partner"
                            variant="primaryNew"
                            Icon={Plus}
                            submit
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}


