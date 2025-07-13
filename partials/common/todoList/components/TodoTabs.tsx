'use client'

import React, { useEffect } from 'react'
import {
    DailyRecurringTasks,
    WeeklyRecurringTasks,
    MonthlyRecurringTasks,
    QuarterlyRecurringTasks,
    BiMonthlyRecurringTasks,
} from '../tabs'
import { useRouter, useSearchParams } from 'next/navigation'

type TabProps = {
    label: string
    slug: string // unique key for query param
    element: React.ReactNode
}

const tabs: TabProps[] = [
    {
        label: 'Daily Recurring Tasks',
        slug: 'daily-recurring-tasks',
        element: <DailyRecurringTasks />,
    },
    {
        label: 'Weekly Recurring Tasks',
        slug: 'weekly-recurring-tasks',
        element: <WeeklyRecurringTasks />,
    },
    {
        label: 'Monthly Recurring Tasks',
        slug: 'monthly-recurring-tasks',
        element: <MonthlyRecurringTasks />,
    },
    {
        label: 'Bi-Monthly Recurring Tasks',
        slug: 'student-move-to-flashing',
        element: <BiMonthlyRecurringTasks />,
    },
    {
        label: 'Quarterly Recurring Tasks',
        slug: 'quarterly-recurring-tasks',
        element: <QuarterlyRecurringTasks />,
    },
]
// Weekly Recurring Tasks
1
// Monthly Recurring Tasks
// 1
// Bi-Monthly Recurring Tasks
// 1
// Quarterly Recurring Tasks

export const TodoTabs = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const tabSlug = searchParams.get('tab')
    const activeTabIndex =
        tabs.findIndex((tab) => tab.slug === tabSlug) === -1
            ? 0
            : tabs.findIndex((tab) => tab.slug === tabSlug)

    const handleTabChange = (index: number) => {
        const slug = tabs[index].slug
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', slug)
        router.replace(`?${params.toString()}`, { scroll: false })
    }

    useEffect(() => {
        // Redirect to first tab if query param is missing or invalid
        if (!tabSlug || tabs.findIndex((tab) => tab.slug === tabSlug) === -1) {
            const defaultSlug = tabs[0].slug
            router.replace(`?tab=${defaultSlug}`, { scroll: false })
        }
    }, [tabSlug, router])

    return (
        <div className="p-4">
            {/* Tabs */}
            <div className="flex gap-x-0.5 justify-between mb-4  bg-[#F6F8FA] border border-[#EDEDED] rounded-lg p-0.5 ">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.slug}
                        onClick={() => handleTabChange(index)}
                        className={`px-14 py-1.5 rounded-lg text-sm ${
                            index === activeTabIndex
                                ? 'bg-white shadow-sm text-link border border-[#1436B033]/20'
                                : ' text-gray-600'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Active Tab Content */}
            <div>{tabs[activeTabIndex].element}</div>
        </div>
    )
}
