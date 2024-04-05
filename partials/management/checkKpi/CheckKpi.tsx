import { useEffect, useState } from 'react'
import { FirstTimeStudent, StudentDuplication } from './tabs'
import { useRouter } from 'next/router'
import { camelToKebabCase } from '@utils'
import { KpiResultsCard } from './components'

type TabOption = 'firstTimeStudent' | 'studentDuplication'
export const CheckKpi = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<TabOption>('firstTimeStudent')

    // Function to handle tab change
    const handleTabChange = (tab: any) => {
        setActiveTab(tab)
        router.push(
            {
                pathname: '/portals/management/check-kpi',
                query: {
                    tab: camelToKebabCase(tab),
                },
            },
            undefined,
            { shallow: true }
        )
    }
    useEffect(() => {
        if (router.pathname === '/portals/management/check-kpi') {
            handleTabChange(activeTab)
        }
    }, [activeTab, router.query.tab])
    return (
        <div className="w-full flex flex-col gap-y-2.5">
            <KpiResultsCard
                handleTabChange={handleTabChange}
                activeTab={activeTab}
            />
            <div className="w-full overflow-auto remove-scrollbar h-[calc(100vh-330px)]">
                {activeTab === 'firstTimeStudent' && <FirstTimeStudent />}
                {activeTab === 'studentDuplication' && <StudentDuplication />}
            </div>
        </div>
    )
}
