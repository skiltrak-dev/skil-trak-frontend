import { ellipsisText } from '@utils'
import { Calendar, Download, Trash2 } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { DeleteIndustryGalleryCard } from './DeleteIndustryGalleryCard'

export const IndustryGalleryCard = ({
    index,
    gal,
}: {
    index: number
    gal: any
}) => {
    const [showConfirmation, setShowConfirmation] = useState(false)

    const getFileIcon = (fileType: string) => {
        if (fileType?.includes('pdf')) return '📄'
        if (fileType?.includes('word') || fileType?.includes('doc')) return '📝'
        if (fileType?.includes('image')) return '🖼️'
        if (fileType?.includes('text')) return '📃'
        return '📎'
    }

    const handleDownload = (submission: any) => {
        window.open(submission?.file)
    }

    const handleDelete = () => {
        setShowConfirmation(true)
    }

    const handleCancel = () => {
        setShowConfirmation(false)
    }

    if (showConfirmation) {
        return (
            <DeleteIndustryGalleryCard
                galleryId={gal?.id}
                handleCancel={handleCancel}
            />
        )
    }

    return (
        <div
            className="p-3 hover:bg-gray-50 transition-colors duration-200 group"
            style={{
                animation: `fadeIn 0.3s ease-in-out ${index * 0.1}s both`,
            }}
        >
            <div className="flex items-start gap-3">
                {/* File Icon */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <span className="text-xl">
                        {getFileIcon(gal?.file?.split('.')?.reverse()[0])}
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {gal?.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                        {ellipsisText(gal?.file, 35)}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                        <span className="inline-flex items-center text-[10px] text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {moment(gal?.createdAt).format('MMM DD, YYYY')}
                        </span>
                        <span className="text-[10px] text-gray-400">•</span>
                        <span className="text-[10px] text-gray-500 font-medium">
                            {gal?.fileSize} MB
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                        onClick={() => handleDownload(gal)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200 group/btn"
                        title="Download file"
                    >
                        <Download className="w-4 h-4 text-gray-500 group-hover/btn:text-blue-600 transition-colors" />
                    </button>
                    <button
                        onClick={() => handleDelete()}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-all duration-200 group/btn"
                        title="Delete submission"
                    >
                        <Trash2 className="w-4 h-4 text-gray-500 group-hover/btn:text-red-600 transition-colors" />
                    </button>
                </div>
            </div>
        </div>
    )
}
