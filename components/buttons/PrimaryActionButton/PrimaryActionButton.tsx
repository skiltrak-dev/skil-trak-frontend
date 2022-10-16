import { LottieAnimation } from '@components/LottieAnimation'
import Link from 'next/link'

// components

export interface PrimaryActionButtonProps {
    title: string
    description: string
    image?: string
    shadow?: boolean
    link: string
    animation: any
}

export const PrimaryActionButton = ({
    title,
    description,
    image,
    shadow = true,
    link,
    animation,
}: PrimaryActionButtonProps) => {
    return (
        <Link href={`${link}` || '/under-construction'}>
            <a
                className={`border flex justify-between items-center gap-x-5 py-1 px-4 rounded-lg w-full cursor-pointer bg-white hover:bg-gray-50`}
            >
                <div className="flex-grow">
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-gray-400 text-xs">{description}</p>
                </div>
                {image ? (
                    <img className="h-16" src={image} alt="Info" />
                ) : animation ? (
                    <div>
                        <LottieAnimation animation={animation} height={80} />
                    </div>
                ) : (
                    <></>
                )}
            </a>
        </Link>
    )
}
