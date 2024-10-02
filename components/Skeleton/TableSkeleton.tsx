import React from 'react'
import { SkeletonLoader } from './SkeletonLoader'
import { Card } from '@components/cards'

const TableSkeletonRow = () => (
    <tr className="border-b border-gray-200">
        <td className="py-3 px-2">
            <SkeletonLoader width="w-5" height="h-5" />
        </td>
        <td className="py-3 px-2">
            <div className="flex items-center space-x-3">
                <SkeletonLoader
                    width="w-10"
                    height="h-10"
                    className="rounded-full"
                />
                <div>
                    <SkeletonLoader width="w-32" className="mb-2" />
                    <SkeletonLoader width="w-40" height="h-3" />
                </div>
            </div>
        </td>
        <td className="py-3 px-2">
            <SkeletonLoader width="w-20" />
        </td>
        <td className="py-3 px-2">
            <SkeletonLoader width="w-20" />
        </td>
        <td className="py-3 px-2">
            <SkeletonLoader width="w-8" />
        </td>
        <td className="py-3 px-2">
            <SkeletonLoader width="w-32" />
        </td>
        <td className="py-3 px-2">
            <SkeletonLoader width="w-40" />
        </td>
        <td className="py-3 px-2">
            <SkeletonLoader width="w-20" />
        </td>
        <td className="py-3 px-2">
            <SkeletonLoader width="w-20" />
        </td>
    </tr>
)
export const TableSkeleton = ({ arrayLength }: any) => {
    return (
        <div className="mb-4">
            <Card>
                <div className="flex justify-between items-center mb-5">
                    <SkeletonLoader width="w-20" height="h-5" />
                    <SkeletonLoader width="w-14" height="h-5" />
                </div>
                {/* <div className="flex items-center space-x-2 mb-2">
                    <SkeletonLoader width="w-24" height="h-10" />
                    <SkeletonLoader width="w-16" height="h-6" />
                </div> */}
                <table className="w-full">
                    <thead className="">
                        <tr className="bg-gray-100">
                            {Array.from({ length: 9 }).map((_, index) => (
                                <th key={index} className="p-2">
                                    <SkeletonLoader
                                        width="w-full"
                                        height="h-4"
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(arrayLength)].map((_, index) => (
                            <TableSkeletonRow key={index} />
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}
