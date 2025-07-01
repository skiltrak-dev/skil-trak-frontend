import React from 'react'

type TabProps = {
    label: string
    slug: string // unique key for query param
    element: React.ReactNode
}
export const TodoListDetails = () => {
    const tabs: TabProps[] = [
        {
            label: 'Daily Recurring Tasks',
            slug: 'daily-recurring-tasks',
            element: <div>1</div>,
        },
        {
            label: 'Weekly Recurring Tasks',
            slug: 'weekly-recurring-tasks',
            element: <div>2</div>,
        },
        {
            label: 'Monthly Recurring Tasks',
            slug: 'monthly-recurring-tasks',
            element: <div>3</div>,
        },
        {
            label: 'Bi-Monthly Recurring Tasks',
            slug: 'student-move-to-flashing',
            element: <div>4</div>,
        },
        {
            label: 'Quarterly Recurring Tasks',
            slug: 'quarterly-recurring-tasks',
            element: <div>5</div>,
        },
    ]
    return <div>TodoListDetails</div>
}
