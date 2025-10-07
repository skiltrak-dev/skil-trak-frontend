import { Check, X } from 'lucide-react'

interface PricingCardProps {
    variant: 'basic' | 'standard' | 'premium'
    title: string
    features: { text: string; included: boolean }[]
}

const colors = {
    basic: {
        plate: '#F9A307',
        capsule: 'bg-[#CE7D26] border-[#F4CB85]',
        button: 'text-[#E59400] border-[#000000]',
        width: 287.24,
        height: 523.934,
        capPosition: 'top-[4.7rem] left-10',
        plateePosition: '-bottom-2 right-7',
        topTrianglePosition: 'top-0 left-2 ',
        topTriangleSize: 'size-[30px]',
    },
    standard: {
        plate: '#9A2000',
        capsule: 'bg-[#E48971] border-[#9A2000]',
        button: 'text-[#9A2000] border-[#000000]',
        width: 313.616,
        height: 600,
        capPosition: 'top-24 left-10',
        plateePosition: '-bottom-1 right-0',
        topTrianglePosition: 'top-1 left-0 size-[30px]',
        topTriangleSize: 'size-[36px]',
    },
    premium: {
        plate: '#056F9D',
        capsule: 'bg-[#056F9D] border-[#8EEEFF]',
        button: 'text-[#056F9D] border-[#000000]',
        width: 304.417,
        height: 523.934,
        capPosition: 'top-[4.7rem] left-12',
        plateePosition: '-bottom-2 right-6',
        topTrianglePosition: 'top-0 left-4 size-[30px]',
        topTriangleSize: 'size-[32px]',
    },
}

export const PricingCard = ({ variant, title, features }: PricingCardProps) => {
    const color = colors[variant]
    const twPlateBg = `bg-[${color.plate}]`

    return (
        <div className="w-[322px]">
            {/* Colored plate behind (shadow effect) */}
            {/* <div
                className={`absolute inset-0 translate-x-2 translate-y-2 ${color.plate} rounded-[2rem]`}
            /> */}

            {/* SVG card shape */}
            <div className="relative z-30">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={color.width}
                    height={color.height}
                    viewBox="0 0 322 608"
                    fill="white"
                    className="relative z-20"
                >
                    <path d="M29.3522 18.0856L45.3147 1H317.616V16.3473C317.616 46.1707 293.439 70.3473 263.616 70.3473H78.6207C55.6286 70.3473 35.4795 85.7317 29.4223 107.912L28.8093 110.156C24.2537 126.838 24.4392 144.459 29.345 161.04L30.1445 163.743C35.8002 182.86 53.3598 195.977 73.2956 195.977H249.616C287.171 195.977 317.616 226.421 317.616 263.977V578C317.616 590.15 307.766 600 295.616 600H26C13.8497 600 4 590.15 4 578V44.2164L29.3522 18.0856Z" />
                </svg>
                <div className={`absolute ${color.topTrianglePosition}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="31"
                        height="30"
                        viewBox="0 0 31 30"
                        fill="none"
                    >
                        <g filter="url(#filter0_d_1_555)">
                            <path
                                d="M0 0H28.1511L11.9642 16.4595L0 29V0Z"
                                fill={color.plate}
                            />
                        </g>
                        <defs>
                            <filter
                                id="filter0_d_1_555"
                                x="0"
                                y="0"
                                width="30.1509"
                                height="30"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                            >
                                <feFlood
                                    flood-opacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dx="2" dy="1" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_1_555"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_1_555"
                                    result="shape"
                                />
                            </filter>
                        </defs>
                    </svg>
                </div>
                <div className={`absolute -z-10 ${color.plateePosition}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="250"
                        height="271"
                        viewBox="0 0 250 271"
                        fill="none"
                    >
                        <path
                            d="M222.919 244.628C224.576 244.628 225.919 243.285 225.919 241.628V12.2822C225.919 5.63267 231.31 0.242188 237.959 0.242188C244.609 0.242188 249.999 5.63268 249.999 12.2822V255C249.999 263.837 242.836 271 233.999 271H13.7854C6.50283 271 0.599121 265.097 0.599121 257.814C0.599121 250.531 6.50282 244.628 13.7854 244.628H222.919Z"
                            fill={color.plate}
                        />
                    </svg>
                </div>

                <div
                    className={`flex justify-center absolute ${color.capPosition} left-10 z-20`}
                >
                    <div
                        className={`px-12 py-4 border-[7px] rounded-full text-white font-bold text-3xl shadow-md ${color.capsule}`}
                    >
                        {title}
                    </div>
                </div>
                <div className="absolute top-[70%] transform -translate-y-[60%] z-20 flex flex-col justify-between h-[360px] p-6">
                    {/* Title capsule */}

                    {/* Features */}
                    <ul className="flex-1 mt-6 space-y-3 overflow-y-auto remove-scrollbar pr-4">
                        {features.map((f, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-gray-800 leading-snug"
                            >
                                {f.included ? (
                                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-[2px]" />
                                ) : (
                                    <X className="w-4 h-4 text-red-500 shrink-0 mt-[2px]" />
                                )}
                                <span>{f.text}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-center mt-10">
                        <button
                            className={`px-6 py-2 rounded-full border font-semibold ${color.button}`}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            {/* Card content inside */}
        </div>
    )
}
