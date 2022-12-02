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
            <a>
                <div className="rounded-md bg-gray-700 cursor-pointer transition-all duration-300 shadow scale-100 hover:shadow-xl hover:scale-105">
                    <Image
                        width={150}
                        height={80}
                        src={imageUrl}
                        alt={title}
                        className="rounded-t"
                    />
                    <p className="text-xs font-semibold drop-shadow text-white px-2 py-1">
                        {title}
                    </p>
                </div>
            </a>
        </Link>
    )
}
