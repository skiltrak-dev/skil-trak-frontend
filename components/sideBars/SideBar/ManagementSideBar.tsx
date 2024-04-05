import { Typography } from '@components/Typography'
import { useState } from 'react'
import { SubAdminSidebarTab, SourcingSidebarTab } from './components'
import { TeamSelectionTab } from '@partials/management'
type TabOption = 'subadmin' | 'sourcing'
export const ManagementSideBar = () => {
    const [activeTab, setActiveTab] = useState<TabOption>('subadmin')

    const handleTabChange = (tab: TabOption) => {
        setActiveTab(tab)
    }

    return (
        <div className="w-[280px] rounded-lg flex-shrink-0 bg-white/80 border-r border-secondary-dark relative overflow-auto remove-scrollbar h-[calc(100vh-125px)]">
            <div className="p-4 border-b">
                <Typography variant="label" color="text-primaryNew">
                    Document Search
                </Typography>
            </div>
            <div className="">
                <div className="p-4">
                    <Typography variant="small" color="text-primaryNew" medium>
                        Document Of
                    </Typography>
                </div>
                <div className="">
                    {/* <div className=" p-4 flex items-center gap-x-10 px-4 py-3  mx-4 border-2 border-dashed rounded-md">
                        <div
                            className="cursor-pointer"
                            onClick={() => handleTabChange('subadmin')}
                        >
                            <Typography
                                variant="small"
                                color={
                                    activeTab === 'subadmin'
                                        ? 'text-primaryNew'
                                        : 'text-gray-400'
                                }
                                bold={activeTab === 'subadmin'}
                            >
                                Sub-Admin
                            </Typography>
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => handleTabChange('sourcing')}
                        >
                            <Typography
                                variant="small"
                                color={
                                    activeTab === 'sourcing'
                                        ? 'text-primaryNew'
                                        : 'text-gray-400'
                                }
                                bold={activeTab === 'sourcing'}
                            >
                                Sourcing
                            </Typography>
                        </div>
                    </div> */}
                    <TeamSelectionTab
                        activeTab={activeTab}
                        handleTabChange={handleTabChange}
                    />
                    {activeTab === 'subadmin' && <SubAdminSidebarTab />}
                    {activeTab === 'sourcing' && <SourcingSidebarTab />}
                </div>
            </div>
        </div>
    )
}
