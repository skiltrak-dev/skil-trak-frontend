import {
    AdminMessage,
    AIMatchingShowcase,
    AnalyticsInsight,
    AvailableServices,
    WelcomeCard,
} from './components'

export const RtoDashboardV2 = () => {
    return (
        <div className="space-y-4">
            <WelcomeCard />
            <AdminMessage
                type="urgent"
                title="40 Critical Actions Required - Priority Focus Needed"
                message="Multiple urgent items require immediate attention: 5 e-sign documents due Monday, 3 placement approvals waiting, 2 student submissions pending review, and 30 active issues requiring resolution. Please prioritize critical tasks to avoid delays in student placements."
                from="Julie Anderson"
                date="2h ago"
                onDismiss={() => {}}
            />

            {/*  */}
            <AIMatchingShowcase />

            {/*  */}
            <AnalyticsInsight />

            {/*  */}
            <AvailableServices />
        </div>
    )
}
