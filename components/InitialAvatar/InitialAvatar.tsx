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

const BgColors = {
    a: 'bg-amber-500',
    b: 'bg-blue-500',
    c: 'bg-cyan-500',
    d: 'bg-gray-800',
    e: 'bg-emerald-500',
    f: 'bg-fuchsia-500',
    g: 'bg-green-500',
    h: 'bg-fuchsia-900',
    i: 'bg-indigo-500',
    j: 'bg-indigo-900',
    k: 'bg-gray-500',
    l: 'bg-lime-500',
    m: 'bg-amber-900',
    n: 'bg-neutral-500',
    o: 'bg-orange-500',
    p: 'bg-purple-500',
    q: 'bg-pink-900',
    r: 'bg-rose-500',
    s: 'bg-stone-500',
    t: 'bg-teal-500',
    u: 'bg-purple-900',
    v: 'bg-violet-500',
    w: 'bg-cyan-900',
    x: 'bg-yellow-900',
    y: 'bg-yellow-500',
    z: 'bg-zinc-500',
}

export const InitialAvatar = ({
    first,
    name,
    imageUrl,
    description,
    small,
}: InitialAvatarProps) => {
    // const backgroundColor = 'bg-indigo-800'
    const initials = name.split(' ')
    const backgroundColor = (BgColors as any)[
        initials[0].charAt(0).toLowerCase()
    ]
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
