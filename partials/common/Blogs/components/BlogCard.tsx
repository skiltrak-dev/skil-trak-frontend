import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const BlogCard = ({ title, date, content, featuredImage, id }: any) => {
    const router = useRouter()
    return (
        <div className="bg-[#FFFCF7] rounded-xl shadow-md px-2 py-1.5 h-[390px]">
            <Image
                src={featuredImage}
                alt="blog-card"
                width={150}
                height={150}
                sizes="100vw"
                className="rounded-xl w-full h-[200px]"
            />
            <div className="flex items-center justify-between my-3">
                <p className="text-[#DADADA] text-xs font-bold">Published</p>
                <p className="text-[#DADADA] text-xs">
                    {moment(date).format('Do MMM YYYY')}
                </p>
            </div>

            <h1 className="font-bold uppercase mb-1.5">{title}</h1>
            <div
                className="break-all block mr-6 text-gray-400 text-sm"
                dangerouslySetInnerHTML={{
                    __html: content.substr(0, 200) + '...',
                }}
            />
            <div
                onClick={() => {
                    router.push(`blogs/${id}`)
                }}
                className="cursor-pointer flex items-center justify-end text-blue-500"
            >
                view
            </div>
        </div>
    )
}
