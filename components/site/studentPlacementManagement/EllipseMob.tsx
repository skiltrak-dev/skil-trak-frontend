import { Typography } from '@components/Typography'
import { HiOutlineStatusOnline } from 'react-icons/hi'

export const EllipseMob = ({ Icon, text }: any) => {
    return (
        <div className="relative">
            <div className="absolute -top-6 left-64">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
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
                    width="40"
                    height="40"
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
            <div className="absolute text-center z-30 -top-3 left-[16.5rem]">
                <Icon className="text-2xl ml-1 mb-2 rounded-full p-1 bg-white shadow-lg" />
                <Typography variant="xs">{text}</Typography>
            </div>
        </div>
    )
}
