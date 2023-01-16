import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
export const ImportantDocument = ({
    imageUrl,
    title,
    href,
    detail,
}: {
    imageUrl: string
    title: string
    href?: string
    detail?: boolean
}) => {
    const detailContainerClasses = classNames({
        'flex items-center rounded-md bg-white cursor-pointer transition-all duration-300 shadow scale-100 hover:shadow-xl hover:scale-105':
            detail,
        'rounded-md bg-gray-700 cursor-pointer transition-all duration-300 shadow scale-100 hover:shadow-xl hover:scale-105':
            !detail,
    })

    const titleClasses = classNames({
        'text-sm text-gray-500 px-2 py-1': detail,
        'text-xs font-semibold drop-shadow text-white px-2 py-1': !detail,
    })

    return (
        <Link legacyBehavior href={href ? href : '#'}>
            <a className="w-full">
                <div className={detailContainerClasses}>
                    <Image
                        width={detail ? 60 : 200}
                        height={detail ? 50 : 150}
                        src={imageUrl}
                        alt={title}
                        className="rounded-t w-full"
                    />
                    <p className={titleClasses}>{title}</p>
                </div>
            </a>
        </Link>
    )
}
