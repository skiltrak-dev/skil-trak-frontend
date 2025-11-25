import { useRouter } from 'next/router'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
type CardProps = {
    title: string
    description: string
    image?: string
    active?: boolean
    sectionId?: string
}

export const SidebarCard: React.FC<CardProps> = ({
    title,
    description,
    image,
    active,
    sectionId,
}) => {
    const router = useRouter()

    const handleClick = () => {
        const url = sectionId ? `/sectors#${sectionId}` : '/sectors'
        router.push(url)
    }
    return (
        <div
            onClick={handleClick}
            className={`relative mb-4 transition-all duration-300 cursor-pointer
        ${active ? 'scale-105 z-20' : 'scale-100 z-10'}`}
        >
            {/* SVG Background */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1437 176"
                className="w-full h-36"
                preserveAspectRatio="none"
            >
                {/* Filled shape */}
                <path
                    d="M61.8046 29.7751C54.4403 20.6137 60.962 7.00391 72.7163 7.00391H92.5002H126.5H168H1415.67C1423.4 7.00391 1429.67 13.2719 1429.67 21.0039V154.438C1429.67 162.17 1423.4 168.438 1415.67 168.438H21.8965C14.1645 168.438 7.89648 162.17 7.89648 154.438V128.642C7.89648 122.591 11.7841 117.225 17.5339 115.34L87.775 92.3047C97.0712 89.2561 100.454 77.8557 94.3242 70.2305L61.8046 29.7751Z"
                    fill={image ? 'url(#imgPattern)' : '#044866'}
                />
                {/* Gradient stroke */}
                <path
                    d="M1415.67 3.50391C1425.33 3.50404 1433.17 11.339 1433.17 21.0039V154.438C1433.17 164.102 1425.33 171.937 1415.67 171.938H21.8965C12.2315 171.938 4.39648 164.102 4.39648 154.438V128.643C4.39648 121.079 9.2561 114.371 16.4434 112.014L86.6846 88.9785C93.6563 86.692 96.1931 78.1426 91.5967 72.4238L59.0771 31.9678C49.8718 20.516 58.0239 3.50391 72.7168 3.50391H1415.67Z"
                    stroke="url(#paint0_linear_1_665)"
                    strokeOpacity="0.23"
                    strokeWidth="7"
                    fill="none"
                />
                {image && (
                    <path
                        d="M61.8046 29.7751C54.4403 20.6137 60.962 7.00391 72.7163 7.00391H92.5002H126.5H168H1415.67C1423.4 7.00391 1429.67 13.2719 1429.67 21.0039V154.438C1429.67 162.17 1423.4 168.438 1415.67 168.438H21.8965C14.1645 168.438 7.89648 162.17 7.89648 154.438V128.642C7.89648 122.591 11.7841 117.225 17.5339 115.34L87.775 92.3047C97.0712 89.2561 100.454 77.8557 94.3242 70.2305L61.8046 29.7751Z"
                        fill="#044866" // deep navy blue
                        opacity="0.7" // adjust darkness (0.3–0.6 recommended)
                    />
                )}
                {/* defs for gradient + image */}
                <defs>
                    <linearGradient
                        id="paint0_linear_1_665"
                        x1="7.89638"
                        y1="87.7207"
                        x2="1429.67"
                        y2="87.7207"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#CCEFFF" />
                        <stop offset="0.98" stopColor="#0890CC" />
                    </linearGradient>
                    {image && (
                        <pattern
                            id="imgPattern"
                            patternUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                        >
                            <image
                                href={image}
                                width="1437"
                                height="176"
                                preserveAspectRatio="xMidYMid slice"
                            />
                        </pattern>
                    )}
                </defs>
            </svg>
            {/* Left angled SVG */}
            <div className="absolute left-2 bottom-12 flex items-center z-10">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="93"
                    viewBox="0 0 65 93"
                    fill="none"
                >
                    <path
                        d="M0 0H20L61.8473 56.5714C67.6984 64.4812 63.7804 75.7999 54.2914 78.3996L1 93L0 0Z"
                        fill="#F9A307"
                    />
                </svg>
            </div>

            {/* Content on top of SVG */}
            <div className="absolute inset-x-0 top-10 flex items-center justify-between px-8">
                <div className="ml-20">
                    <h3 className="text-lg font-semibold text-white">
                        {title}
                    </h3>
                    <p className="text-sm mt-1 text-white/90">{description}</p>
                </div>

                <button
                    className={`flex items-center justify-center rounded-full border-2 w-10 h-10 transition-colors
            ${
                active
                    ? 'border-white text-white'
                    : 'border-black/40 text-black'
            }`}
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    )
}
