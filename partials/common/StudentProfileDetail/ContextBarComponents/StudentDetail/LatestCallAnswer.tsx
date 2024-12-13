import React, { useState } from 'react'
import { CallLog } from '@types'
import { SubAdminApi } from '@queries'
import { CallType } from '@partials/sub-admin/students'
import { useNotification } from '@hooks'
import { ImPhone, ImPhoneHangUp } from 'react-icons/im'
import { LoadingAnimation, ShowErrorNotifications, Tooltip } from '@components'

export const LatestCallAnswer = ({ callLog }: { callLog: CallLog }) => {
    const [callType, setCallType] = useState<CallType>(CallType.Answer)

    const { notification } = useNotification()

    const [isAnsweredCall, isAnsweredCallResult] =
        SubAdminApi.Student.useStudentAnsweredCall()

    const ShowNotification = (callType: CallType) => {
        notification[
            callType === CallType.Answer
                ? 'success'
                : callType === CallType.NotAnswer
                ? 'error'
                : 'error'
        ]({
            title: `Call ${
                callType === CallType.NotAnswer ? 'Not' : ''
            } Answered`,
            description: `Call ${
                callType === CallType.NotAnswer ? 'Not' : ''
            } Answered`,
        })
    }
    return (
        <>
            <ShowErrorNotifications result={isAnsweredCallResult} />
            <div className="flex items-center gap-x-1">
                <div
                    className="group relative p-1 rounded-full bg-red-500 cursor-pointer"
                    onClick={() => {
                        setCallType(CallType.NotAnswer)
                        isAnsweredCall({
                            id: callLog?.id,
                            status: 'false',
                        }).then((res: any) => {
                            if (res?.data) {
                                ShowNotification(CallType.NotAnswer)
                            }
                        })
                    }}
                >
                    {isAnsweredCallResult.isLoading &&
                    callType === CallType.NotAnswer ? (
                        <LoadingAnimation size={14} />
                    ) : (
                        <>
                            <ImPhoneHangUp className="text-white text-sm" />
                            <Tooltip>Not Answer Call</Tooltip>
                        </>
                    )}
                </div>
                <div
                    className="group relative p-1 rounded-full bg-success cursor-pointer"
                    onClick={() => {
                        setCallType(CallType.Answer)
                        isAnsweredCall({
                            id: callLog?.id,
                            status: 'true',
                        }).then((res: any) => {
                            if (res?.data) {
                                ShowNotification(CallType.Answer)
                            }
                        })
                    }}
                >
                    {isAnsweredCallResult.isLoading &&
                    callType === CallType.Answer ? (
                        <LoadingAnimation size={14} />
                    ) : (
                        <>
                            <ImPhone className="text-white text-sm" />
                            <Tooltip>Answer Call</Tooltip>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
