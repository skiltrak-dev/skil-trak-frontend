'use client'
import {
    ContextBar,
    DisplayAlerts,
    DisplayNotifications,
    PageTitleProps,
    RtoNavbarV2,
} from '@components'
import { RtoSidebar } from '@components/sideBars/rtoSidebarV2'
import { ReactNode, useState } from 'react'

interface RtoLayoutProps {
    children: ReactNode
    titleProps?: {
        Icon: any
        title: string
        iconClasses?: string
        description?: string
    }
}

export const RtoLayoutV2 = ({ children, titleProps }: RtoLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeView, setActiveView] = useState('Dashboard')

    return (
        // Disable browser scroll and fix full height
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Sidebar - scrolls independently */}
            <RtoSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onNavigate={(key: any) => setActiveView(key)}
                activeKey={activeView}
            />

            {/* Main content area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Navbar - fixed (does not move when content scrolls) */}
                <div className="shrink-0 relative z-20">
                    <RtoNavbarV2
                        onOpenSidebar={() => setSidebarOpen(true)}
                        titleProps={titleProps}
                    />
                </div>
                {/* Main scrollable content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6  mx-auto w-full">
                    <div>{children}</div>
                </main>
                <div className="h-[10px]">
                    <ContextBar />
                </div>
                <DisplayNotifications />
                <DisplayAlerts />
            </div>
        </div>
    )
}
