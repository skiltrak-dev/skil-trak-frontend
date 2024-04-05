import Image from 'next/image'
import { LogoutAvatar } from './LogoutAvatar'
import { Typography } from '@components/Typography'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
export const LogoutDropDown = ({ isExpanded, setIsExpanded }: any) => {
    const toggleClick = () => setIsExpanded(!isExpanded)
    return (
        <div
            onClick={toggleClick}
            className="flex items-center gap-x-3 relative cursor-pointer"
        >
            <LogoutAvatar name="John Doe" />
            <Typography variant={'body'} medium color="text-primaryNew">
                John Doe
            </Typography>
            {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            <div
                className={`absolute left-2 top-10 bg-white shadow-lg rounded-md border w-32 ${
                    !isExpanded ? 'hidden' : 'block'
                }`}
            >
                <div className="text-sm text-slate-700 text-center font-medium hover:bg-primaryNew hover:text-white px-6 rounded-md py-2 transition-all ">
                    Logout
                </div>
            </div>
        </div>
    )
}
