import { IndustryStudentsLayout, VolunteerRequests } from '@partials/industry'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const RequestAVolunteer: NextPageWithLayout = () => {
    return (
        <div>
            <VolunteerRequests />
        </div>
    )
}

RequestAVolunteer.getLayout = (page: ReactElement) => {
    return <IndustryStudentsLayout>{page}</IndustryStudentsLayout>
}

export default RequestAVolunteer
