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
    return <TicketDetails />
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
