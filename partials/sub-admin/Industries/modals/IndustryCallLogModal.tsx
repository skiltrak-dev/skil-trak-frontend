import {
    LoadingAnimation,
    Modal,
    NoData,
    ShowErrorNotifications,
} from '@components'
import { SubAdminApi } from '@queries'
import { CallLog } from '@types'
// import { CallLogDetail } from '../components'
import { LuPhoneCall } from 'react-icons/lu'
import { IndustryCallLogDetail } from '../components'

export const IndustryCallLogModal = ({
    onCancel,
    industryId,
}: {
    onCancel: () => void
    industryId: number
}) => {
    const callLogs = SubAdminApi.Industry.useGetIndustryCallLog(industryId, {
        skip: !industryId,
    })

    return (
        <div>
            <ShowErrorNotifications result={callLogs} />
            <Modal
                title={'Call Logs'}
                subtitle={'All Call List Made with This Industry'}
                onCancelClick={onCancel}
                onConfirmClick={onCancel}
                titleIcon={LuPhoneCall}
                showActions={false}
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
                            <IndustryCallLogDetail callLog={callLog} />
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
