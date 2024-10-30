import { Typography } from '@components'
import { SimpleLayout } from '@layouts'
import { StepForm } from '@partials/student/tabs'
import { NextPageWithLayout } from '@types'
import Head from 'next/head'
import Link from 'next/link'
import { ReactElement } from 'react'

const StudentSignUp: NextPageWithLayout = () => {
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

StudentSignUp.getLayout = (page: ReactElement) => {
    return <SimpleLayout>{page}</SimpleLayout>
}

export default StudentSignUp
