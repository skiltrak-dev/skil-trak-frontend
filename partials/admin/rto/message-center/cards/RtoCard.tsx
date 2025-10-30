import { Rto } from '@types'
import { Building2 } from 'lucide-react'
import React from 'react'

export const RtoCard = ({
    rto,
    isSelected,
    onClick,
}: {
    isSelected: boolean
    rto: Rto
    onClick: () => void
}) => {
    return (
        <div
            key={rto.id}
            className={`p-4 transition-all cursor-pointer ${
                isSelected ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
            }`}
            onClick={onClick}
        >
            <div className="flex items-start gap-3">
                <input
                    className="noDefault w-4 h-4 !rounded-2xl"
                    checked={isSelected}
                    type="checkbox"
                />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                        <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-900 truncate">
                            {rto?.user?.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                            {rto?.rtoCode}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">
                            {rto?.addressLine1}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
