import { useRouter } from 'next/router'
import { Tab, TabProps } from './Tab'
import { ReactNode } from 'react'

export interface TabNavigationChildrenProps {
    header: ReactNode
    element: ReactNode
}

interface TabNavigationProps {
    children: ({ header, element }: TabNavigationChildrenProps) => JSX.Element
    tabs: TabProps[]
}

export const TabNavigation = ({ children, tabs }: TabNavigationProps) => {
    const router = useRouter()
    const { query } = router

    const currentTab = tabs.find((tab) => query.tab === tab.href.query.tab)

    return children({
        header: (
            <div className="max-w-7xl custom-scrollbar overflow-auto">
                <div className="flex border-b ">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.label}
                            label={tab.label}
                            href={tab.href}
                            badge={tab.badge}
                            active={query.tab === tab.href.query.tab}
                            element={tab.element}
                        />
                    ))}
                </div>
            </div>
        ),
        element: currentTab?.element,
    })
}
