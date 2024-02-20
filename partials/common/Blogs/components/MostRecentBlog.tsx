import { useWindowWidth } from '@hooks'
import { ellipsisText } from '@utils'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const MostRecentBlog = ({
    title,
    date,
    content,
    featuredImage,
    id,
    author,
    slug,
    shortDescription,
}: any) => {
    const router = useRouter()

    function isMobile(width: any) {
        return width <= 768
    }
    const width = useWindowWidth()
    const mobile = isMobile(width)
    return (
        <div className="bg-[#FFFCF7] rounded-xl shadow-md px-2 py-1.5 h-[220px]">
            <Link href={`blogs/${slug}`} className="">
                <div className="overflow-hidden relative rounded-xl h-[100px]">
                    <Image
                        src={featuredImage}
                        alt="blog-card"
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
                <div className="flex items-center justify-between my-3">
                    <p className="text-[#DADADA] text-xs font-bold">
                        Published by {author || 'N/A'}
                    </p>
                    <p className="text-[#DADADA] text-xs">
                        {moment(date).format('Do MMM YYYY')}
                    </p>
                </div>

                <h1 className="font-bold uppercase mb-1.5">
                    {ellipsisText(title, 26)}
                </h1>
                <div
                    className="blog-content block mr-6 text-gray-400 text-xs"
                    // dangerouslySetInnerHTML={{
                    //     __html: content.substr(0, 10) + '...',
                    // }}
                >
                    {(shortDescription &&
                        shortDescription?.substr(0, mobile ? 40 : 80) +
                            '...') ||
                        ' '}
                </div>
            </Link>
        </div>
    )
}
