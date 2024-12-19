import { useRouter } from 'next/router'
import { Tab, TabProps } from './Tab'
import { ReactElement, ReactNode } from 'react'

export interface TabNavigationChildrenProps {
    header: ReactNode
    element: ReactNode
}

interface TabNavigationProps {
    children: ({ header, element }: TabNavigationChildrenProps) => ReactElement
    tabs: TabProps[]
    subTab?: boolean
}

export const TabNavigation = ({
    children,
    tabs,
    subTab,
}: TabNavigationProps) => {
    const router = useRouter()
    const { query } = router

    const currentTab = subTab
        ? tabs.find((tab) => query.subTab === tab?.href?.query?.subTab)
        : tabs.find((tab) => query.tab === tab?.href?.query?.tab)

    return children({
        header: (
            <div className="max-w- custom-scrollbar overflow-auto">
                <div className="flex border-b ">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.label}
                            label={tab.label}
                            href={tab.href}
                            badge={tab.badge}
                            active={
                                subTab
                                    ? query.subTab === tab?.href?.query?.subTab
                                    : query.tab === tab?.href?.query?.tab
                            }
                            element={tab.element}
                        />
                    ))}
                </div>
            </div>
        ),
        element: currentTab?.element,
    })
}
