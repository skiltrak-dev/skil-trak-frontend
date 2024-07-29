import { Typography } from '@components'
import { FreeShiftCard } from '../cards'

export const FreeShifts = ({ timing }: { timing: any }) => {
    return (
        <div className="w-full">
            {/*  */}
            <div className="flex justify-between py-2.5w-full">
                <div key={timing?.day} className="flex flex-col w-full">
                    {timing?.shifts && timing?.shifts?.length > 0 ? (
                        timing?.shifts?.map((shift: any) => (
                            <div className="w-full h-16 border-r border-b border-white flex justify-center items-center">
                                <FreeShiftCard timing={timing} shift={shift} />
                            </div>
                        ))
                    ) : (
                        <div className="w-full h-16 border-r border-b border-white flex justify-center items-center">
                            <FreeShiftCard timing={timing} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
