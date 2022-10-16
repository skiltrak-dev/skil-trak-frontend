import { DetailNavbar } from '@components'
import { ContextBar } from '@components/sideBars'
import { ReactNode } from 'react'
import { FaChevronCircleLeft } from 'react-icons/fa'

interface UserLayoutProps {
    children: ReactNode
}
export const UserLayout = ({ children }: UserLayoutProps) => {
    return (
        <div>
            <DetailNavbar />
            {/* Viewport & SideBar Container */}
            <div className="bg-slate-50 h-[90vh] flex justify-between w-full overflow-hidden">
                {/* Viewport */}
                <div className="w-full flex flex-col h-full transition-all duration-300 overflow-y-scroll remove-scrollbar">
                    {children}
                </div>

                {/* Sidebar */}
                <ContextBar />
            </div>
        </div>
    )
}
