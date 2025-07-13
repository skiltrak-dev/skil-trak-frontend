import {
    TodoTickets,
    TodoWorkplace,
    TodoAppointments,
    TodoHighpriority,
} from '../tabsData'

export const DailyRecurringTasks = () => {
    return (
        <div className="p-6 flex flex-col gap-y-6">
            <TodoHighpriority />
            <TodoAppointments />
            <TodoTickets />
            <TodoWorkplace />
        </div>
    )
}
