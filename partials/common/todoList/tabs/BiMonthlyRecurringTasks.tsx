import { BiMonthlyNonPartnerInd, TodoWeeklyFollowup } from '../tabsData'

export const BiMonthlyRecurringTasks = ({
    filterDate,
}: {
    filterDate: Date | null
}) => {
    return (
        <div className="flex flex-col gap-y-6">
            <BiMonthlyNonPartnerInd filterDate={filterDate} />
        </div>
    )
}
