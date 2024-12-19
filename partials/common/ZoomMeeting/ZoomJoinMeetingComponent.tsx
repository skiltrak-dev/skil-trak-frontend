import { getUserCredentials } from '@utils'
import { ZoomMtg } from '@zoomus/websdk'
import { useEffect, useRef } from 'react'
import { generateSignature } from './ZoomMeetingContainer'
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

const ZoomJoinMeetingComponent = ({
    appointment,
    profile,
}: {
    appointment: any
    profile: any
}) => {
    const ref = useRef<any>(null)

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

    function getSignature(e?: any) {
        e && e.preventDefault()

        fetch(authEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                meetingNumber: meetingNumber,
                role: role,
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                startMeeting(response.signature)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function startMeeting(signature: any) {
        // document.getElementById('zmmtg-root').style.display = 'block'
        ref.current.style.display = 'block'

        ZoomMtg.init({
            leaveUrl,
            success: (success: any) => {
                ZoomMtg.join({
                    signature,
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
    }
    return (
        <>
            {' '}
            <div ref={ref}>ZoomJoinMeeting</div>
            {/* <button onClick={getSignature}>Join Meeting</button> */}
        </>
    )
}

export default ZoomJoinMeetingComponent
