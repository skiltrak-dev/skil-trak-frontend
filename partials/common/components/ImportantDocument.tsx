import Image from 'next/image'
export const ImportantDocument = ({
    imageUrl,
    title,
}: {
    imageUrl: string
    title: string
}) => {
    return (
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
    )
}
