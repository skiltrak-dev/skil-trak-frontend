import { ReactElement, useEffect, useState } from 'react'

import { BackButton, Card, TabNavigation, TabProps } from '@components'
import { useAlert, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { AppointmentType, NextPageWithLayout, Sector } from '@types'
import { SectorForm } from '@partials/admin/sector/form'
import { PageHeading } from '@components/headings'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { AppointmentTypeForm } from '@partials/admin/appointment-type/form'

const AppointmentTypeAddPage: NextPageWithLayout = () => {
    const router = useRouter()
    const { alert } = useAlert()
    const { notification } = useNotification()
    const navBar = useNavbar()

    const [add, addResult] = AdminApi.AppointmentTypes.useCreate()
    const [emailContent, setEmailContent] = useState('')

    useEffect(() => {
        navBar.setTitle('Appointment Types')
    }, [])

    const onSubmit = async (values: AppointmentType) => {
        await add({
            ...values,
            emailContent,
        })
    }

    useEffect(() => {
        if (!addResult.isUninitialized) {
            if (addResult.isSuccess) {
                router.push('/portals/admin/appointment-type')
                alert.success({
                    title: 'Appointment Type Added',
                    description: 'A new appointment type has been created',
                })
            }

            if (addResult.isError) {
                notification.error({
                    title: 'Failed to add appointment type',
                    description: 'New appointment type add failed',
                })
            }
        }
    }, [addResult])

    return (
        <div className="p-6 flex flex-col gap-y-4 pb-32">
            <BackButton text="Appointment Types" />
            <PageHeading
                title={'Add Appointment Type'}
                subtitle={`You are creating an appointment type`}
            ></PageHeading>
            <Card layout="wrap">
                <div className="">
                    <AppointmentTypeForm
                        onSubmit={onSubmit}
                        emailContent={emailContent}
                        setEmailContent={setEmailContent}
                    />
                </div>
            </Card>
        </div>
    )
}

AppointmentTypeAddPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AppointmentTypeAddPage
