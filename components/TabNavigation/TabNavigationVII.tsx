import { useState } from 'react'
import { TabPropsVII, TabVII } from './TabVII'
import { useRouter } from 'next/router'

interface TabNavigationVIIProps {
    tabs: TabPropsVII[]
    subTab?: boolean
    children: (props: {
        header?: React.ReactNode
        element: React.ReactNode
    }) => React.ReactNode
}

export const TabNavigationVII = ({
    tabs,
    subTab,
    children,
}: TabNavigationVIIProps) => {
    const router = useRouter()
    const { query } = router
    const [activeTab, setActiveTab] = useState(0)

    const handleTabClick = (index: number) => {
        setActiveTab(index)
    }
    const currentTab = subTab
        ? tabs.find((tab) => query.subTab === tab?.href?.query?.subTab)
        : tabs.find((tab) => query.tab === tab?.href?.query?.tab)

    return (
        <div>
            <div className="tab-header grid grid-cols-4 gap-x-5 gap-y-12 mt-10">
                {tabs?.map((tab, index) => (
                    <TabVII
                        key={index}
                        label={tab.label}
                        href={tab.href}
                        icon={tab.icon}
                        active={
                            subTab
                                ? query.subTab === tab?.href?.query?.subTab
                                : query.tab === tab?.href?.query?.tab
                        }
                        count={tab?.count}
                        onClick={() => handleTabClick(index)}
                    />
                ))}
            </div>
            {children({
                header: tabs[activeTab]?.label,
                element: currentTab?.element,
            })}
        </div>
    )
}
