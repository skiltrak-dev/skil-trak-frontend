import Image from 'next/image'

interface PlacementProgressCardProps {
    requestStatus: string
    description: string
}

export const PlacementProgressCard = ({
    requestStatus,
    description,
}: PlacementProgressCardProps) => {
    return (
        <div className="bg-gradient-to-r from-[#8F18E0] to-[#F3A321] flex justify-between items-center rounded-2xl px-4">
            <div className="py-2">
                <p className="text-white font-medium text-sm leading-5">
                    Placement Progress
                </p>
                <h1 className="text-white font-semibold text-lg leading-7">
                    {requestStatus}
                </h1>
                <p className="text-[#480B70] font-medium text-sm leading-5">
                    {description}
                </p>
            </div>
            <div className="animate-float">
                <Image
                    src={'/images/card-icons/ic_workplace.png'}
                    width={100}
                    height={100}
                />
            </div>
        </div>
    )
}
