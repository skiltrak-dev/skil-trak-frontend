import { Badge, GlobalModal, Typography } from '@components'
import React from 'react'
import { MdClose } from 'react-icons/md'

interface CompanyProfileModalProps {
    onCancel: () => void
    selectedCompany: any
}

export const CompanyProfileModal: React.FC<CompanyProfileModalProps> = ({
    onCancel,
    selectedCompany,
}) => {
    const getBadgeStyle = (type: string) => {
        switch (type) {
            case 'Private':
                return 'primaryNew'
            case 'Public':
                return 'primary'
            case 'Government':
                return 'secondary'
            case 'Not-for-profit':
                return 'primaryNew'
            default:
                return 'muted'
        }
    }
    return (
        <GlobalModal onCancel={onCancel}>
            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <Typography variant="h3">
                                Company Profile
                            </Typography>
                            <Typography variant="small" color="text-gray-600">
                                Detailed information about the selected company
                            </Typography>
                        </div>
                        <button
                            onClick={onCancel}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <MdClose className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {selectedCompany && (
                        <div className="space-y-4">
                            <Typography variant="h4">
                                {selectedCompany.name}
                            </Typography>
                            <Typography variant="body" color="text-gray-600">
                                {selectedCompany.address}
                            </Typography>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant={getBadgeStyle(
                                        selectedCompany.type
                                    )}
                                    text={selectedCompany.type}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </GlobalModal>
    )
}
