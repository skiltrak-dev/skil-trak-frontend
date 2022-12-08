import Image from 'next/image'
import Link from 'next/link'
export const ImportantDocument = ({
    imageUrl,
    title,
    href,
}: {
    imageUrl: string
    title: string
    href?: string
}) => {
    return (
        <Link href={href ? href : '#'}>
            <a className='w-full'>
                <div className="rounded-md bg-gray-700 cursor-pointer transition-all duration-300 shadow scale-100 hover:shadow-xl hover:scale-105">
                    <Image
                        width={200}
                        height={150}
                        src={imageUrl}
                        alt={title}
                        className="rounded-t w-full"
                    />
                    <p className="text-xs font-semibold drop-shadow text-white px-2 py-1">
                        {title}
                    </p>
                </div>
            </a>
        </Link>
    )
}
