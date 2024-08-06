import { AuthUtils } from '@utils'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { Desktop } from '@components/Responsive'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'

interface ProfileOptionButtonProps {
    onClick: Function
    expanded?: boolean
}

export const ProfileOptionButton = ({
    onClick,
    expanded,
}: ProfileOptionButtonProps) => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)
    const [credentials, setCredentials] = useState<any>(null)

    useEffect(() => {
        if (!credentials) {
            if (AuthUtils.isAuthenticated()) {
                setCredentials(AuthUtils.getUserCredentials())
            }
        }
    }, [credentials])

    const classes = classNames({
        'flex items-center cursor-pointer hover:bg-gray-100 py-2 rounded-md':
            true,
        'px-4': !isMobile,
        '': isMobile,
    })

    return (
        <div onClick={() => onClick()} className={classes}>
            {/* Image */}
            <div className="border w-[32px] h-[32px] rounded-lg overflow-hidden mr-2">
                <img
                    src={
                        credentials?.avatar ||
                        'https://images.unsplash.com/photo-1493030233192-040fe1b18799?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
                    }
                    className="object-cover w-full h-full"
                    alt=""
                />
            </div>

            {/* Name & Email */}
            <Desktop>
                <div>
                    <p className="text-sm font-semibold">
                        {credentials?.name || 'Anonymous'}
                    </p>
                    <p className="text-[11px] font-medium text-gray-400">
                        {credentials?.email || 'Not Provided'}
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
            </Desktop>
        </div>
    )
}
