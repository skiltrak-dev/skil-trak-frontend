import { useEffect, useState } from 'react'
import { IndicatorStep, StepIndicator } from '@components'
import { UserRoles } from '@constants'
import { RtoSignUpForm } from '@partials/rto/forms'
import { SignUpUtils } from '@utils'
import { useRouter } from 'next/router'
import { StepAccountInfo } from './StepAccountInfo'
import { StepNotificationMethod } from './StepNotificationMethod'
import { StepReviewInfo } from './StepReviewInfo'
import { StepCreate } from './StepCreate'
import { StepOnBoarding } from './StepOnBoarding'

export const StepForm = () => {
    const router = useRouter()
    const { query } = router
    console.log("router", query);

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
            label: 'On Boarding',
            visited: false,
            query: 'on-boarding',
            element: <StepOnBoarding />
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
                    {({ steps, element }: any) => {
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
