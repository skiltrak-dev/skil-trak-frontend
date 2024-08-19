import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { UserRoles } from '@constants'
import { AuthLayout, SimpleLayout } from '@layouts'
import { SignUpUtils } from '@utils'

import {
    AuthBreadCrumb,
    BackButton,
    IndicatorStep,
    Typography,
} from '@components'

import { StepForm } from '@partials/industry/tabs'
import { ReactElement, useState } from 'react'
import Head from 'next/head'
import { NextPageWithLayout } from '@types'

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

const IndustrySignUp: NextPageWithLayout = () => {
    const router = useRouter()

    const [currentStep, setCurrentStep] = useState<IndicatorStep>(FormSteps[0])

    const onSubmit = (values: any) => {
        SignUpUtils.setValuesToStorage({
            ...values,
            role: UserRoles.INDUSTRY,
        })

        router.push('/auth/signup/notification-method')
    }

    return (
        <>
            <Head>
                <title>Industry Sign Up</title>
                <meta
                    name="description"
                    content="Sign up as an Industry on the platform"
                    key="desc"
                />
            </Head>
            <div className="md:pr-5 pr-0">
                {/* <BackButton />

                <div>
                    <Typography variant={'h1'}>
                        Create Your Industry Account
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
                </div> */}

                <StepForm />
            </div>
        </>
    )
}

IndustrySignUp.getLayout = (page: ReactElement) => {
    return <SimpleLayout>{page}</SimpleLayout>
}

export default IndustrySignUp
