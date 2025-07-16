import { useRouter } from 'next/router'
import {
    TodoTickets,
    TodoWorkplace,
    TodoAppointments,
    TodoHighpriority,
} from '../tabsData'
import { useEffect } from 'react'

export const DailyRecurringTasks = () => {
    const router = useRouter()

    const scrollToPage = () => {
        if (router?.query?.id) {
            const detailItem = document.getElementById(router?.query?.id + '')

            if (detailItem) {
                setTimeout(() => {
                    detailItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    })
                }, 500)
            }
        }
    }

    useEffect(() => {
        scrollToPage()
    }, [router])

    return (
        <div className="p-6 flex flex-col gap-y-6">
            <div id={'highPriority'}>
                <TodoHighpriority />
            </div>
            <div id={'appointment'}>
                <TodoAppointments />
            </div>
            <div id={'openTickets'}>
                <TodoTickets />
            </div>
            <div id={'workplaceRequest'}>
                <TodoWorkplace />
            </div>
        </div>
    )
}
