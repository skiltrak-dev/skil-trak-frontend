import { TodoMonthlyPartnerIndustriesFollowUp } from '../tabsData'

export const MonthlyRecurringTasks = ({
    filterDate,
}: {
    filterDate: Date | null
}) => {
    return (
        <div className="flex flex-col gap-y-6">
            <TodoMonthlyPartnerIndustriesFollowUp filterDate={filterDate} />
        </div>
    )
}
