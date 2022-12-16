import { TimeDigit } from './style'

export const TimerItem = ({
    value,
    title,
}: {
    value: number
    title: string
}) => {
    const formattedValue = value < 10 ? `0${value}` : value
    return (
        <div className="flex flex-col items-center">
            <TimeDigit className="text-xl font-bold leading-4">
                {formattedValue}
            </TimeDigit>
            <span className="text-[10px] leading-4 uppercase">{title}</span>
        </div>
    )
}
