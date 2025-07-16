import React, { useEffect } from 'react'
import {
    DailyRecurringTasks,
    WeeklyRecurringTasks,
    MonthlyRecurringTasks,
    QuarterlyRecurringTasks,
    BiMonthlyRecurringTasks,
} from '../tabs'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

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

export const TodoTabs = ({ baseUrl }: { baseUrl?: string }) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const role = getUserCredentials()?.role

    const tabSlug = searchParams.get('tab')
    const activeTabIndex =
        tabs.findIndex((tab) => tab.slug === tabSlug) === -1
            ? 0
            : tabs.findIndex((tab) => tab.slug === tabSlug)

    const handleTabChange = (index: number) => {
        console.log({ index })
        // const slug = tabs[index].slug
        // const params = new URLSearchParams(searchParams.toString())
        // console.log({ params: params.toString() })
        // params.set('tab', slug)
        // router.replace(`?${params.toString()}`, { scroll: false })
    }

    const handleTabChangee = (slug: string) => {
        router.push({
            pathname: baseUrl,
            query: { tab: slug },
        })
    }

    // useEffect(() => {
    //     // Redirect to first tab if query param is missing or invalid
    //     if (!tabSlug || tabs.findIndex((tab) => tab.slug === tabSlug) === -1) {
    //         const defaultSlug = tabs[0].slug
    //         router.replace(`?tab=${defaultSlug}`, { scroll: false })
    //     }
    // }, [tabSlug, router])

    return (
        <div className="p-4">
            <div className="flex gap-x-0.5 justify-between mb-4  bg-[#F6F8FA] border border-[#EDEDED] rounded-lg p-0.5 ">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.slug}
                        onClick={() => handleTabChangee(tab.slug)}
                        className={` py-1.5 rounded-lg ${
                            role === UserRoles.ADMIN
                                ? 'text-[13px] px-9'
                                : 'text-sm px-14'
                        }  ${
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
