import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
    TodoAppointments,
    TodoHighpriority,
    TodoTickets,
    TodoWorkplace,
} from '../tabsData'

export const DailyRecurringTasks = ({
    filterDate,
}: {
    filterDate: Date | null
}) => {
    const router = useRouter()

    const scrollToPage = () => {
        if (router?.query?.id && !router?.query?.page) {
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
        <div className="flex flex-col gap-y-6">
            <div id={'highPriority'}>
                <TodoHighpriority filterDate={filterDate} />
            </div>
            <div id={'appointment'}>
                <TodoAppointments filterDate={filterDate} />
            </div>
            <div id={'openTickets'}>
                <TodoTickets filterDate={filterDate} />
            </div>
            <div id={'workplaceRequest'}>
                <TodoWorkplace filterDate={filterDate} />
            </div>
        </div>
    )
}
