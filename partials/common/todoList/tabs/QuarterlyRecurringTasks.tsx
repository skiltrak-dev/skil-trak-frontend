import { TodoQuarterlyListedIndustries } from '../tabsData'

export const QuarterlyRecurringTasks = ({
    filterDate,
}: {
    filterDate: Date | null
}) => {
    return (
        <div className="flex flex-col gap-y-6">
            <TodoQuarterlyListedIndustries filterDate={filterDate} />
        </div>
    )
}
