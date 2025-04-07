import { useWindowWidth } from '@hooks'
import { ellipsisText } from '@utils'
import moment from 'moment'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export const BlogCard = ({
    title,
    date,
    content,
    featuredImage,
    id,
    slug,
    author,
    shortDescription,
    metaData,
}: any) => {
    function isMobile(width: any) {
        return width <= 768
    }
    const width = useWindowWidth()
    const mobile = isMobile(width)
    return (
        <div className="bg-[#FFFCF7] rounded-xl shadow-md px-2 py-1.5 h-[390px] overflow-hidden">
            <Head>
                <title>{ellipsisText(title, 11)}</title>
                <meta
                    name="description"
                    content={`${
                        metaData ||
                        'Skiltrak, we are specialized in student placement'
                    }`}
                    key="desc"
                />
            </Head>
            <Link href={`blogs/${slug}`}>
                <div className="h-[150px] relative overflow-hidden rounded-xl">
                    <Image
                        src={featuredImage}
                        alt="blog-card"
                        width={150}
                        height={150}
                        sizes="100vw"
                        className="object-cover w-full"
                    />
                </div>
                <div className="min-h-[130px] px-3 py-2">
                    <div className="flex items-center justify-between my-1">
                        <p className="text-[#DADADA] text-xs font-bold">
                            Published by {author}
                        </p>
                        <p className="text-[#DADADA] text-xs">
                            {moment(date)?.format('Do MMM YYYY')}
                        </p>
                    </div>

                    <h1 className="font-bold uppercase mb-1.5">
                        {ellipsisText(title, 26)}
                    </h1>
                    <div
                        className="blog-content text-justify block mr-6 text-gray-400 text-xs"
                        // dangerouslySetInnerHTML={{
                        //     __html: content.substr(0, 10) + '...',
                        // }}
                    >
                        {(shortDescription &&
                            shortDescription?.substr(0, mobile ? 180 : 460) +
                                '...') ||
                            ' '}
                    </div>
                </div>
            </Link>
        </div>
    )
}
