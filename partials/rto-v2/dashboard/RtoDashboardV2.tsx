import { RtoV2Api } from '@queries'
import {
    AdminMessage,
    AIMatchingShowcase,
    AnalyticsInsight,
    AvailableServices,
    WelcomeCard,
} from './components'
import moment from 'moment'

export const RtoDashboardV2 = () => {
    const adminMessage = RtoV2Api.Dashboard.adminMessage()
    return (
        <div className="space-y-4">
            <WelcomeCard />
            {adminMessage?.data && (
                <AdminMessage
                    type={adminMessage?.data?.urgencyLevel}
                    title={adminMessage?.data?.title}
                    message={adminMessage?.data?.message}
                    from={adminMessage?.data?.senderName}
                    date={moment(adminMessage?.data?.createdAt).fromNow()}
                    onDismiss={() => {}}
                />
            )}

            {/*  */}
            <AIMatchingShowcase />

            {/*  */}
            <AnalyticsInsight />

            {/*  */}
            <AvailableServices />
        </div>
    )
}
