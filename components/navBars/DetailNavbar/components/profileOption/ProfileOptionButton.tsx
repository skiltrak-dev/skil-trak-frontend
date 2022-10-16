import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface ProfileOptionButtonProps {
    imageUrl?: string
    name?: string
    email?: string
    onClick: Function
    expanded?: boolean
}

export const ProfileOptionButton = ({
    imageUrl,
    name,
    email,
    onClick,
    expanded,
}: ProfileOptionButtonProps) => {
    return (
        <div
            onClick={() => onClick()}
            className="flex items-center cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-md"
        >
            {/* Image */}
            <div className="border w-[32px] h-[32px] rounded-lg overflow-hidden mr-2">
                <img
                    src={
                        imageUrl ||
                        'https://images.unsplash.com/photo-1493030233192-040fe1b18799?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
                    }
                    alt=""
                />
            </div>

            {/* Name & Email */}
            <div>
                <p className="text-sm font-semibold">{name || 'Anonymous'}</p>
                <p className="text-[11px] font-medium text-gray-400">
                    {email || 'example@domain.com'}
                </p>
            </div>

            {/* Icon */}
            <div className="ml-2">
                <span
                    className={`block transition-all duration-300 ${
                        expanded ? 'rotate-180' : 'rotate-0'
                    }`}
                >
                    <FiChevronDown />
                </span>
            </div>
        </div>
    )
}
