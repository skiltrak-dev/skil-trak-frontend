import { AdminLayout, IndustryLayout } from '@layouts'
import { ZoomMeetingContainer } from '@partials/common/ZoomMeeting'
import { ZoomJoinMeeting } from '@partials/common/ZoomMeeting/ZoomJoinMeeting'
import { AdminApi } from '@queries'
import { isBrowser } from '@utils'
import dynamic from 'next/dynamic'

import React, { ReactElement, useEffect, useState } from 'react'

const ZoomMeeting = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const profile = AdminApi.Admin.useProfile()

    return isBrowser() && profile?.data ? (
        <ZoomJoinMeeting profile={{ ...profile?.data, user: profile?.data }} />
    ) : null
}

export default ZoomMeeting

ZoomMeeting.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}
