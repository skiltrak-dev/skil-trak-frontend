import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { UserRoles } from '@constants'
import { AuthLayout } from '@layouts'
import { SignUpUtils } from '@utils'

import {
    AuthBreadCrumb,
    BackButton,
    IndicatorStep,
    Typography,
} from '@components'

import { StepForm } from '@partials/student/tabs'
import { useState } from 'react'
import Head from 'next/head'

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

const StudentSignUp: NextPage = () => {
    const router = useRouter()

    const [currentStep, setCurrentStep] = useState<IndicatorStep>(FormSteps[0])

    const onSubmit = (values: any) => {
        SignUpUtils.setValuesToStorage({
            ...values,
            role: UserRoles.STUDENT,
            location: '34.1506,73.2013',
        })

        router.push('/auth/signup/notification-method')
    }

    return (
        <>
            <Head>
                <title>Student Sign Up</title>
                <meta
                    name="description"
                    content="Sign up as a Student on the platform"
                    key="desc"
                />
            </Head>
            <div className="md:pr-5 pr-0">
                {/* <BackButton />

                <div>
                    <Typography variant={'h1'}>
                        Create Your Student Account
                    </Typography>
                    <AuthBreadCrumb
                        breadcrumbs={[
                            {
                                link: '/auth/signup',
                                text: 'Portal Selection',
                            },
                            {
                                link: '#',
                                text: 'Student Account',
                                active: true,
                            },
                        ]}
                    />
                </div> */}

                <StepForm />
            </div>
        </>
    )
}

export default StudentSignUp
