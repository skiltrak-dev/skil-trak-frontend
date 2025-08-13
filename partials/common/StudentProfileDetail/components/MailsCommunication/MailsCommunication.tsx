import { Card } from '@components'
import { AllCommunication } from '../AllCommunication'
import { Waypoint } from 'react-waypoint'
import { useState } from 'react'

export const MailsCommunication = ({ user }: any) => {
    const [isEntered, setIsEntered] = useState(false)
    return (
        <Waypoint onEnter={() => setIsEntered(true)}>
            <div>
                <Card fullHeight noPadding>
                    <AllCommunication user={user} isEntered={isEntered} />
                </Card>
            </div>
        </Waypoint>
    )
}
