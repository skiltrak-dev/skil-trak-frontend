// import React from 'react'

// interface ProfileCompletionProps {
//     completedItems: number
//     totalItems: number
//     size?: number
//     strokeWidth?: number
//     showLabel?: boolean
// }

// const ProfileCompletionProgress = ({
//     completedItems,
//     totalItems,
//     size = 40,
//     strokeWidth = 4,
//     showLabel = true,
// }: ProfileCompletionProps) => {
//     const radius = (size - strokeWidth) / 2
//     const circumference = 2 * Math.PI * radius
//     const percentage = Math.round((completedItems / totalItems) * 100)
//     const strokeDashoffset = circumference - (percentage / 100) * circumference

//     // Determine color based on completion percentage
//     const getColor = () => {
//         if (percentage === 100) return '#10B981' // Green-500 for complete
//         if (percentage >= 75) return '#3B82F6' // Blue-500 for mostly complete
//         if (percentage >= 50) return '#F59E0B' // Amber-500 for half complete
//         return '#EF4444' // Red-500 for mostly incomplete
//     }

//     return (
//         <div className="flex items-center space-x-2">
//             <div className="relative" style={{ width: size, height: size }}>
//                 {/* Background Circle */}
//                 <svg width={size} height={size} className="rotate-[-90deg]">
//                     <circle
//                         cx={size / 2}
//                         cy={size / 2}
//                         r={radius}
//                         fill="none"
//                         stroke="#E5E7EB" // Gray-200
//                         strokeWidth={strokeWidth}
//                     />
//                     {/* Progress Circle */}
//                     <circle
//                         cx={size / 2}
//                         cy={size / 2}
//                         r={radius}
//                         fill="none"
//                         stroke={getColor()}
//                         strokeWidth={strokeWidth}
//                         strokeDasharray={circumference}
//                         strokeDashoffset={strokeDashoffset}
//                         strokeLinecap="round"
//                     />
//                 </svg>
//                 {/* Percentage Text */}
//                 <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">
//                     {percentage}%
//                 </div>
//             </div>

//             {/* {showLabel && (
//                 <div className="text-sm text-gray-600">
//                     {completedItems}/{totalItems} complete
//                 </div>
//             )} */}
//         </div>
//     )
// }

// export default ProfileCompletionProgress

import React from 'react'

interface ProfileCompletionProps {
    completedItems: number
    totalItems: number
    height?: number
    showLabel?: boolean
    showPercentage?: boolean
}

const ProfileCompletionProgress = ({
    completedItems,
    totalItems,
    height = 24,
    showLabel = true,
    showPercentage = true,
}: ProfileCompletionProps) => {
    const percentage = Math.round((completedItems / totalItems) * 100)

    // Determine color based on completion percentage
    // const getColor = () => {
    //     if (percentage >= 95) return '#4ADE80' // Green (like in the image)
    //     if (percentage >= 75) return '#FBBF24' // Yellow (like in the image)
    //     if (percentage >= 50) return '#F97316' // Orange (like in the image)
    //     return '#F87171' // Light red (like in the image)
    // }
    const getColor = (percentage: any) => {
        if (percentage < 40) return '#F87171' // Red
        if (percentage < 70) return '#F97316' // Orange
        if (percentage < 90) return '#FBBF24' // Yellow
        return '#4ADE80' // Green
    }
    const getLightColor = (percentage: any) => {
        if (percentage < 40) return '#FEE2E2' // Light Red
        if (percentage < 70) return '#FFEDD5' // Light Orange
        if (percentage < 90) return '#FEF9C3' // Light Yellow
        return '#DCFCE7' // Light Green
    }
    // const BatteryIndicator = ({ percentage }: any) => {
    //     const color = getColor(percentage)
    //     return (
    //         <div className="flex items-center">
    //             <div className="w-8 h-4 border border-gray-400 rounded-sm relative flex">
    //                 <div
    //                     className="h-full rounded-sm"
    //                     style={{
    //                         width: `${percentage}%`,
    //                         backgroundColor: color,
    //                     }}
    //                 />
    //             </div>
    //             <div className="w-1 h-2 bg-gray-400 rounded-r-sm" />
    //             <span className="ml-1 text-xs">{`${percentage}%`}</span>
    //         </div>
    //     )
    // }
    const ProgressBar = ({ percentage }: any) => {
        const color = getColor(percentage)
        const lightColor = getLightColor(percentage)
        return (
            <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden relative">
                <div
                    className="h-full rounded-full"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-medium text-gray-800">{`${percentage}%`}</span>
            </div>
        )
    }
    return <ProgressBar percentage={percentage} />
}

export default ProfileCompletionProgress
