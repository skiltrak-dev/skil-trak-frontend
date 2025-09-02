import { Button, ShowErrorNotifications, TextArea } from '@components'
import { useNotification } from '@hooks'
import { CallType } from '@partials/sub-admin/students'
import { SubAdminApi } from '@queries'
import { CallLog } from '@types'
import { useState } from 'react'
import { IoCallOutline } from 'react-icons/io5'
import { LuPhoneMissed } from 'react-icons/lu'

export const OnViewMapCallAnswer = ({
    callLog,
    workplaceId,
    isListing
}: {
    callLog: CallLog
    workplaceId: number
     isListing?: boolean
}) => {
    const [callType, setCallType] = useState<CallType>(CallType.Answer)
    const [callNotes, setCallNotes] = useState('')
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
    const onChangeNotes = (e: any) => setCallNotes(e.target.value)
    return (
        <>
            <ShowErrorNotifications result={isAnsweredCallResult} />
            <TextArea
                name="call"
                disabled={callLog?.isAnswered !== null}
                onChange={(e: any) => {
                    onChangeNotes(e)
                }}
            />
            <div className="grid grid-cols-2 gap-2">
                <Button
                    text={'Connected'}
                    Icon={IoCallOutline}
                    variant="success"
                    onClick={() => {
                        setCallType(CallType.Answer)
                        if (callNotes.trim() !== '') {
                            isAnsweredCall({
                                id: callLog?.id,
                                 status: 'true',
                                body: {
                                    note: callNotes,
                                    workplaceId: workplaceId,
                                },
                            }).then((res: any) => {
                                if (res?.data) {
                                    ShowNotification(CallType.Answer)
                                    setCallNotes('')
                                }
                            })
                        }
                    }}
                    disabled={
                        (isAnsweredCallResult.isLoading &&
                            callType === CallType.Answer) ||
                        callLog?.isAnswered !== null
                    }
                    loading={
                        isAnsweredCallResult.isLoading &&
                        callType === CallType.Answer
                    }
                />
                <Button
                    text="No Answer"
                    Icon={LuPhoneMissed}
                    variant="error"
                    onClick={() => {
                        setCallType(CallType.NotAnswer)
                        if (callNotes.trim() !== '') {
                            isAnsweredCall({
                                id: callLog?.id,
                                 status: 'false',
                                 ...(isListing !== undefined && { isListing }),
                                body: {
                                    note: callNotes,
                                    workplaceId: workplaceId,
                                },
                            }).then((res: any) => {
                                if (res?.data) {
                                    ShowNotification(CallType.NotAnswer)
                                    setCallNotes('')
                                }
                            })
                        }
                    }}
                    disabled={
                        (isAnsweredCallResult.isLoading &&
                            callType === CallType.NotAnswer) ||
                        callLog?.isAnswered !== null
                    }
                    loading={
                        isAnsweredCallResult.isLoading &&
                        callType === CallType.NotAnswer
                    }
                />
            </div>
        </>
    )
}
