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
}: any) => {
    const router = useRouter()
    return (
        <div className="bg-[#FFFCF7] rounded-xl shadow-md px-2 py-1.5 h-[220px]">
            <Link href={`blogs/${title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}/${id}`} className="">
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

                <h1 className="font-bold uppercase mb-1.5">{title}</h1>
                <div
                    className="break-all block mr-6 text-gray-400 text-xs"
                    dangerouslySetInnerHTML={{
                        __html: content.substr(0, 10) + '...',
                    }}
                />
            </Link>
        </div>
    )
}
