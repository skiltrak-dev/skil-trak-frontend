import {
    AuthorizedUserComponent,
    Mail,
    Timeline,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { StudentCellInfo } from '@partials/admin/student/components'
import { HistoryCard } from '@partials/common/History'
import { NoteCard } from '@partials/common/Notes'
import { TicketSubject, TicketUser } from '@partials/common/Tickets'
import { StudentCellInfo as RtoStudentCellInfo } from '@partials/rto/student/components'
import { StudentCellInfo as SubadminStudentCellInfo } from '@partials/sub-admin/students'
import moment from 'moment'
import { StudentMessageCard } from '../../StudentMessageCard'
import { CommunicationDetailsProps } from '../types'
import { WorkplaceStatusCommunication } from './WorkplaceStatusCommunication'
import { TicketAllCommunication } from './TicketAllCommunication'

export const CommunicationDetails: React.FC<CommunicationDetailsProps> = ({
    item,
}) => {
    if (item?.type === 'logger') {
        return <WorkplaceStatusCommunication item={item} />
    }

    if (item.type === 'twilio') {
        return <StudentMessageCard studentMessage={item} />
    }

    if (item.calledBy) {
        return (
            <HistoryCard
                call
                history={{
                    ...item,
                    title: 'Call',
                    description: (
                        <>
                            call made by <strong>{item?.calledBy?.name}</strong>
                        </>
                    ),
                }}
            />
        )
    }

    if (item.assignedTo) {
        return <TicketAllCommunication item={item} />
    }

    if (item.title) {
        return (
            <Timeline updatedAt={item.updatedAt}>
                <NoteCard note={item} />
            </Timeline>
        )
    }

    return (
        <Mail sender={item.sender?.role === 'admin'} message={item} index={0} />
    )
}
