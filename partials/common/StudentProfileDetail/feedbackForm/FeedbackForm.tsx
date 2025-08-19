'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../../../../styles/custom-form.css'
import { stepVariants } from './animations'
import stepsConfig from './config'
import { FormFieldRenderer } from './FormFieldRenderer'
import { FormHeader } from './FormHeader'
import { FormNavigation } from './FormNavigation'
import { useAutoSave } from './hooks/useAutoSave'
import { useStepValidation } from './hooks/useStepValidation'
import { ThankYouModal } from './modals/ThankYouModal'
import { WelcomeModal } from './modals/WelcomeModal'
import { StepCard } from './steps/StepCard'
import { formSchema, type FormData } from './types'
import { CommonApi } from '@queries'
import { X } from 'lucide-react'
const initialFormData: FormData = {
    overallSatisfaction: '',
    enjoyedMost: '',
    challenges: '',
    skillsGained: '',
    skillsExamples: '',
    confidence: '',
    professionalism: 0,
    communication: 0,
    supportMentorship: 0,
    learningOpportunities: 0,
    recommendEmployer: '',
    employerFeedback: '',
    skilltrakSupport: '',
    skilltrakCommunication: '',
    skilltrakImprovement: '',
    finalComments: '',
}

export const FeedbackForm = ({
    stdUserId,
    onClose,
    courseId,
}: {
    stdUserId?: any
    onClose: any
    courseId: any
}) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isSaving, setIsSaving] = useState(false)
    const [showThankYou, setShowThankYou] = useState<any>(null)
    const [placementFeedback, resultPlacementFeedback] =
        CommonApi.Feedback.usePlacementFeedback()
    const defaultValues: FormData = {
        overallSatisfaction: '',
        enjoyedMost: '',
        challenges: '',
        skillsGained: '',
        skillsExamples: '',
        confidence: '',
        professionalism: 0,
        communication: 0,
        supportMentorship: 0,
        learningOpportunities: 0,
        recommendEmployer: '',
        employerFeedback: '',
        skilltrakSupport: '',
        skilltrakCommunication: '',
        skilltrakImprovement: '',
        finalComments: '',
    }

    const {
        control,
        handleSubmit,
        trigger,
        watch,
        getValues,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormData>({
        resolver: yupResolver(formSchema),
        defaultValues,
        mode: 'onChange', // Validate on change for immediate feedback
        criteriaMode: 'all', // Show all validation errors
    })
    const { validateCurrentStep, validateAllSteps } = useStepValidation(
        trigger,
        stepsConfig
    )
    const totalSteps = stepsConfig.length
    // Auto-save handler (replace with API call or persistence logic)
    const autoSaveData = async (data: FormData) => {
        setIsSaving(true)
        console.log('Auto-saved form data:', data)
    }

    useAutoSave(watch, autoSaveData, 2000)

    const handleNext = async () => {
        const isValid = await validateCurrentStep(currentStep)
        if (isValid) {
            setCurrentStep((s) => Math.min(totalSteps - 1, s + 1))
        }
        console.log(
            'stepsConfig[currentStep].title',
            stepsConfig[currentStep].description
        )
    }

    const handlePrevious = () => {
        setCurrentStep((s) => Math.max(0, s - 1))
    }
    const processSubmission = (submittedData: any) => {
        const questionAnswerPairs = stepsConfig
            .flatMap((step) =>
                step.fields.map((field) => {
                    const value = submittedData[field.key]
                    if (value !== undefined) {
                        return {
                            question: field.label,
                            answer: value,
                            key: field.key,
                            step: step.title,
                        }
                    }
                    return null
                })
            )
            .filter((item) => item !== null)

        console.log('Question-Answer Pairs:', questionAnswerPairs)
        return questionAnswerPairs
    }
    const onSubmit = async (data: any) => {
        const questionAnswerPairs = processSubmission(data)
        try {
            setIsSaving(true)

            // Calculate host employer rating
            const hostEmployerRating =
                (data.professionalism +
                    data.communication +
                    data.supportMentorship +
                    data.learningOpportunities) /
                4

            const submissionData = {
                ...data,
                hostEmployerRating,
                submittedAt: new Date().toISOString(),
            }
            placementFeedback({
                stdUserId: stdUserId || undefined,
                body: { ...submissionData, course: courseId },
            })
            console.log('Form submitted:', submissionData)
        } catch (error) {
            console.error('Submission failed:', error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleFormSubmit = async () => {
        // Final validation before submission
        const isFormValid = await validateAllSteps()
        if (isFormValid) {
            handleSubmit(onSubmit)()
        }
    }

    // Helper to get current step errors for better UX
    const getCurrentStepErrors = () => {
        const currentStepFields =
            stepsConfig[currentStep]?.fields?.map((f: any) => f.key) || []
        return Object.keys(errors).filter((key) =>
            currentStepFields.includes(key)
        )
    }

    useEffect(() => {
        if (resultPlacementFeedback.isSuccess) {
            setShowThankYou(
                <ThankYouModal
                    setShowThankYou={setShowThankYou}
                    showThankYou={showThankYou}
					onClose={onClose}
                />
            )
        }
    }, [resultPlacementFeedback.isSuccess])

    return (
        <>
            {showThankYou && showThankYou}
            <div className="flex justify-end p-4" onClick={onClose}>
                <X className="text-red-400d" size={30} />
            </div>
            <div className="custom-form overflow-auto remove-scrollbar h-[32rem] rounded-md">
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50  relative overflow-hidden">
                    <div className="max-w-4xl mx-auto p-6 space-y-8 relative">
                        <FormHeader
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            // hasErrors={getCurrentStepErrors().length > 0}
                            // isSaving={isSaving}
                        />

                        <form className="space-y-8">
                            {/* Show validation summary if there are errors */}
                            {getCurrentStepErrors().length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <h4 className="text-red-800 font-medium mb-2">
                                        Please complete the following:
                                    </h4>
                                    <ul className="text-red-700 text-sm space-y-1">
                                        {getCurrentStepErrors().map((key) => (
                                            <li key={key}>
                                                •{' '}
                                                {
                                                    errors[
                                                        key as keyof FormData
                                                    ]?.message
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={stepsConfig[currentStep].id}
                                    variants={stepVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{
                                        duration: 0.5,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    <StepCard
                                        title={stepsConfig[currentStep].title}
                                        description={
                                            stepsConfig[currentStep].description
                                        }
                                        icon={stepsConfig[currentStep].icon}
                                        color={stepsConfig[currentStep].color}
                                    >
                                        <FormFieldRenderer
                                            stepIndex={currentStep}
                                            control={control}
                                            errors={errors}
                                            stepsConfig={stepsConfig}
                                        />
                                    </StepCard>
                                </motion.div>
                            </AnimatePresence>

                            <FormNavigation
                                currentStep={currentStep}
                                totalSteps={totalSteps}
                                isSaving={isSaving || isSubmitting}
                                onPrevious={handlePrevious}
                                onNext={handleNext}
                                onSubmit={handleFormSubmit}
                                // hasCurrentStepErrors={
                                // 	getCurrentStepErrors().length > 0
                                // }
                            />
                        </form>
                    </div>

                    {/* Welcome Dialog (kept simpler for readability) */}
                    {/* <WelcomeModal /> */}

                    {/* Thank You Dialog */}
                </div>
            </div>
        </>
    )
}
