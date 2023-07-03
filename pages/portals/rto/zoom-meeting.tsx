import { RtoLayout } from '@layouts'
import { ZoomMeetingContainer } from '@partials/common/ZoomMeeting'
import { AdminApi } from '@queries'
import { isBrowser } from '@utils'

import { ReactElement, useEffect, useState } from 'react'

const ZoomMeeting = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const profile = AdminApi.Admin.useProfile()

    return isBrowser() ? <ZoomMeetingContainer profile={profile?.data} /> : null
}

export default ZoomMeeting

ZoomMeeting.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}
