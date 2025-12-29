//  <TicketDetails
//   ticket={selectedTicket}
//   onClose={() => setSelectedTicket(null)}
//   onUpdate={handleUpdateTicket}
//   onResolve={handleResolveTicket}
//   onViewStudentProfile={(studentId) => {
//     setSelectedStudentId(studentId);
//     setSelectedTicket(null);
//   }}
//   onViewIndustryProfile={(industryId) => {
//     setSelectedIndustryId(industryId);
//     setSelectedTicket(null);
//   }}
// />

import { RtoLayoutV2 } from '@layouts'
import { TicketDetails } from '@partials/common'
import { MailDetail } from '@partials/common/MailsListing'
import React, { ReactElement, useState } from 'react'
import { BiEnvelope } from 'react-icons/bi'

const TicketDetailPage = () => {
    const [ticket, setTicket] = useState({
        id: 'TKT-1001',
        studentName: 'Sarah Johnson',
        studentId: 'STU-2024-001',
        team: 'student-services',
        priority: 'high',
        status: 'open',
        phase: 'appointment',
        stageStatus: 'Book Appointment',
        title: 'Student has not booked appointment for 4+ hours',
        description:
            'Auto-escalated: Student has been in "Book Appointment" status for 4 hours without action. Student Services intervention required.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        escalationType: 'auto',
        hoursStuck: 6,
        assignedTo: 'Rachel Green',
        tags: ['auto-escalation', 'appointment-booking'],
        notes: [
            {
                id: 'NOTE-001',
                content: 'Student contacted via email. Awaiting response.',
                createdBy: 'Rachel Green',
                createdAt: new Date(
                    Date.now() - 1.5 * 60 * 60 * 1000
                ).toISOString(),
            },
        ],
    })

    return <TicketDetails ticket={ticket} />
}

TicketDetailPage.getLayout = (page: ReactElement) => {
    return (
        <RtoLayoutV2
            titleProps={{
                Icon: BiEnvelope,
                title: 'Ticket Details',
                description: 'Manage all your Ticket details',
            }}
        >
            {page}
        </RtoLayoutV2>
    )
}

export default TicketDetailPage
