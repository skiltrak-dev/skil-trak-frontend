import { Card, Typography } from '@components'
import { AllCommunicationTab } from '@partials/common/AllCommunicationTab'
import { User } from '@types'
import { useState } from 'react'
import { Waypoint } from 'react-waypoint'

export const AllCommunication = ({ user }: { user: User }) => {
    const [isEntered, setIsEntered] = useState<boolean>(false)
    return (
        <>
            <Waypoint
                onEnter={() => {
                    setIsEntered(true)
                }}
                onLeave={() => {
                    setIsEntered(false)
                }}
            >
                <div className="p-4 h-full overflow-auto custom-scrollbar">
                    <AllCommunicationTab user={user} isEntered={isEntered} />
                </div>
            </Waypoint>
        </>
    )
}
