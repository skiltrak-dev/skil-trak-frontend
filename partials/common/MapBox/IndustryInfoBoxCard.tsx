import { Card, LoadingAnimation, NoData, Typography } from '@components'
import { ellipsisText } from '@utils'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillStar } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { PulseLoader } from 'react-spinners'
import StarRatings from 'react-star-ratings'

export const IndustryInfoBoxCard = ({
    item,
    selectedBox,
    setSelectedBox,
    industryId,
}: any) => {
    // const url =
    //     selectedBox.photos &&
    //     selectedBox?.photos[0]?.html_attributions?.map((attribution: any) => {
    //         const anchorTagRegex =
    //             /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/i
    //         const match = attribution.match(anchorTagRegex)
    //         return match ? match[1] : null
    //     })
    // const urlString = url && url[0]

    return (
        <div className='min-w-72'>
            {item.isError && <NoData text="Something is not right...!" />}
            {item?.isLoading ? (
                <PulseLoader />
            ) : (
                <>
                    <div className="w-10 rounded-full h-10 relative z-50 border border-gray-200 ml-3">
                        <Image
                            src={'/images/icons/avatars/std-boy.png'}
                            alt={'avatar'}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </div>
                    <div className="relative w-64 bg-white px-2.5 py-5 rounded-lg shadow-lg -mt-5">
                        <FaTimes
                            size={18}
                            className="cursor-pointer absolute top-2 right-2"
                            onClick={() => {
                                setSelectedBox(null)
                            }}
                        />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-b-8 border-b-white border-x-8 border-x-transparent"></div>
                        <div className="mt-2">
                            <Typography variant="title">
                                {ellipsisText(item?.data?.user?.name, 15)}
                            </Typography>
                        </div>
                        <div className="mt-1">
                            <Typography variant="muted" color={'text-gray-400'}>
                                Address
                            </Typography>
                            <Typography variant="small">
                                {item?.data?.addressLine1 || 'N/A'}
                            </Typography>
                        </div>
                        <div className="flex justify-center mt-1.5">
                            <Link
                                className="text-blue-400 font-medium text-sm"
                                href={`/portals/sub-admin/users/industries/${item?.data?.id}?tab=students`}
                            >
                                View Profile
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
