import { AdminLayout, SubAdminLayout } from '@layouts'
import { ZoomMeetingContainer } from '@partials/common/ZoomMeeting'
import { ZoomJoinMeeting } from '@partials/common/ZoomMeeting/ZoomJoinMeeting'
import { SubAdminApi } from '@queries'
import { isBrowser } from '@utils'

import { ReactElement, useEffect, useState } from 'react'

const ZoomMeeting = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const { data } = SubAdminApi.SubAdmin.useProfile()

    return isBrowser() && data ? (
        <>
            <ZoomJoinMeeting profile={data} />
            {/* <ZoomMeetingContainer /> */}
        </>
    ) : null
}

export default ZoomMeeting

ZoomMeeting.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}
