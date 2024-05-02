import {
    IndicatorChildrenPropType,
    IndicatorStep,
    StepIndicator,
} from '@components'
import { useRouter } from 'next/router'
import { StepAccountInfo } from './StepAccountInfo'
import { StepCreate } from './StepCreate'
import { StepNotificationMethod } from './StepNotificationMethod'
import { StepReviewInfo } from './StepReviewInfo'

export const StepForm = () => {
    const router = useRouter()
    const { query } = router

    const FormSteps: IndicatorStep[] = [
        {
            label: 'Account Info',
            visited: true,
            query: 'account-info',
            element: <StepAccountInfo />,
        },
        {
            label: 'Notification Method',
            visited: false,
            query: 'notification-method',
            element: <StepNotificationMethod />,
        },
        {
            label: 'Review Info',
            visited: false,
            query: 'review-info',
            element: <StepReviewInfo />,
        },
        {
            label: 'Account Request',
            visited: false,
            last: true,
            query: 'requested',
            element: <StepCreate />,
        },
    ]

    const currentStep = FormSteps.find((step) => query.step === step.query)

    return (
        <div>
            {currentStep ? (
                <StepIndicator
                    steps={FormSteps}
                    currentStep={currentStep!!}
                    horizontal
                >
                    {({ steps, element }: IndicatorChildrenPropType) => {
                        return (
                            <div>
                                <div>{steps}</div>
                                <div className="mt-6">{element}</div>
                            </div>
                        )
                    }}
                </StepIndicator>
            ) : (
                <div></div>
            )}
        </div>
    )
}
