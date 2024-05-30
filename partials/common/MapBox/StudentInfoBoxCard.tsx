import { Card, Typography } from '@components'
import { ellipsisText } from '@utils'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillStar } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import StarRatings from 'react-star-ratings'

export const StudentInfoBoxCard = ({
    item,
    selectedBox,
    setSelectedBox,
    studentId,
}: any) => {
    const url =
        selectedBox.photos &&
        selectedBox?.photos[0]?.html_attributions?.map((attribution: any) => {
            const anchorTagRegex =
                /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/i
            const match = attribution.match(anchorTagRegex)
            return match ? match[1] : null
        })
    const urlString = url && url[0]

    return (
        <>
            <div className="w-full flex justify-center ">
                <div
                    className={
                        'rounded-full h-12 w-12 relative z-50 border border-gray-200'
                    }
                >
                    <Image
                        src={'/images/icons/avatars/std-boy.png'}
                        alt={'avatar'}
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                </div>
            </div>
            <div className="relative flex flex-col gap-1 justify-center items-center w-64 bg-white px-2.5 py-5 rounded-lg shadow-lg -mt-5">
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
                        {ellipsisText(item?.name, 15)}
                    </Typography>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <Typography variant="small" color={'text-gray-400'}>
                        Student ID
                    </Typography>
                    <Typography variant="small">
                        {item?.student?.studentId || 'N/A'}
                    </Typography>
                </div>
                <div className="flex justify-center">
                    <Link
                        className="text-blue-400 text-base"
                        href={`/portals/sub-admin/students/${studentId}/detail`}
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </>
    )
}
