import { Badge } from '@components'
import { CourseProgramData } from '@types'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { DeleteIndustryCourseProgramCard } from './DeleteIndustryCourseProgramCard'

export const IndustryCourseProgramCard = ({
    program,
}: {
    program: CourseProgramData
}) => {
    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleDelete = () => {
        setShowConfirmation(true)
    }

    const handleCancel = () => {
        setShowConfirmation(false)
    }

    if (showConfirmation) {
        return (
            <DeleteIndustryCourseProgramCard
                programId={program?.id}
                handleCancel={handleCancel}
            />
        )
    }

    return (
        <div className="relative w-full bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
            <button
                onClick={handleDelete}
                className="absolute top-2 right-2 p-1.5 hover:bg-red-100 rounded-lg transition-colors duration-200 group"
                title="Delete course program"
            >
                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
            </button>

            {/* Header */}
            <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <h3 className="font-bold text-gray-900">
                    {program?.courseProgram?.title}
                </h3>
                <p className="text-xs text-gray-600">
                    Hours: {program?.courseProgram?.hours || '--'}
                </p>
                <p className="text-xs text-gray-600">
                    Course: {program?.courseProgram?.course?.title}
                </p>
            </div>

            {/* Content */}
            <div className="p-2 space-y-1.5">
                {/* Delivery Mode */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">
                        Delivery:
                    </span>
                    <div className="flex gap-2">
                        {program?.deliveryMode?.map((mode) => (
                            <Badge text={mode} variant="secondary" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
