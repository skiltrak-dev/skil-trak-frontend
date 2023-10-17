import { DetailNavbar, ProtectedRoute } from '@components'
import { ContextBar } from '@components/sideBars'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useRef } from 'react'

interface UserLayoutProps {
    children: ReactNode
}
export const UserLayout = ({ children }: UserLayoutProps) => {
    const router = useRouter()
    const childrenRef = useRef<any>(null)

    useEffect(() => {
        const handleRouteChange = () => {
            if (childrenRef.current) {
                childrenRef.current.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                })
            }
        }

        // Add event listener for route changes
        router.events.on('routeChangeComplete', handleRouteChange)

        // Remove event listener when component unmounts
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router])
    return (
        <ProtectedRoute>
            <div>
                <DetailNavbar />
                {/* Viewport & SideBar Container */}
                <div className="bg-slate-50 h-[90vh] flex justify-between w-full overflow-hidden">
                    {/* Viewport */}
                    <div
                        ref={childrenRef}
                        className="w-full flex flex-col h-full transition-all duration-300 overflow-y-scroll remove-scrollbar"
                    >
                        {children}
                    </div>
                    {/* Sidebar */}
                    <ContextBar />
                </div>
            </div>
        </ProtectedRoute>
    )
}
