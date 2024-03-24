import {
    Badge,
    LoadingAnimation,
    ShowErrorNotifications,
    Tooltip,
    Typography,
    UserCreatedAt,
} from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { CallLog } from '@types'
import { useEffect, useState } from 'react'
import { ImPhone, ImPhoneHangUp } from 'react-icons/im'

export enum CallType {
    Answer = 'answer',
    NotAnswer = 'notAnswer',
}

export const CallLogDetail = ({ callLog }: { callLog: CallLog }) => {
    const [callType, setCallType] = useState<string>(CallType.Answer)

    const [isAnsweredCall, isAnsweredCallResult] =
        SubAdminApi.Student.useStudentAnsweredCall()

    const { notification } = useNotification()

    useEffect(() => {
        if (isAnsweredCallResult.isSuccess) {
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
    }, [isAnsweredCallResult])

    return (
        <>
            <ShowErrorNotifications result={isAnsweredCallResult} />
            <div className="bg-gray-100 rounded-md shadow grid grid-cols-3 items-center px-2 py-1 mb-1.5">
                <div className="flex items-center gap-2">
                    <Typography>
                        Call made {callLog.isAnswered !== null ? 'and' : ''}
                    </Typography>

                    {callLog?.isAnswered ? (
                        <Badge text="Answered" size="sm" variant="success" />
                    ) : callLog?.isAnswered === false ? (
                        <Badge text="Not Answered" size="sm" variant="error" />
                    ) : (
                        <></>
                    )}
                </div>

                <div className="mx-auto">
                    <UserCreatedAt createdAt={callLog?.createdAt} />
                </div>
                <div className="flex justify-end items-center gap-x-2">
                    {callLog?.isAnswered ? (
                        <div className="group relative p-1.5 rounded-full bg-success">
                            <ImPhone className="text-white text-xs" />
                        </div>
                    ) : callLog?.isAnswered === false ? (
                        <div className="group relative p-1.5 rounded-full bg-red-500">
                            <ImPhoneHangUp className="text-white text-xs" />
                        </div>
                    ) : (
                        <>
                            <div
                                className="group relative p-2 rounded-full bg-red-500 cursor-pointer"
                                onClick={() => {
                                    setCallType(CallType.NotAnswer)
                                    isAnsweredCall({
                                        id: callLog?.id,
                                        status: 'false',
                                    })
                                }}
                            >
                                {isAnsweredCallResult.isLoading &&
                                callType === CallType.NotAnswer ? (
                                    <LoadingAnimation size={17} />
                                ) : (
                                    <>
                                        <ImPhoneHangUp className="text-white text-lg" />
                                        <Tooltip>Not Answered Call</Tooltip>
                                    </>
                                )}
                            </div>
                            <div
                                className="group relative p-2 rounded-full bg-success cursor-pointer"
                                onClick={() => {
                                    setCallType(CallType.Answer)
                                    isAnsweredCall({
                                        id: callLog?.id,
                                        status: 'true',
                                    })
                                }}
                            >
                                {isAnsweredCallResult.isLoading &&
                                callType === CallType.Answer ? (
                                    <LoadingAnimation size={17} />
                                ) : (
                                    <>
                                        <ImPhone className="text-white text-lg" />
                                        <Tooltip>Answered Call</Tooltip>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
