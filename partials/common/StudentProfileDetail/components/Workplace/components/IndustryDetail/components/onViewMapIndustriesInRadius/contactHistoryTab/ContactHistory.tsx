import { SubAdminApi } from '@queries'
import React from 'react'
import IndustryCommunications from './IndustryCommunications'

export const ContactHistory = ({ wpId }: any) => {
    const emails = SubAdminApi.Student.useIndustryInRadiusWorkplaceEmails(
        {
            wpId: wpId,
        },
        {
            skip: !wpId,
        }
    )
    const callLogs = SubAdminApi.Student.useIndustryInRadiusWorkplaceCallLogs(
        {
            wpId: wpId,
        },
        {
            skip: !wpId,
        }
    )
    const listingMails =
        SubAdminApi.Student.useFutureIndustryInRadiusWorkplaceEmails(
            {
                wpId: wpId,
            },
            {
                skip: !wpId,
            }
        )
    return (
        <div className="overflow-auto h-[28rem] remove-scrollbar  ">
            <IndustryCommunications
                emails={emails}
                callLogs={callLogs}
                listingMails={listingMails}
            />
        </div>
    )
}
