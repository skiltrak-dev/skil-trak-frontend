import { ShowErrorNotifications } from '@components'
import { PageHeading } from '@components/headings'
import { useNotification } from '@hooks'
import {
    CreateVolunteerRequest,
    IndustryStudentsLayout,
} from '@partials/industry'
import { useRequestAVolunteerMutation } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const SubmitVolunteerRequests: NextPageWithLayout = () => {
    const router = useRouter()

    const { notification } = useNotification()

    const [requestAVolunteer, requestAVolunteerResult] =
        useRequestAVolunteerMutation()

    const onVolunteer = (values: any) => {
        requestAVolunteer(values)?.then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Volunteer Request Created',
                    description: 'Your request has been created successfully',
                })
                router.back()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={requestAVolunteerResult} />
            <div className="w-full md:w-2/3 lg:w-1/2">
                <PageHeading
                    title={'Create Volunteer Request'}
                    subtitle={`You are creating volunteer request`}
                />
                <CreateVolunteerRequest
                    result={requestAVolunteerResult}
                    onSubmit={onVolunteer}
                />
            </div>
        </>
    )
}

SubmitVolunteerRequests.getLayout = (page: ReactElement) => {
    return <IndustryStudentsLayout>{page}</IndustryStudentsLayout>
}

export default SubmitVolunteerRequests
