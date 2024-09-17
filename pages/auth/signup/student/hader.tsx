import { SimpleLayout } from '@layouts'
import { StepForm } from '@partials/student/tabs'
import { NextPageWithLayout } from '@types'
import Head from 'next/head'
import { ReactElement } from 'react'

const RtoStudentSignUp: NextPageWithLayout = () => {
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
                <StepForm />
            </div>
        </>
    )
}

RtoStudentSignUp.getLayout = (page: ReactElement) => {
    return <SimpleLayout>{page}</SimpleLayout>
}

export default RtoStudentSignUp
