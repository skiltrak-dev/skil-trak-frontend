'use client'
import { ReactNode, useState } from 'react'
import { RtoNavbarV2, PageTitleProps } from '@components'
import { RtoSidebar } from '@components/sideBars/rtoSidebarV2'

interface RtoLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}

export const RtoLayoutV2 = ({ children }: RtoLayoutProps) => {
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
                <div className="shrink-0">
                    <RtoNavbarV2 onOpenSidebar={() => setSidebarOpen(true)} />
                </div>

                {/* Main scrollable content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-[1300px] mx-auto w-full">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold">{activeView}</h1>
                    </div>

                    <div>{children}</div>
                </main>
            </div>
        </div>
    )
}
