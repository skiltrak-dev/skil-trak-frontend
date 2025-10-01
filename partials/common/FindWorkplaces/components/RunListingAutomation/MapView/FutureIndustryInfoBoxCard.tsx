import { Typography } from '@components'
import { CopyInfoData } from '@partials/common/MapBox/components'
import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'
import { GiPathDistance } from 'react-icons/gi'
import { ImLocation } from 'react-icons/im'

type FutureIndustryInfoBoxCardProps = {
    selectedBox: any
    setSelectedBox: any
}

export const FutureIndustryInfoBoxCard = ({
    selectedBox,
    setSelectedBox,
}: FutureIndustryInfoBoxCardProps) => {
    return (
        <>
            <div className="w-80">
                <div className="w-10 rounded-full h-10 relative z-50 border border-gray-200 ml-3">
                    <Image
                        src={'/images/icons/avatars/std-boy.png'}
                        alt={'avatar'}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                </div>
                <div className="relative min-w-72 bg-white px-2.5 py-5 rounded-lg shadow-lg -mt-5">
                    <FaTimes
                        size={18}
                        className="cursor-pointer absolute top-2 right-2"
                        onClick={() => {
                            setSelectedBox(null)
                        }}
                    />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-b-8 border-b-white border-x-8 border-x-transparent"></div>
                    <div className="mt-2">
                        <div className="flex flex-col gap-2">
                            <div className="relative group w-fit">
                                <Typography variant="label">
                                    {selectedBox?.name}
                                </Typography>
                                <CopyInfoData
                                    text={selectedBox?.name}
                                    type={'Business Name'}
                                />
                            </div>
                            <div className="flex items-center gap-x-1">
                                <ImLocation />
                                <Typography variant="small">
                                    {selectedBox?.address}
                                </Typography>
                            </div>
                            <div className="flex items-center gap-x-1">
                                <GiPathDistance />
                                <Typography variant="small">
                                    {(selectedBox?.distance).toFixed(2)} KM Away
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
