import { Button } from '@components/buttons'

export const StepIndustryChecks = ({
    appliedIndustry,
    setIndustrySelection,
}: any) => {
    const daysLeft = () => {
        let date = new Date(appliedIndustry?.appliedDate)
        const todayDate = new Date()
        const dayTimestamp = 24 * 60 * 60 * 1000
        const time = dayTimestamp * 28 // millisecond for 28 days
        return Math.ceil(
            (date.getTime() + time - todayDate.getTime()) / dayTimestamp
        )
    }

    return (
        <div>
            <p className="text-xs md:text-right mb-2">
                <span className="font-semibold">{daysLeft()}</span>{' '}
                <span className="text-gray-400">days left</span>
            </p>
            <Button
                variant={'primary'}
                text={'Upload Documents'}
                onClick={() => {
                    setIndustrySelection(appliedIndustry?.industry?.id)
                }}
            />
        </div>
    )
}
