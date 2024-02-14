import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Mail,
    TechnicalError,
    Typography,
} from '@components'
import { CommonApi } from '@queries'
import { User } from '@types'
import { ReactElement, useState } from 'react'
import { ComposeMailModal } from '../../modals'
import { AllCommunicationTab } from '@partials/common/AllCommunicationTab'

export const AllCommunication = ({ user }: { user: User }) => {
    return (
        <Card noPadding>
            <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                <Typography variant="label" semibold>
                    All Communications
                </Typography>
            </div>
            {/* <div className="p-4 h- overflow-auto custom-scrollbar">
                <AllCommunicationTab user={user} />
            </div> */}
        </Card>
    )
}
