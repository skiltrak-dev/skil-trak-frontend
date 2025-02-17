import { useRouter } from 'next/router'

import { UserRoles } from '@constants'
import { SignUpUtils } from '@utils'

import { IndicatorStep, Typography } from '@components'

import { SimpleLayout } from '@layouts'
import { StepForm } from '@partials/rto/tabs'
import { NextPageWithLayout } from '@types'
import Head from 'next/head'
import Link from 'next/link'
import { ReactElement, useState } from 'react'

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
        label: 'Package Selection',
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

const RtoSignUp: NextPageWithLayout = () => {
    const router = useRouter()

    const [currentStep, setCurrentStep] = useState<IndicatorStep>(FormSteps[0])

    const onSubmit = (values: any) => {
        SignUpUtils.setValuesToStorage({
            ...values,
            role: UserRoles.RTO,
            location: '34.1506,73.2013',
        })

        router.push('/auth/signup/notification-method')
    }

    return (
        <>
            <Head>
                <title>RTO Sign Up</title>
                <meta
                    name="description"
                    content="Sign up as a RTO"
                    key="desc"
                />
            </Head>
            <div className="md:pr-5 pr-0 ">
                {/* <BackButton /> */}

                {/* <div className="">
                    <Typography variant={'h1'} color="text-[#255168]">
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
                                text: 'RTO Account',
                                active: true,
                            },
                        ]}
                    />
                </div> */}
                <Typography variant="small" color="text-gray-500">
                    Already have an account{' '}
                    <Link href={'/auth/login'} className="text-blue-500">
                        Login
                    </Link>
                </Typography>
                <StepForm />
            </div>
        </>
    )
}

RtoSignUp.getLayout = (page: ReactElement) => {
    return <SimpleLayout>{page}</SimpleLayout>
}

export default RtoSignUp
