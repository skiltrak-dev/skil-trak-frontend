import {
    LoadingAnimation,
    Modal,
    NoData,
    Typography,
    UserCreatedAt,
} from '@components'
import { SubAdminApi } from '@queries'
import { CallLog } from '@types'
import React from 'react'

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
            <Modal
                title={'Call Logs'}
                subtitle={'All Call List Made with This Student'}
                onCancelClick={onCancel}
                onConfirmClick={onCancel}
            >
                <div className="min-w-[600px] max-w-[80vw] max-h-[80vh] overflow-auto custom-scrollbar">
                    {callLogs.isError && (
                        <NoData
                            text={'There is some technical issue, Try again'}
                        />
                    )}
                    {callLogs.isLoading ? (
                        <LoadingAnimation />
                    ) : callLogs.data && callLogs.data?.length > 0 ? (
                        callLogs.data?.map((callLog: CallLog) => (
                            <div className="bg-gray-100 rounded-md shadow flex justify-between items-center px-2 py-1 mb-1.5">
                                <Typography
                                    variant={'label'}
                                    color={'text-black'}
                                >
                                    Call Made
                                </Typography>
                                <div>
                                    <UserCreatedAt
                                        createdAt={callLog?.createdAt}
                                    />
                                </div>
                            </div>
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
