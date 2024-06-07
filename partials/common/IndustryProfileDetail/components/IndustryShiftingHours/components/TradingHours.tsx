import { Typography } from '@components'
import { TimingCard } from '../cards'

export const TradingHours = ({
    workingHoursTime,
}: {
    workingHoursTime: any
}) => {
    return (
        <div>
            <div className="px-4 py-3.5 border-b border-secondary-dark">
                <Typography semibold>
                    <span className="text-[15px]">Trading Hours</span>
                </Typography>
            </div>
            {/*  */}
            <div className="flex justify-between border-b border-secondary-dark">
                {workingHoursTime?.map((timing: any) => (
                    <div
                        key={timing?.day}
                        className="w-full h-10 border-r border-secondary-dark flex justify-center items-center"
                    >
                        <Typography variant="small" capitalize>
                            {timing?.day?.substring(0, 3)}
                        </Typography>
                    </div>
                ))}
            </div>
            {/*  */}
            <div className="flex justify-between border-b border-secondary-dark py-2.5">
                {workingHoursTime?.map((timing: any) => (
                    <div
                        key={timing?.day}
                        className="w-full h-32 flex justify-center items-center px-1"
                    >
                        <TimingCard timing={timing} />
                    </div>
                ))}
            </div>
        </div>
    )
}
