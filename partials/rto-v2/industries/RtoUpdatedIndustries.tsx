import { ConfigTabs, TabConfig } from '@components'
import { Building2 } from 'lucide-react'
import { useState } from 'react'
import { IndustryHeader } from './component'
import { AddIndustryModal } from './modals'
import {
    ArchivedIndustries,
    NonPartnerIndustries,
    PendingIndustriesTab,
    SkiltrakNetwork,
    YourPartnerIndustries,
} from './tabs'

export const RtoUpdatedIndustries = () => {
    const [addIndustryOpen, setAddIndustryOpen] = useState(false)

    const tabs: TabConfig[] = [
        {
            value: 'non-partner-industries',
            label: 'Non-Partner Industries',
            icon: Building2,
            component: () => <NonPartnerIndustries />,
        },
        {
            value: 'partner-industries',
            label: 'Your Partner Industries',
            icon: Building2,
            component: () => <YourPartnerIndustries />,
        },
        {
            value: 'pending-industries',
            label: 'Pending Industries',
            icon: Building2,
            component: () => <PendingIndustriesTab />,
        },
        {
            value: 'skiltrak-network',
            label: 'Skiltrak Network',
            icon: Building2,
            component: () => <SkiltrakNetwork />,
        },
        {
            value: 'archived-industries',
            label: 'Archived Industries',
            icon: Building2,
            component: () => <ArchivedIndustries />,
        },
    ]

    return (
        <div className="space-y-4 animate-fade-in">
            <IndustryHeader />

            {/* <TabNavigation tabs={tabs}>
                {({ header, element }: any) => (
                    <div>
                        <div>{header}</div>
                        <div className="mt-4">{element}</div>
                    </div>
                )}
            </TabNavigation> */}
            <ConfigTabs
                tabs={tabs}
                className="!rounded-none"
                tabsClasses="!rounded-md !p-1"
                tabsTriggerClasses="py-1.5 !rounded-md"
            />

            {addIndustryOpen && (
                <AddIndustryModal onClose={() => setAddIndustryOpen(false)} />
            )}
        </div>
    )
}
