const data = [
    {
        id: 1,
        text: 'Centralised Placement Management Through Our Automated LMS',
        color: '#004c70',
        triangleColor: '#044866',
    },
    {
        id: 2,
        text: 'Streamlined Industry Partnerships Across Multiple Sectors',
        color: '#f4b41a',
        triangleColor: '#B27506',
    },
    {
        id: 3,
        text: 'Transparent Communication Between Coordinators, Students, And Host Employers',
        color: '#a0180f',
        triangleColor: '#992001',
    },
    {
        id: 4,
        text: 'Tools For Team Collaboration, Real-Time Tracking, And Performance Monitoring',
        color: '#004c70',
        triangleColor: '#044866',
    },
]

export const RtoFeaturesCard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-14 justify-items-center py-10 md:mx-auto md:max-w-7xl">
            {data.map((item) => (
                <div key={item.id} className="relative w-64">
                    <div className="absolute top-0 left-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="254"
                            height="120"
                            viewBox="0 0 254 120"
                            fill="none"
                        >
                            <path
                                d="M0 35C0 15.67 15.67 0 35 0H218.282C237.612 0 253.282 15.67 253.282 35V119.084H247.869V35.841C247.869 19.8247 234.885 6.84098 218.869 6.84098H34.2943C18.8303 6.84098 6.29429 19.377 6.29429 34.841V119.084H0V35Z"
                                fill={item.color}
                            />
                        </svg>
                    </div>
                    <div className="rounded-[36px] rounded-bl-[80px] w-[253px] shadow-2xl  overflow-hidden relative h-[350px] flex flex-col items-center justify-center text-center">
                        <div className="flex flex-col items-center justify-center px-6 py-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10 text-[#004c70] mb-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952A4.125 4.125 0 0021 15.75V14.25a4.125 4.125 0 00-2.381-3.769m-3.619 8.647v-1.5c0-.621-.505-1.125-1.125-1.125h-1.5m2.625 2.625c-.621 0-1.125-.504-1.125-1.125m-9.75 1.125a9.38 9.38 0 01-2.625-.372A9.337 9.337 0 012.25 15.75V14.25c0-1.64.933-3.059 2.381-3.769m0 0A4.125 4.125 0 019 6.75h6a4.125 4.125 0 014.125 4.125m-12.494 0a4.125 4.125 0 012.494-.825h6c.89 0 1.707.288 2.381.825M12 15.75h.008v.008H12v-.008z"
                                />
                            </svg>
                            <p className="text-sm font-medium text-gray-800 leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    </div>
                    {/* Bottom-right corner */}
                    <div className="absolute -bottom-5 -right-3">
                        <div className="absolute -top-[13.8px] -right-[0.2px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="32"
                                viewBox="0 0 16 32"
                                fill="none"
                            >
                                <path
                                    d="M0.414062 0.400391L15.3675 14.209L11.5299 19.1498L0.414062 31.3115V0.400391Z"
                                    fill={item.triangleColor}
                                />
                            </svg>
                        </div>
                        <div className="absolute bottom-0 -left-[12px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="20"
                                viewBox="0 0 30 20"
                                fill="none"
                            >
                                <path
                                    d="M0.277344 -0.00964355H29.2579L20.3917 9.99846L12.1872 19.3731L0.277344 -0.00964355Z"
                                    fill={item.triangleColor}
                                />
                            </svg>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="152"
                            height="173"
                            viewBox="0 0 153 173"
                            fill="none"
                        >
                            <g filter="url(#filter0_i_1_496)">
                                <path
                                    d="M72.0429 90.1543L152.5 0.208008V172.499H0.0546875L72.0429 90.1543Z"
                                    // fill="#F7A619"
                                    fill={item.color}
                                />
                            </g>
                            <text
                                x="70%"
                                y="80%"
                                textAnchor="middle"
                                fill="white"
                                fontSize="42"
                                fontWeight="bold"
                            >
                                {item.id}
                            </text>
                            <defs>
                                <filter
                                    id="filter0_i_1_496"
                                    x="0.0546875"
                                    y="0.208008"
                                    width="166.445"
                                    height="176.292"
                                    filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB"
                                >
                                    <feFlood
                                        flood-opacity="0"
                                        result="BackgroundImageFix"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="BackgroundImageFix"
                                        result="shape"
                                    />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feOffset dx="14" dy="4" />
                                    <feGaussianBlur stdDeviation="10" />
                                    <feComposite
                                        in2="hardAlpha"
                                        operator="arithmetic"
                                        k2="-1"
                                        k3="1"
                                    />
                                    <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in2="shape"
                                        result="effect1_innerShadow_1_496"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    )
}
