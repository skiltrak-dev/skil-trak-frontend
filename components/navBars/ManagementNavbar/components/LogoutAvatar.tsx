import Image from 'next/image'

type Status = 'online' | 'offline'

interface AvatarProps {
    name: string
    size?: number
    imageUrl?: string
    width?: string
    height?: string
    status?: Status
}
export const LogoutAvatar = ({
    name,
    size = 40,
    imageUrl,
    width = 'w-9',
    height = 'h-9',
    status = 'offline',
}: AvatarProps) => {
    const initials = name
        .split(' ')
        .map((word: string) => word[0].toUpperCase())
        .join('')
        .slice(0, 2) // Take only the first two letters for initials

    const colorMap: any = {
        // Assign colors to each letter position (adjust as needed)
        A: 'bg-red-500',
        B: 'bg-orange-500',
        C: 'bg-yellow-500',
        D: 'bg-emerald-500',
        E: 'bg-teal-500',
        F: 'bg-blue-500',
        G: 'bg-indigo-500',
        H: 'bg-purple-500',
        I: 'bg-pink-500',
        J: 'bg-gray-800',
        K: 'bg-amber-500',
        L: 'bg-lime-500',
        M: 'bg-yellow-500',
        N: 'bg-emerald-500',
        O: 'bg-teal-500',
        P: 'bg-cyan-500',
        Q: 'bg-sky-500',
        R: 'bg-violet-500',
        S: 'bg-fuchsia-500',
        T: 'bg-rose-800',
        U: 'bg-stone-500',
        V: 'bg-neutral-500',
        W: 'bg-zinc-500',
        X: 'bg-slate-500',
        Y: 'bg-teal-500',
        Z: 'bg-blue-500',
    }

    return (
        <div className="relative">
            <div
                className={`absolute top-0 right-0 ${
                    status === 'online' ? 'bg-green-500' : ''
                }  rounded-full w-2.5 h-2.5`}
            ></div>
            <div
                className={`${
                    imageUrl ? 'border-none' : 'border-2 border-white'
                } ${width} ${height} ${
                    imageUrl ? 'bg-transparent' : `${colorMap[initials[0]]}`
                }  rounded-full flex items-center justify-center text-sm text-white font-bold `}
            >
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        height={size}
                        width={size}
                        alt="avatar"
                        className="rounded-full"
                    />
                ) : (
                    <span>{initials}</span>
                )}
            </div>
        </div>
    )
}
