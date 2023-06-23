import { CommonApi } from '@queries'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

const ZoomJoinMeetingComponent = dynamic(
    () => import('./ZoomJoinMeetingComponent'),
    { ssr: false }
)

export const ZoomJoinMeeting = ({ profile }: { profile: any }) => {
    const [mount, setMount] = useState<boolean>(false)

    const router = useRouter()

    const appointment = CommonApi.Appointments.appointmentDetail(
        Number(router?.query?.appointment),
        {
            skip: !router?.query?.appointment,
        }
    )

    useEffect(() => {
        if (!mount) setMount(true)
    }, [])

    return mount && appointment?.data ? (
        <ZoomJoinMeetingComponent
            appointment={appointment?.data}
            profile={profile}
        />
    ) : null
}
