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
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 71 74" fill="none" className="mb-4">
                                <path d="M15.1875 20.25C13.185 20.25 11.2274 19.6562 9.56235 18.5436C7.8973 17.4311 6.59956 15.8498 5.83322 13.9997C5.06688 12.1496 4.86637 10.1138 5.25705 8.14972C5.64772 6.18566 6.61204 4.38156 8.02804 2.96555C9.44405 1.54954 11.2482 0.585229 13.2122 0.194554C15.1763 -0.196122 17.2121 0.00438697 19.0622 0.770724C20.9123 1.53706 22.4936 2.83481 23.6061 4.49986C24.7187 6.1649 25.3125 8.12247 25.3125 10.125C25.3125 12.8103 24.2458 15.3857 22.347 17.2845C20.4482 19.1833 17.8728 20.25 15.1875 20.25ZM15.1875 5.0625C14.1862 5.0625 13.2074 5.35942 12.3749 5.91569C11.5424 6.47196 10.8935 7.26262 10.5104 8.18767C10.1272 9.11272 10.0269 10.1306 10.2223 11.1126C10.4176 12.0947 10.8998 12.9967 11.6078 13.7047C12.3158 14.4127 13.2178 14.8949 14.1999 15.0902C15.1819 15.2856 16.1998 15.1853 17.1248 14.8021C18.0499 14.419 18.8405 13.7701 19.3968 12.9376C19.9531 12.1051 20.25 11.1263 20.25 10.125C20.25 8.78235 19.7166 7.49468 18.7672 6.54528C17.8178 5.59587 16.5302 5.0625 15.1875 5.0625ZM55.6875 20.25C53.685 20.25 51.7274 19.6562 50.0624 18.5436C48.3973 17.4311 47.0996 15.8498 46.3332 13.9997C45.5669 12.1496 45.3664 10.1138 45.757 8.14972C46.1477 6.18566 47.112 4.38156 48.528 2.96555C49.9441 1.54954 51.7482 0.585229 53.7122 0.194554C55.6763 -0.196122 57.7121 0.00438697 59.5622 0.770724C61.4123 1.53706 62.9936 2.83481 64.1061 4.49986C65.2187 6.1649 65.8125 8.12247 65.8125 10.125C65.8125 12.8103 64.7458 15.3857 62.847 17.2845C60.9481 19.1833 58.3728 20.25 55.6875 20.25ZM55.6875 5.0625C54.6862 5.0625 53.7074 5.35942 52.8749 5.91569C52.0424 6.47196 51.3935 7.26262 51.0104 8.18767C50.6272 9.11272 50.5269 10.1306 50.7223 11.1126C50.9176 12.0947 51.3998 12.9967 52.1078 13.7047C52.8158 14.4127 53.7178 14.8949 54.6999 15.0902C55.6819 15.2856 56.6998 15.1853 57.6248 14.8021C58.5499 14.419 59.3405 13.7701 59.8968 12.9376C60.4531 12.1051 60.75 11.1263 60.75 10.125C60.75 8.78235 60.2166 7.49468 59.2672 6.54528C58.3178 5.59587 57.0302 5.0625 55.6875 5.0625ZM60.75 73.4063H50.625C49.2823 73.4063 47.9947 72.8729 47.0453 71.9235C46.0959 70.9741 45.5625 69.6864 45.5625 68.3438V50.625H50.625V68.3438H60.75V45.5625H65.8125V30.375C65.8125 29.7037 65.5458 29.0598 65.0711 28.5851C64.5964 28.1104 63.9526 27.8438 63.2812 27.8438H47.0306L35.4375 48.0938L23.8444 27.8438H7.59375C6.92242 27.8438 6.27859 28.1104 5.80389 28.5851C5.32919 29.0598 5.0625 29.7037 5.0625 30.375V45.5625H10.125V68.3438H20.25V50.625H25.3125V68.3438C25.3125 69.6864 24.7791 70.9741 23.8297 71.9235C22.8803 72.8729 21.5927 73.4063 20.25 73.4063H10.125C8.78234 73.4063 7.49467 72.8729 6.54527 71.9235C5.59587 70.9741 5.0625 69.6864 5.0625 68.3438V50.625C3.71984 50.625 2.43217 50.0916 1.48277 49.1422C0.533369 48.1928 0 46.9052 0 45.5625V30.375C0 28.361 0.800054 26.4295 2.22416 25.0054C3.64826 23.5813 5.57976 22.7813 7.59375 22.7813H26.7806L35.4375 37.9688L44.0944 22.7813H63.2812C65.2952 22.7813 67.2267 23.5813 68.6508 25.0054C70.075 26.4295 70.875 28.361 70.875 30.375V45.5625C70.875 46.9052 70.3416 48.1928 69.3922 49.1422C68.4428 50.0916 67.1552 50.625 65.8125 50.625V68.3438C65.8125 69.6864 65.2791 70.9741 64.3297 71.9235C63.3803 72.8729 62.0927 73.4063 60.75 73.4063Z" fill="#043873" />
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
