import { useAppSelector } from '@redux/hooks'
import { MailsCommunication } from '@partials/common/StudentProfileDetail/components'

export function CommunicationLog() {
    const industry = useAppSelector((state) => state.industry.industryDetail)

    return (
        <div className="px-4">
            <MailsCommunication user={industry!} />
        </div>
    )
}
