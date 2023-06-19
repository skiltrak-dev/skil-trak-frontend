import {
    LoadingAnimation,
    Modal,
    NoData,
    ShowErrorNotifications,
    Typography,
    UserCreatedAt,
} from '@components'
import { SubAdminApi } from '@queries'
import { CallLog } from '@types'
import React from 'react'
import { CallLogDetail } from '../components'
import { LuPhoneCall } from 'react-icons/lu'

export const CallLogsModal = ({
    onCancel,
    studentId,
}: {
    onCancel: () => void
    studentId: number
}) => {
    const callLogs = SubAdminApi.Student.useGetStudentCallLog(studentId, {
        skip: !studentId,
    })

    return (
        <div>
            <ShowErrorNotifications result={callLogs} />
            <Modal
                title={'Call Logs'}
                subtitle={'All Call List Made with This Student'}
                onCancelClick={onCancel}
                onConfirmClick={onCancel}
                titleIcon={LuPhoneCall}
            >
                <div className="min-w-[600px] max-w-[80vw] min-h-[20vh] max-h-[60vh] overflow-auto custom-scrollbar">
                    {callLogs.isError && (
                        <NoData
                            text={'There is some technical issue, Try again'}
                        />
                    )}
                    {callLogs.isLoading ? (
                        <LoadingAnimation />
                    ) : callLogs.data &&
                      callLogs.data?.length > 0 &&
                      callLogs.isSuccess ? (
                        callLogs.data?.map((callLog: CallLog) => (
                            <CallLogDetail callLog={callLog} />
                        ))
                    ) : (
                        !callLogs.isError && (
                            <NoData text={'There is No Call log'} />
                        )
                    )}
                </div>
            </Modal>
        </div>
    )
}
