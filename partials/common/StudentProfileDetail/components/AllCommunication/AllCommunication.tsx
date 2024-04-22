import { Card, Typography } from '@components'
import { AllCommunicationTab } from '@partials/common/AllCommunicationTab'
import { User } from '@types'

export const AllCommunication = ({ user }: { user: User }) => {
    return (
        <Card noPadding fullHeight>
            <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                <Typography variant="label" semibold>
                    All Communications
                </Typography>
            </div>
            <div className="p-4 h-[570px] overflow-auto custom-scrollbar">
                <AllCommunicationTab user={user} />
            </div>
        </Card>
    )
}
