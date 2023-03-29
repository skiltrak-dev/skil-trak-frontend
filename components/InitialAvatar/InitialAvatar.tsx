import classNames from 'classnames'
import { useState } from 'react'

// utils
import { trimText } from '@utils'

interface InitialAvatarProps {
    first?: boolean
    name: string
    imageUrl?: string
    show?: number
    description?: string
    small?: boolean
    large?: boolean
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
    large,
    small,
}: InitialAvatarProps) => {
    // const backgroundColor = 'bg-indigo-800'
    const initials = name?.split(' ')
    const [zoomImage, setZoomImage] = useState(false)
    const backgroundColor = (BgColors as any)[
        initials[0].charAt(0).toLowerCase()
    ]
    const classes = classNames({
        [`${backgroundColor} transition-all rounded-full relative border-white shadow hover:shadow-md flex items-center justify-center`]:
            true,
        'w-12 h-12 border-2': large,
        'w-8 h-8 border-2': !small && !large,
        'w-6 h-6 border-1': small,
        '-ml-2': !first,
    })

    const onImageEnter = () => {
        setZoomImage(true)
    }
    const onImageLeave = () => {
        setZoomImage(false)
    }

    return (
        <div className="relative hover:z-30 cursor-pointer group">
            <div className={classes}>
                {imageUrl ? (
                    <div
                        className="relative w-full h-full"
                        onMouseEnter={onImageEnter}
                        onMouseLeave={onImageLeave}
                    >
                        {/* <Image
                            src={imageUrl}
                            width={24}
                            height={24}
                            className="rounded-full"
                            alt=""
                        /> */}
                        <div
                            className="rounded-full bg-center bg-cover bg-no-repeat w-full h-full"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                        />
                        <div
                            className={`absolute z-20 rounded-md bg-center bg-cover bg-no-repeat top-full left-0 transition-all duration-200 ${
                                zoomImage ? 'w-44 h-44' : 'w-0 h-0'
                            }`}
                            style={{ backgroundImage: `url(${imageUrl})` }}
                        />

                        {/* <Image
                            src={imageUrl}
                            width={96}
                            height={96}
                            className="absolute"
                            alt=""
                        /> */}
                    </div>
                ) : (
                    <div
                        className={`${
                            small ? 'text-[10px]' : 'text-xs'
                        } text-white font-medium`}
                    >
                        <p className="uppercase">
                            {initials.length > 1
                                ? `${initials[0].charAt(0)}${initials[1].charAt(
                                      0
                                  )}`
                                : `${initials[0].charAt(0)}${initials[0].charAt(
                                      1
                                  )}`}
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
