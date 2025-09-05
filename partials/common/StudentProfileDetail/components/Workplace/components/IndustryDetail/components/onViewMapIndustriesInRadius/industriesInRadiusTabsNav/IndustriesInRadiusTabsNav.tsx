import React, { useState } from 'react'

export interface TabProps {
    label: string
    element: React.ReactNode
}

interface TabNavigationProps {
    tabs: TabProps[]
}

export const IndustriesInRadiusTabsNav: React.FC<TabNavigationProps> = ({ tabs }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div>
            {/* Tab headers */}
            <div className="flex border-b border-gray-300">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors ${
                            activeIndex === index
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="py-4">{tabs[activeIndex].element}</div>
        </div>
    )
}
