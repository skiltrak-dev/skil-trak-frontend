import { useEffect } from 'react'
import {
    Button,
    Select,
    ShowErrorNotifications,
    TextArea,
    TextInput,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { Building2, MessageCircle, X } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { ControlledRating } from './components'
import { industryRatingSchema } from './industryRatingSchema'
import { ratingFields, recommendationOptions } from './industryRatingData'
import { StudentApi } from '@queries'

export const IndustryRatingForm = ({ onClose }: any) => {
    const { notification } = useNotification()

    const studentIndustries = StudentApi.Profile.useIndustriesForFeedback()
    const [addFeedback, resultAddFeedback] =
        StudentApi.Profile.useAddFeedForIndustry()
    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(industryRatingSchema),
    })
    const selected = methods.watch('recommendation')
    const comments = methods.watch('comment') || ''
    const wordCount =
        comments.trim() === '' ? 0 : comments.trim().split(/\s+/).length
    const industryOptions =
        studentIndustries?.data &&
        studentIndustries?.data?.flatMap((workplace: any) =>
            workplace.industries.map((ind: any) => ({
                label: ind.industry.user.name, // user name
                value: ind.industry.id, // industry id
            }))
        )

    useEffect(() => {
        if (resultAddFeedback.isSuccess) {
            notification.success({
                title: 'Feedback Added',
                description: 'Your feedback has been successfully added',
            })
        }
    }, [resultAddFeedback.isSuccess])
    const onSubmit = (data: any) => {
        addFeedback({ body: data })
    }
    return (
        <>
            <ShowErrorNotifications result={resultAddFeedback} />
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full "
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="flex justify-end pr-4 pt-2">
                        <X className="cursor-pointer" onClick={onClose} />
                    </div>
                    <div className="max-w-4xl mx-auto  px-8 py-4 overflow-auto h-[44rem] remove-scrollbar">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-orange-600" />
                            </div>
                            <h1 className="text-orange-600">Industry Rating</h1>
                        </div>

                        <p className="text-gray-600 mb-8">
                            Rate your experience in this industry and share
                            insights for others
                        </p>
                        <div className="inline-block min-w-96">
                            <Select
                                name="industry"
                                options={industryOptions}
                                label="Select Industry"
                                onlyValue
                                placeholder="Select industry..."
                            />
                        </div>
                        {/* Ratings Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-6">
                                <Building2 className="w-5 h-5 text-blue-600" />
                                <h2 className="text-blue-600">
                                    Please rate this industry (1 = Poor, 5 =
                                    Excellent)
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {ratingFields.map((field) => (
                                    <ControlledRating
                                        key={field.name}
                                        {...field}
                                        control={methods.control}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Recommendation Section */}
                        <div className="mb-8">
                            <h3 className="text-blue-600 mb-4">
                                Would you recommend this industry to others
                                starting their career?
                            </h3>

                            <div className="flex gap-6">
                                {recommendationOptions.map(
                                    ({ value, label, color }) => (
                                        <label
                                            key={value}
                                            htmlFor={value}
                                            className={`flex items-center gap-2 cursor-pointer ${
                                                selected === value
                                                    ? 'font-semibold'
                                                    : ''
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                id={value}
                                                value={value}
                                                {...methods.register(
                                                    'recommendation',
                                                    { required: true }
                                                )}
                                                className="!hidden"
                                            />
                                            <div
                                                className={`w-6 h-6 rounded flex items-center justify-center bg-${color}-100`}
                                            >
                                                {selected === value && (
                                                    <div
                                                        className={`w-3 h-3 rounded-full bg-${color}-600`}
                                                    />
                                                )}
                                            </div>
                                            {label}
                                        </label>
                                    )
                                )}
                            </div>

                            {methods.formState.errors.recommendation && (
                                <p className="text-red-500 text-sm">
                                    Please select an option
                                </p>
                            )}
                        </div>

                        {/* Comments Section */}
                        <div className="mb-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5 text-orange-500" />
                                    <p className="text-orange-500">
                                        Please share your experience and any
                                        insights about this industry
                                    </p>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {wordCount} words
                                </span>
                            </div>

                            <TextArea
                                name="comment"
                                placeholder="Share your experiences, insights, and advice for others considering this industry..."
                                className="min-h-32 resize-none"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                text="Submit Rating"
                                variant="info"
                                loading={resultAddFeedback.isLoading}
                                disabled={resultAddFeedback.isLoading}
                                submit
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
