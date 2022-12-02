import { NoData } from '@components/ActionAnimations'
import { LoadingAnimation } from '@components/LoadingAnimation'
import Image from 'next/image'

interface PlacementProgressCardProps {
    placementProgress: any
}

export const PlacementProgressCard = ({
    placementProgress,
}: PlacementProgressCardProps) => {
    return (
        <div className="bg-gradient-to-r from-[#8F18E0] to-[#F3A321] flex justify-between items-center rounded-2xl p-4">
            {placementProgress?.isLoading ? (
                <LoadingAnimation />
            ) : placementProgress && placementProgress?.length ? (
                <>
                    <div className="py-2">
                        <p className="text-white font-medium text-sm leading-5">
                            Placement Progress
                        </p>
                        <div>
                            <h1 className="text-white font-semibold text-lg leading-7">
                                {placementProgress?.requestStatus}
                            </h1>
                        </div>
                        <p className="text-[#480B70] font-medium text-sm leading-5">
                            {placementProgress?.description}
                        </p>
                    </div>

                </>
            ) : (
                <NoData text={'No data found'} />
            )}
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
