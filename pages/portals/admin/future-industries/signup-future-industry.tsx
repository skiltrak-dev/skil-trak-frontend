import { ReactElement } from 'react'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { FutureIndustrySignUpForm } from '@partials/common'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'

const SignUpFutureIndustryPage: NextPageWithLayout = () => {
    const router = useRouter()
    const [register, registerResult] =
        AdminApi.Admin.useRegisterByFutureIndustry()
    const onSubmit = (values: any) => {
        register({
            ...values,
            role: 'industry',
            sectors: values.sectors.map((s: any) => s.value),
            courses: values.courses.map((c: any) => c.value),
        })
        router.push(
            '/portals/admin/future-industries?tab=all&page=1&pageSize=50'
        )
    }
    return (
        <>
            <FutureIndustrySignUpForm
                onSubmit={onSubmit}
                result={registerResult}
            />
        </>
    )
}

SignUpFutureIndustryPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default SignUpFutureIndustryPage
