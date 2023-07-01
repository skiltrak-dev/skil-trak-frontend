import { ReactElement, useEffect, useState } from 'react'

import {
    BackButton,
    Card,
    LoadingAnimation,
    TabNavigation,
    TabProps,
} from '@components'
import { useAlert, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { AppointmentType, NextPageWithLayout, Sector } from '@types'
import { SectorForm } from '@partials/admin/sector/form'
import { PageHeading } from '@components/headings'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { AppointmentTypeForm } from '@partials/admin/appointment-type/form'

const AppointmentTypeEditPage: NextPageWithLayout = () => {
    const router = useRouter()
    const { alert } = useAlert()
    const { notification } = useNotification()
    const navBar = useNavbar()
    const id = Number(router.query?.id || -1)

    const [update, updateResult] = AdminApi.AppointmentTypes.useUpdate()
    const { data, isLoading } = AdminApi.AppointmentTypes.useDetail(id, {
        skip: !id,
    })
    const [emailContent, setEmailContent] = useState(data?.emailContent || '')

    useEffect(() => {
        navBar.setTitle('Appointment Types')
    }, [])

    const onSubmit = async (values: AppointmentType) => {
        await update({
            ...values,
            emailContent,
        })
    }

    useEffect(() => {
        if (!updateResult.isUninitialized) {
            if (updateResult.isSuccess) {
                router.push('/portals/admin/appointment-type')
                alert.info({
                    title: 'Appointment Type Updated',
                    description: 'A new appointment type has been updated',
                })
            }

            if (updateResult.isError) {
                notification.error({
                    title: 'Failed to update appointment type',
                    description: 'New appointment type update failed',
                })
            }
        }
    }, [updateResult])

    return (
        <div className="p-6 flex flex-col gap-y-4 pb-64">
            <BackButton text="Appointment Types" />
            <PageHeading
                title="Edit Appointment Type"
                subtitle={`You are editing an appointment type`}
            ></PageHeading>
            <Card>
                {data && !isLoading ? (
                    <AppointmentTypeForm
                        edit
                        onSubmit={onSubmit}
                        emailContent={data?.emailContent || ''}
                        setEmailContent={setEmailContent}
                        initialValues={data}
                    />
                ) : (
                    <LoadingAnimation />
                )}
            </Card>
        </div>
    )
}

AppointmentTypeEditPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AppointmentTypeEditPage
