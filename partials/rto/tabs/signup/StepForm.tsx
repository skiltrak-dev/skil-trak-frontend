import { IndicatorStep, StepIndicator } from '@components'
import { UserRoles } from '@constants'
import { RtoSignUpForm } from '@partials/rto/forms'
import { SignUpUtils } from '@utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { StepAccountInfo } from './StepAccountInfo'
import { StepNotificationMethod } from './StepNotificationMethod'
import { StepPackageSelection } from './StepPackageSelection'
import { StepReviewInfo } from './StepReviewInfo'
import { StepCreate } from './StepCreate'

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
            label: 'Package Selection',
            visited: false,
            query: 'package-selection',
            element: <StepPackageSelection />,
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
