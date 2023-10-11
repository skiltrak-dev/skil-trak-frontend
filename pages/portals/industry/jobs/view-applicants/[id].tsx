import { TabNavigation, TabProps } from '@components'
import { IndustryLayout } from '@layouts'
import { PortalApplied, WebsiteApplied } from '@partials/industry'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const ViewApplicants = () => {
    const router = useRouter()

    const tabs: TabProps[] = [
        {
            label: 'Portal Applied',
            href: {
                pathname: String(router.query?.id),
                query: { tab: 'portal-applied' },
            },
            element: <PortalApplied />,
        },
        {
            label: 'Website Applied',
            href: {
                pathname: String(router.query?.id),
                query: { tab: 'website-applied' },
            },
            element: <WebsiteApplied />,
        },
    ]

    return (
        <div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div>{header}</div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}

ViewApplicants.getLayout = (page: ReactElement) => {
    return (
        <IndustryLayout
            pageTitle={{
                title: 'View Applicants',
            }}
        >
            {page}
        </IndustryLayout>
    )
}

export default ViewApplicants
