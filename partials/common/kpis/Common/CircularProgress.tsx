import { PulseLoader } from 'react-spinners'

export const CircularProgress = ({
    value,
    loading,
}: {
    value: number
    loading?: boolean
}) => {
    const radius = 18
    const strokeWidth = 4
    const diameter = radius * 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (value / 100) * circumference

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                width={diameter + strokeWidth}
                height={diameter + strokeWidth}
                viewBox={`0 0 ${diameter + strokeWidth} ${
                    diameter + strokeWidth
                }`}
                className="transform rotate-90"
            >
                <circle
                    cx={(diameter + strokeWidth) / 2}
                    cy={(diameter + strokeWidth) / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="transparent"
                    className="text-blue-100"
                />
                <circle
                    cx={(diameter + strokeWidth) / 2}
                    cy={(diameter + strokeWidth) / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="text-[#FFB536] transition-all duration-300 ease-in-out"
                />
            </svg>
            <span className="absolute text-[10px]  text-black">
                {loading ? (
                    <PulseLoader size={4} color={'#FFB536'} />
                ) : (
                    `${value}%`
                )}
            </span>
        </div>
    )
}
