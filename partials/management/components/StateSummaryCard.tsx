import { Typography } from '@components'
import React from 'react'
import { MdOutlineSignalCellularAlt } from 'react-icons/md'
import { PuffLoader } from 'react-spinners'
type StateSummaryCardProps = {
    title: string
    count: number
    percentage?: string
    index: number
    loading?: boolean
}

export const StateSummaryCard = ({
    title,
    count,
    percentage,
    index,
    loading,
}: StateSummaryCardProps) => {
    const getColorTheme = (index: number) => {
        switch (index) {
            case 0:
                return 'bg-red-100 text-red-300'
            case 1:
                return 'bg-blue-100 text-blue-300'
            case 2:
                return 'bg-yellow-100 text-yellow-300'
            case 3:
                return 'bg-green-100 text-green-300'
            case 4:
                return 'bg-orange-100 text-orange-300'
            default:
                return ''
        }
    }
    return (
        <div className="bg-white rounded-2xl shadow-sm border px-6 py-7 flex gap-x-5 items-center w-full">
            <div className={`${getColorTheme(index)} p-3 rounded-lg`}>
                <MdOutlineSignalCellularAlt className={``} size={25} />
            </div>
            <div className="flex flex-col gap-y-0.5">
                <Typography variant="small" color="text-gray-400" bold>
                    {title}
                </Typography>
                <div className="flex items-center gap-x-4">
                    {loading ? (
                        <div className="h-[36px]">
                            <PuffLoader size={28} />
                        </div>
                    ) : (
                        <Typography variant="title" bold>
                            {count || 0}
                        </Typography>
                    )}

                    {/* {percentage && (
                        <Typography
                            variant="muted"
                            color="text-green-300"
                            semibold
                        >
                            {`(${percentage})`}
                        </Typography>
                    )} */}
                </div>
            </div>
        </div>
    )
}
