import { StudentLayout, SubAdminLayout } from '@layouts'
import { ZoomJoinMeeting } from '@partials/common/ZoomMeeting/ZoomJoinMeeting'
import { useGetStudentProfileDetailQuery } from '@queries'
import { isBrowser } from '@utils'

import { ReactElement, useEffect, useState } from 'react'

const ZoomMeeting = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const { data, isLoading } = useGetStudentProfileDetailQuery()

    return isBrowser() && data ? (
        <>
            <ZoomJoinMeeting profile={data} />
            {/* <ZoomMeetingContainer /> */}
        </>
    ) : null
}

export default ZoomMeeting

ZoomMeeting.getLayout = (page: ReactElement) => {
    return <StudentLayout>{page}</StudentLayout>
}
