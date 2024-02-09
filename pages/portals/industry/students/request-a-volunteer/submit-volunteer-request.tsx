import { ActionAlert, Card, ShowErrorNotifications } from '@components'
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
        requestAVolunteer(values)
    }

    return (
        <>
            <ShowErrorNotifications result={requestAVolunteerResult} />
            <div className="w-full md:w-2/3 lg:w-1/2">
                <PageHeading
                    title={'Create Volunteer Request'}
                    subtitle={`You are creating volunteer request`}
                />
                {requestAVolunteerResult.isSuccess ? (
                    <Card>
                        <ActionAlert
                            title="Volunteer Request Created"
                            description="Your request has been created successfully"
                            variant="primary"
                        />
                    </Card>
                ) : (
                    <CreateVolunteerRequest
                        result={requestAVolunteerResult}
                        onSubmit={onVolunteer}
                    />
                )}
            </div>
        </>
    )
}

SubmitVolunteerRequests.getLayout = (page: ReactElement) => {
    return <IndustryStudentsLayout>{page}</IndustryStudentsLayout>
}

export default SubmitVolunteerRequests
