import { Button, GlobalModal, Typography } from '@components'
import React from 'react'
import { MdCheckCircle, MdDescription, MdSearch, MdClose } from 'react-icons/md'

interface ConfirmationModalProps {
    onCancel: () => void
    activeItems: number
    onConfirmSubmit: () => void
    onFindMoreIndustries: () => void
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    onCancel,
    activeItems,
    onConfirmSubmit,
    onFindMoreIndustries,
}) => {
    return (
        <GlobalModal onCancel={onCancel}>
            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div
                            className="text-xl bg-clip-text text-transparent flex items-center gap-2"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to right, #044866, #0D5468)',
                            }}
                        >
                            <MdCheckCircle
                                className="w-5 h-5"
                                style={{ color: '#F7A619' }}
                            />
                            Submit Complete!
                        </div>
                        <button
                            onClick={onCancel}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <MdClose className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                    <div className="text-gray-600 pt-2">
                        Your {activeItems} companies have been successfully
                        submitted to the Industry Listing. What would you like
                        to do next?
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex flex-col gap-3">
                        <Button
                            variant="primaryNew"
                            onClick={onConfirmSubmit}
                            text="Close Page"
                            Icon={MdDescription}
                        />

                        <Button
                            outline
                            onClick={onFindMoreIndustries}
                            Icon={MdSearch}
                            text="Find More Industries"
                        />
                    </div>

                    <div
                        className="mt-4 p-3 rounded-lg border"
                        style={{
                            backgroundColor: 'rgba(4, 72, 102, 0.05)',
                            borderColor: 'rgba(4, 72, 102, 0.2)',
                        }}
                    >
                        <div
                            className="flex items-center gap-2 text-sm"
                            style={{ color: '#044866' }}
                        >
                            <MdCheckCircle className="w-4 h-4" />
                            <Typography variant="small" color="#044866">
                                Ready to submit {activeItems} companies to your
                                industry database
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
