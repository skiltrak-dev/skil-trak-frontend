import { ReactElement, useEffect, useState } from 'react'

import { BackButton, Card, LoadingAnimation, Popup } from '@components'
import { PageHeading } from '@components/headings'
import { useAlert, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { CourseForm, SectorForm } from '@partials/admin/sector/form'
import { AdminApi } from '@queries'
import { Course, NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'

const CourseEditPage: NextPageWithLayout = () => {
    const router = useRouter()
    const { alert } = useAlert()
    const { notification } = useNotification()
    const navBar = useNavbar()
    const id = Number(router.query?.id || -1)

    const [update, updateResult] = AdminApi.Courses.useUpdateMutation()
    const { data, isLoading } = AdminApi.Courses.useDetailQuery(id, {
        skip: !id,
    })

    const [requirementFile, setRequirementFile] = useState<any>(null)

    useEffect(() => {
        navBar.setTitle('Edit Course')
    }, [])

    const onSubmit = async (values: any) => {
        const body = {
            id: id,
            ...values,
            sector: values.sector.value,
            ...(requirementFile ? { requirements: requirementFile } : {}),
        }
        await update(body)
    }

    useEffect(() => {
        if (!updateResult.isUninitialized) {
            if (updateResult.isSuccess) {
                router.push('/portals/admin/sectors?tab=courses')
                alert.info({
                    title: 'Course Updated',
                    description: `Course '${data?.title}' has been updated`,
                })
            }

            if (updateResult.isError) {
                notification.error({
                    title: 'Failed to update course',
                    description: 'New course add failed',
                })
            }
        }
    }, [updateResult])

    return (
        <div className="p-6 flex flex-col gap-y-4">
            <BackButton text="Courses" />
            <PageHeading
                title="Edit Course"
                subtitle={`You are editing a course`}
            ></PageHeading>
            <Card>
                {data && !isLoading ? (
                    updateResult.isLoading || updateResult.isSuccess ? (
                        <Popup
                            title="Updating..."
                            subtitle="You will be redirected on submission"
                            variant="info"
                        />
                    ) : (
                        <CourseForm
                            onSubmit={onSubmit}
                            edit={true}
                            initialValues={data}
                            requirementFile={requirementFile}
                            setRequirementFile={setRequirementFile}
                        />
                    )
                ) : (
                    <LoadingAnimation />
                )}
            </Card>
        </div>
    )
}

CourseEditPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default CourseEditPage
