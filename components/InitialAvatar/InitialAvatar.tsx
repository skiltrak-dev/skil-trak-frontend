import classNames from 'classnames'

interface InitialAvatarProps {
    first?: boolean
    name: string
    imageUrl?: string
    show?: number
    description?: string
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
}: InitialAvatarProps) => {
    const backgroundColor =
        BgColors[Math.floor(Math.random() * BgColors.length)]
    const initials = name.split(' ')
    const classes = classNames({
        [`${backgroundColor} transition-all w-8 h-8 rounded-full relative  border-white shadow hover:shadow-md border-2`]:
            true,
        '-ml-2': !first,
    })

    return (
        <div className="relative hover:z-30 cursor-pointer group">
            <div className={classes}>
                <span className="text-white text-xs font-medium absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
                    {initials.length > 1
                        ? `${initials[0].charAt(0)}${initials[1].charAt(0)}`
                        : initials[0].charAt(0)}
                </span>
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
