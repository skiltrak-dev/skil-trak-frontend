import ZoomMtgEmbedded from '@zoomus/websdk/embedded'
import { useEffect, useRef } from 'react'

import { Appointment, User } from '@types'
import { getUserCredentials } from '@utils'
import { ZoomMtg } from '@zoomus/websdk'
import { useRouter } from 'next/router'
import { generateSignature } from './ZoomMeetingContainer'
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

const ZoomComponent = ({
    appointment,
    profile,
}: {
    appointment: Appointment
    profile: { user: User }
}) => {
    const ref = useRef<any>()

    const router = useRouter()

    const urlRole =
        getUserCredentials()?.role === 'subadmin'
            ? 'sub-admin'
            : getUserCredentials()?.role

    var authEndpoint =
        'https://us05web.zoom.us/s/85604338509?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6InpDelQ3OER0VGtlc3Q0WDNkcWJjSkEiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEsIndjZCI6InVzMDUiLCJjbHQiOjAsIm1udW0iOiI4NTYwNDMzODUwOSIsImV4cCI6MTY4NzI2NDk1MywiaWF0IjoxNjg3MjU3NzUzLCJhaWQiOiJjbHlZem5CcVM4aWhEWWY5aFpJbzRBIiwiY2lkIjoiIn0.jx4CULEN7vFnCu9wO_ZreSdrWz8EC4EEKSiFh9mW4hI'
    var sdkKey = '_JpCHmUwQfmP1bB7gRKGqw'
    var meetingNumber =
        Number(
            appointment?.startUrl
                ?.split('?zak=')[0]
                ?.split('https://us05web.zoom.us/s/')[1]
        ) || 0
    var passWord = appointment?.joinUrl?.split('pwd=')[1]
    var role = 0
    var userName = profile?.user?.name
    var userEmail = profile?.user?.email
    var registrantToken = ''
    var zakToken = appointment?.startUrl?.split('zak=')[1]
    var leaveUrl = `${window.location?.origin}/portals/${urlRole}`

    const client = ZoomMtgEmbedded.createClient()

    useEffect(() => {
        if (ref.current) {
            client?.init({ zoomAppRoot: ref.current, language: 'en-US' })

            client?.join({
                signature:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJfSnBDSG1Vd1FmbVAxYkI3Z1JLR3F3IiwiYXBwS2V5IjoiX0pwQ0htVXdRZm1QMWJCN2dSS0dxdyIsIm1uIjoxMjM0NTY3ODksInJvbGUiOjEsImlhdCI6MTY4NzMzMzIzNiwiZXhwIjoxNjg3MzQwNDM2LCJ0b2tlbkV4cCI6MTY4NzM0MDQzNn0.qC6X6N0xjJ1lS3bMtDedBPY-jsyquwUMu3dl6JcpKAM',
                sdkKey: 'xBUoRawFkQYpg1mLeVkS5dSTaZ8F0IMS',
                meetingNumber: '12',
                password: '',
                userName: 'Saad',
                userEmail: '',
                zak: 'eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6InpDelQ3OER0VGtlc3Q0WDNkcWJjSkEiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEsIndjZCI6InVzMDUiLCJjbHQiOjAsIm1udW0iOiI4NTYwNDMzODUwOSIsImV4cCI6MTY4NzI2NDk1MywiaWF0IjoxNjg3MjU3NzUzLCJhaWQiOiJjbHlZem5CcVM4aWhEWWY5aFpJbzRBIiwiY2lkIjoiIn0.jx4CULEN7vFnCu9wO_ZreSdrWz8EC4EEKSiFh9mW4hI',
            })
        }
    }, [ref.current])

    useEffect(() => {
        ZoomMtg.init({
            leaveUrl,
            success: (success: any) => {
                ZoomMtg.join({
                    signature: generateSignature(
                        '_JpCHmUwQfmP1bB7gRKGqw',
                        'xBUoRawFkQYpg1mLeVkS5dSTaZ8F0IMS',
                        Number(
                            appointment?.startUrl
                                ?.split('?zak=')[0]
                                ?.split('https://us05web.zoom.us/s/')[1]
                        ) || 0,
                        0
                    ),
                    sdkKey,
                    meetingNumber,
                    passWord,
                    userName,
                    userEmail,
                    tk: registrantToken,
                    zak: zakToken,
                    success: (success: any) => {
                        console.log(success)
                    },
                    error: (error: any) => {
                        console.log(error)
                    },
                })
            },
            error: (error: any) => {
                console.log(error)
            },
        })
    }, [])

    return <div ref={ref} className="w-96 h-96"></div>
}

export default ZoomComponent
