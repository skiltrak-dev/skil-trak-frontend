import React, { ReactElement } from 'react'
import { SubAdminApi } from '@queries'
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { FormProvider, useForm } from 'react-hook-form'
import { TextInput } from '@components'

const WpAppReq: NextPageWithLayout = () => {
    const [appReq, appReqResult] = SubAdminApi.Workplace.removeWPApprovalReq()

    const formMethods = useForm({
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        appReq(values?.id)
    }
    return (
        <div>
            <FormProvider {...formMethods}>
                <form
                    className="flex flex-col gap-y-4"
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                >
                    <TextInput name="id" />
                </form>
            </FormProvider>
        </div>
    )
}

WpAppReq.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default WpAppReq
