import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const BlogCard = ({
    title,
    date,
    content,
    featuredImage,
    id,
    slug,
    author
}: any) => {
    const router = useRouter()
    return (
        <div className="bg-[#FFFCF7] rounded-xl shadow-md px-2 py-1.5 h-[390px]">
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

                    <h1 className="font-bold uppercase mb-1.5">{title}</h1>
                    <div
                        className="break-all block mr-6 text-gray-400 text-sm"
                        dangerouslySetInnerHTML={{
                            __html: content?.substr(0, 200) + '...',
                        }}
                    />
                </div>
            </Link>
        </div>
    )
}
