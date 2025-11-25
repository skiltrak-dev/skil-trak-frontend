import React, { useState, useEffect } from 'react'
import { Building2, History, Users } from 'lucide-react'
import { StudentInterviewDetail } from '../StudentInterviewDetail'
import { CommonApi, SubAdminApi } from '@queries'
import {
    ContactHistory,
    ListIndustriesInRadius,
    OnViewMapFutureIndustryDetailsTab,
    OnViewMapIndustryDetailsTab,
} from '.'

// Define tab structure with icon component
interface Tab {
    id: 'industries' | 'contact' | 'interviews'
    label: string
    icon: React.ComponentType<{ className?: string }>
}

const tabs: Tab[] = [
    { id: 'industries', label: 'Industries', icon: Building2 },
    { id: 'contact', label: 'Contact History', icon: History },
    { id: 'interviews', label: 'Student Interview', icon: Users },
]

// Storage key for the active industry list tab
const STORAGE_KEY = 'activeIndustryListTab'

export const OnViewMapTabs = ({
    workplaceId,
    selectedBox,
    workplace,
    appliedIndustry,
    courseId,
    setSelectedBox,
    activeIndustryListTab,
    setActiveIndustryListTab,
}: any) => {
    const [activeTab, setActiveTab] = useState<Tab['id']>(tabs[0].id)

    const industryType = selectedBox
        ? selectedBox.type === 'futureIndustry'
            ? 'listing'
            : selectedBox.type === 'branch'
            ? 'branch'
            : 'industry'
        : null

    const isStudent = selectedBox?.user?.role === 'student'

    // Save active industry list tab to localStorage when it changes
    useEffect(() => {
        if (activeIndustryListTab) {
            try {
                localStorage.setItem(
                    `${STORAGE_KEY}_${workplaceId}`,
                    activeIndustryListTab
                )
            } catch (error) {
                console.error(
                    'Failed to save active tab to localStorage:',
                    error
                )
            }
        }
    }, [activeIndustryListTab, workplaceId])

    // Call all hooks unconditionally, use skip to control execution
    const branchDetailsData =
        SubAdminApi.Workplace.useSubAdminMapIndustryBranchDetail(
            {
                id: selectedBox?.id,
                params: {
                    wpId: workplaceId,
                },
            },
            {
                skip:
                    isStudent || !selectedBox?.id || industryType !== 'branch',
            }
        )

    const futureIndustryDetailsData =
        CommonApi.FindWorkplace.useGetFutureIndustryDetail(selectedBox?.id, {
            skip: isStudent || !selectedBox?.id || industryType !== 'listing',
        })

    const suggestedIndustryDetailsData =
        SubAdminApi.Workplace.useSubAdminMapSuggestedIndustryDetail(
            { industryId: selectedBox?.id, workplaceId },
            {
                skip:
                    isStudent ||
                    !selectedBox?.id ||
                    industryType === 'branch' ||
                    industryType === 'listing',
            }
        )

    // Select the appropriate data based on industryType
    const industryDetailsData =
        industryType === 'branch'
            ? branchDetailsData
            : industryType === 'listing'
                ? futureIndustryDetailsData
                : suggestedIndustryDetailsData
    const workplaceCourseId = workplace?.courses?.[0]?.id

    const handleTabClick = (tabId: Tab['id']) => {
        setActiveTab(tabId)
    }

    const handleViewIndustriesList = () => {
        // Get the saved tab from localStorage
        try {
            const savedTab = localStorage.getItem(
                `${STORAGE_KEY}_${workplaceId}`
            )
            if (savedTab && setActiveIndustryListTab) {
                setActiveIndustryListTab(savedTab)
            }
        } catch (error) {
            console.error(
                'Failed to retrieve active tab from localStorage:',
                error
            )
        }

        // Clear the selected box to show the list
        setSelectedBox(null)
    }

    return (
        <div className="w-full">
            {/* Tab Navigation */}
            <div
                role="tablist"
                className="grid grid-cols-3 bg-white border-b border-gray-200 w-full shadow-sm rounded-t-md"
            >
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            aria-controls={`panel-${tab.id}`}
                            className={`flex items-center justify-center gap-x-2 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-primaryNew text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            } ${
                                activeTab === 'industries' && 'rounded-tl-md'
                            } ${activeTab === 'interviews' && 'rounded-tr-md'}`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            <Icon className="w-5 h-5" aria-hidden="true" />
                            <span>{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            {/* Tab Content */}
            <div role="tabpanel" id={`panel-${activeTab}`} className="p-4">
                {activeTab === 'industries' && (
                    <div className="">
                        {selectedBox && (
                            <button
                                onClick={handleViewIndustriesList}
                                className="text-sm text-link underline"
                            >
                                View industries list
                            </button>
                        )}
                        {!selectedBox ? (
                            <>
                                <ListIndustriesInRadius
                                    workplaceId={workplace?.id}
                                    courseId={workplaceCourseId}
                                    setSelectedBox={setSelectedBox}
                                    activeIndustryListTab={
                                        activeIndustryListTab
                                    }
                                    setActiveIndustryListTab={
                                        setActiveIndustryListTab
                                    }
                                />
                            </>
                        ) : industryType === 'listing' ? (
                            <OnViewMapFutureIndustryDetailsTab
                                selectedBox={selectedBox}
                                workplace={workplace}
                                industryDetails={industryDetailsData}
                                appliedIndustry={appliedIndustry}
                            />
                        ) : (
                            <OnViewMapIndustryDetailsTab
                                selectedBox={selectedBox}
                                workplace={workplace}
                                industryDetails={industryDetailsData}
                                appliedIndustry={appliedIndustry}
                            />
                        )}
                    </div>
                )}
                {activeTab === 'contact' && (
                    <div>
                        <ContactHistory wpId={workplace?.id} />
                    </div>
                )}
                {activeTab === 'interviews' && (
                    <div>
                        <StudentInterviewDetail
                            workplaceId={Number(workplaceId)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
