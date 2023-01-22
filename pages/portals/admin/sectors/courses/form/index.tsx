import { ReactElement, useEffect, useState } from 'react'

import { BackButton, Card, Popup } from '@components'
import { PageHeading } from '@components/headings'
import { useAlert, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { CourseForm } from '@partials/admin/sector/form'
import { AdminApi } from '@queries'
import { Course, NextPageWithLayout, Sector } from '@types'
import { useRouter } from 'next/router'

const CourseAddPage: NextPageWithLayout = () => {
    const router = useRouter()
    const { alert } = useAlert()
    const { notification } = useNotification()
    const navBar = useNavbar()

    const [add, addResult] = AdminApi.Courses.useAddMutation()
    const [requirementFile, setRequirementFile] = useState<any>(null)

    useEffect(() => {
        navBar.setTitle('Courses')
    }, [])

    const onSubmit = async (values: any) => {
        const body = {
            ...values,
            sector: values.sector.value,
            ...(requirementFile ? { requirements: requirementFile } : {}),
        }
        await add(body)
    }

    useEffect(() => {
        if (!addResult.isUninitialized) {
            if (addResult.isSuccess) {
                router.push('/portals/admin/sectors?tab=courses')
                alert.success({
                    title: 'Course Added',
                    description: 'A new course has been created',
                })
            }

            if (addResult.isError) {
                notification.error({
                    title: 'Failed to add course',
                    description: 'New course add failed',
                })
            }
        }
    }, [addResult])

    return (
        <div className="p-6 flex flex-col gap-y-4 mb-32">
            <BackButton text="Courses" />
            <PageHeading
                title={'Add Course'}
                subtitle={`You are creating a course`}
            ></PageHeading>
            <Card>
                {addResult.isLoading || addResult.isSuccess ? (
                    <Popup
                        title="Submitting..."
                        subtitle="You will be redirected on submission"
                        variant="info"
                    />
                ) : (
                    <CourseForm
                        result={addResult}
                        onSubmit={onSubmit}
                        requirementFile={requirementFile}
                        setRequirementFile={setRequirementFile}
                    />
                )}
            </Card>
        </div>
    )
}

CourseAddPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default CourseAddPage
