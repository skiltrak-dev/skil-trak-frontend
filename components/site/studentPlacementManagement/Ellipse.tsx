import { Typography } from '@components/Typography'
import { IconType } from 'react-icons'
import { HiOutlineStatusOnline } from 'react-icons/hi'

export const Ellipse = ({ Icon, text }: { Icon: IconType; text: string }) => {
    return (
        <div className="relative">
            <div className="absolute -top-6 left-64">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="99"
                    height="99"
                    viewBox="0 0 99 99"
                    fill="none"
                >
                    <circle cx="49.5" cy="49.5" r="49.5" fill="#F7FAFF" />
                    <circle
                        cx="49.5"
                        cy="49.5"
                        r="49"
                        stroke="#50A1EB"
                        strokeOpacity="0.25"
                    />
                </svg>
            </div>
            <div className="absolute -top-5 left-[16.3rem]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="90"
                    viewBox="0 0 90 90"
                    fill="none"
                >
                    <circle cx="45" cy="45" r="45" fill="#F7FAFF" />
                    <circle
                        cx="45"
                        cy="45"
                        r="44.5"
                        stroke="#50A1EB"
                        strokeOpacity="0.25"
                    />
                </svg>
            </div>
            <div className="absolute text-center z-30 -top-1 left-[17.8rem]">
                <Icon className="text-4xl ml-1 mb-2 rounded-full p-2 bg-white shadow-lg" />
                <Typography variant="small">{text}</Typography>
            </div>
        </div>
    )
}
