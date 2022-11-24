import classNames from 'classnames'
import Image from 'next/image'

interface InitialAvatarProps {
    first?: boolean
    name: string
    imageUrl?: string
    show?: number
    description?: string
    small?: boolean
}

const BgColors = [
    'bg-blue-500',
    'bg-sky-500',
    'bg-indigo-500',
    'bg-lime-500',
    'bg-teal-500',
    'bg-purple-500',
    'bg-rose-500',
]

export const InitialAvatar = ({
    first,
    name,
    imageUrl,
    description,
    small,
}: InitialAvatarProps) => {
    const backgroundColor = 'bg-indigo-800'
    // BgColors[Math.floor(Math.random() * BgColors.length)]
    const initials = name.split(' ')
    const classes = classNames({
        [`${backgroundColor} transition-all rounded-full relative border-white shadow hover:shadow-md flex items-center justify-center`]:
            true,
        'w-8 h-8 border-2': !small,
        'w-6 h-6 border-1': small,
        '-ml-2': !first,
    })

    return (
        <div className="relative hover:z-30 cursor-pointer group">
            <div className={classes}>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        width={24}
                        height={24}
                        className="rounded-full"
                    />
                ) : (
                    <div
                        className={`${
                            small ? 'text-[10px]' : 'text-xs'
                        } text-white font-medium`}
                    >
                        <p>
                            {initials.length > 1
                                ? `${initials[0].charAt(0)}${initials[1].charAt(
                                      0
                                  )}`
                                : initials[0].charAt(0)}
                        </p>
                    </div>
                )}
            </div>

            <div
                className={`hidden group-hover:block absolute -translate-x-1/2 left-1/2 top-9 bg-slate-800 text-slate-200 px-2 py-1 w-auto rounded`}
            >
                <div className="text-xs font-medium whitespace-nowrap">
                    {name}
                </div>
                <div className="text-[12px]">
                    <small className="whitespace-nowrap">{description}</small>
                </div>
            </div>
        </div>
    )
}
