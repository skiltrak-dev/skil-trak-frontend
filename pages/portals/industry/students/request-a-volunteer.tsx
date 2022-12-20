import { RequestAVolunteerStudent } from '@components/sections'
import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const RequestAVolunteer: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    return (
        <div>
            <RequestAVolunteerStudent />
        </div>
    )
}

RequestAVolunteer.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default RequestAVolunteer
