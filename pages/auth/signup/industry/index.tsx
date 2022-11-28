import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { SignUpUtils } from '@utils'
import { AuthLayout } from '@layouts'
import { UserRoles } from '@constants'

import {
    Typography,
    BackButton,
    AuthBreadCrumb,
    StepIndicator,
    IndicatorStep,
} from '@components'

import { RtoSignUpForm } from '@components/forms'
import { useState } from 'react'
import { StepForm } from '@partials/industry/tabs'

const FormSteps: IndicatorStep[] = [
    {
        label: 'Account Info',
        visited: true,
    },
    {
        label: 'Notification Method',
        visited: false,
    },
    {
        label: 'Review Info',
        visited: false,
    },
    {
        label: 'Wait For Approval',
        visited: false,
        last: true,
    },
]

const IndustrySignUp: NextPage = () => {
    const router = useRouter()

    const [currentStep, setCurrentStep] = useState<IndicatorStep>(FormSteps[0])

    const onSubmit = (values: any) => {
        SignUpUtils.setValuesToStorage({
            ...values,
            role: UserRoles.INDUSTRY,
            location: '34.1506,73.2013',
        })

        router.push('/auth/signup/notification-method')
    }

    return (
        <AuthLayout type="sign-up">
            <div className="max-w-screen-xl mx-auto my-5 px-2 xl:px-0">
                <BackButton />

                <div>
                    <Typography variant={'h3'}>
                        Create Your RTO Account
                    </Typography>
                    <AuthBreadCrumb
                        breadcrumbs={[
                            {
                                link: '/auth/signup',
                                text: 'Portal Selection',
                            },
                            {
                                link: '#',
                                text: 'Industry Account',
                                active: true,
                            },
                        ]}
                    />
                </div>

                <StepForm />
            </div>
        </AuthLayout>
    )
}

export default IndustrySignUp
