import React, { useEffect, useRef, useState } from 'react'
// import ZoomMtgEmbedded from '@zoomus/websdk/embedded'
// import * as KJUR from 'jsrsasign'
import dynamic from 'next/dynamic'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
const KJUR = require('jsrsasign')
// import { ZoomMtg } from '@zoomus/websdk'
//
// import ZoomMtgEmbedded from '@zoomus/websdk/embedded'
// const ZoomMtgEmbedded = dynamic(() => import('@zoomus/websdk/embedded'), {
//     ssr: false,
//   });

const ZoomComponent = dynamic(() => import('./ZoomComponent'), { ssr: false })
// const KJUR = dynamic((): any => import('jsrsasign'), { ssr: false }) as any

export const generateSignature: any = (
    key: string,
    secret: string,
    meetingNumber: any,
    role: any
) => {
    const iat = Math.round(new Date().getTime() / 1000) - 30
    const exp = iat + 60 * 60 * 2
    const oHeader = { alg: 'HS256', typ: 'JWT' }

    const oPayload = {
        sdkKey: key,
        appKey: key,
        mn: meetingNumber,
        role: role,
        iat: iat,
        exp: exp,
        tokenExp: exp,
    }

    const sHeader = JSON.stringify(oHeader)
    const sPayload = JSON.stringify(oPayload)
    const sdkJWT = KJUR?.jws?.JWS.sign(
        'HS256',
        sHeader,
        sPayload,
        secret
    ) as any
    return sdkJWT
}
export const ZoomMeetingContainer = ({ profile }: { profile: any }) => {
    const router = useRouter()

    const appointment = CommonApi.Appointments.appointmentDetail(
        Number(router?.query?.appointment),
        {
            skip: !router?.query?.appointment,
        }
    )

    const [mount, setMount] = useState(false)

    useEffect(() => {
        if (!mount && window !== undefined) setMount(true)
    }, [])

    return mount && appointment?.data ? (
        <ZoomComponent appointment={appointment?.data} profile={profile} />
    ) : null
}
