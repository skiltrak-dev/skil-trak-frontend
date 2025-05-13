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

    const getColor = (percentage: any) => {
        if (percentage < 40) return '#F87171' // Red
        if (percentage < 70) return '#F97316' // Orange
        if (percentage < 90) return '#FBBF24' // Yellow
        return '#4ADE80' // Green
    }
    const getLightColor = (percentage: any) => {
        if (percentage < 40) return '#FEE2E2'
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
