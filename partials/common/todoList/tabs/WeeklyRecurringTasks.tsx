import { TodoWeeklyFollowup } from '../tabsData'

export const WeeklyRecurringTasks = ({
    filterDate,
}: {
    filterDate: Date | null
}) => {
    return (
        <div className="flex flex-col gap-y-6">
            <TodoWeeklyFollowup filterDate={filterDate} />
        </div>
    )
}
