import { Typography } from '@components'
import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'
import StarRatings from 'react-star-ratings'

export const FindWorkplaces = ({ item, selectedBox, setSelectedBox }: any) => {
    const url =
        item.photos &&
        item?.photos[0]?.html_attributions?.map((attribution: any) => {
            const anchorTagRegex =
                /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/i
            const match = attribution.match(anchorTagRegex)
            return match ? match[1] : null
        })
    const urlString = url && url[0]
    // console.log('lat', item?.geometry?.location?.lat())
    // console.log('lng', item?.geometry?.location?.lng())
    // console.log("selectedBox", selectedBox)

    return (
        <a href={urlString} target="_/">
            <div
                onMouseEnter={(e: any) => {
                    setSelectedBox({
                        ...item,
                        position: {
                            lat:item?.geometry?.location?.lat(),
                            lng:item?.geometry?.location?.lng()

                        },
                    })
                }}
                onMouseLeave={() => {
                    setSelectedBox(null)
                }}
                className="flex items-center gap-x-4 mb-2"
            >
                <div>
                    <Image
                        className="rounded-lg h-full"
                        src="https://picsum.photos/200/300"
                        width={100}
                        height={80}
                        alt="Workplace"
                    />
                </div>
                <div className="flex flex-col">
                    <div>
                        <Typography variant="subtitle" color={'secondary'}>
                            {item?.name}
                        </Typography>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="pt-1">
                            <Typography variant="label" color="text-gray-600">
                                {item?.rating || 'N/A'}
                            </Typography>
                        </div>
                        <StarRatings
                            rating={item?.rating}
                            starRatedColor="orange"
                            numberOfStars={5}
                            name="rating"
                            starDimension="15px"
                            starSpacing="1px"
                        />
                        <span>({item.user_ratings_total || 'N/A'})</span>
                    </div>
                    <div>
                        <Typography variant="label" color={'text-gray-600'}>
                            {item?.vicinity}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="label" color={'text-gray-600'}>
                            {item?.opening_hours?.open_now ? (
                                <span className="text-green-400">Open</span>
                            ) : (
                                <span className="text-red-400">Closed</span>
                            )}
                        </Typography>
                    </div>
                    {/* <div>
                        <Typography variant="label" color={'text-gray-600'}>
                            Dine-in Takeaway Delivery
                        </Typography>
                    </div> */}
                </div>
            </div>
        </a>
    )
}
