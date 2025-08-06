import { Card } from '@components'
import { AllCommunication } from '../AllCommunication'

export const MailsCommunication = ({ user }: any) => {
    return (
        <div>
            <Card fullHeight noPadding>
                <AllCommunication user={user} />
            </Card>
        </div>
    )
}
