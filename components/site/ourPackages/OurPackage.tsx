import { Typography } from '@components/Typography'
import { Button } from '@components/buttons'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { MdHomeWork } from 'react-icons/md'

export const OurPackage = ({
    content,
    color,
    price,
    manage,
    textColor,
    onClick,
}: any) => {
    return (
        <>
            <div className={`${color} rounded-2xl p-12 h-[450px] w-80 md:w-96`}>
                <div className="text-3xl mb-6 md:mb-10">
                    <MdHomeWork className="text-white" />
                </div>
                <div className="flex flex-col gap-y-[72px]">
                    <div className="">
                        <Typography variant="body" color="text-white">
                            {content}
                        </Typography>
                        <Typography variant="xs" color="text-white">
                            {manage}
                        </Typography>
                    </div>
                    <div className="">
                        <Typography variant="muted" color={textColor}>
                            {price}
                        </Typography>
                        <div className="mt-2">
                            <Button
                                variant="primary"
                                text="Start With This Package"
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="group flex items-center cursor-pointer justify-end mt-20"
                    onClick={() => {
                        if (onClick) {
                            onClick()
                        }
                    }}
                >
                    <div className="">
                        <Typography variant="muted" color="text-white">
                            View Details
                        </Typography>
                        <Typography variant="xs" color="text-white">
                            Package
                        </Typography>
                    </div>
                    <div className="mt-2 pl-2 group-hover:translate-x-4 transition-transform duration-300 ease-in-out">
                        <AiOutlineArrowRight className="text-white" />
                    </div>
                </div>
            </div>
        </>
    )
}
