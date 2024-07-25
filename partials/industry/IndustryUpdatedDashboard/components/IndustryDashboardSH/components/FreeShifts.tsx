import { Typography } from '@components'
import { FreeShiftCard } from '../cards'

export const FreeShifts = ({ workingHoursTime }: { workingHoursTime: any }) => {
    return (
        <div>
            <div className="px-4 py-3.5 border-b border-secondary-dark">
                <Typography semibold>
                    <span className="text-[15px]">Free Shifts</span>
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
                        className="flex flex-col gap-y-2 w-full"
                    >
                        {timing?.shifts && timing?.shifts?.length > 0 ? (
                            timing?.shifts?.map((shift: any) => (
                                <div className="w-full h-16 flex justify-center items-center px-1">
                                    <FreeShiftCard
                                        timing={timing}
                                        shift={shift}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-16 flex justify-center items-center px-1">
                                <FreeShiftCard timing={timing} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
