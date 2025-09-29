import { Button, GlobalModal, Typography } from '@components'
import React from 'react'
import { MdBlock, MdWarning, MdClose } from 'react-icons/md'

interface BlacklistWarningModalProps {
    onCancel: () => void
    onConfirmBlacklist: () => void
    itemToRemove: string
    removalReason: 'duplicate' | 'not-eligible' | 'keyword-match'
    mockResults: any[]
    companyAnalyses: Map<string, any>
}

export const BlacklistWarningModal: React.FC<BlacklistWarningModalProps> = ({
    onCancel,
    onConfirmBlacklist,
    itemToRemove,
    removalReason,
    mockResults,
    companyAnalyses,
}) => {
    return (
        <GlobalModal onCancel={onCancel}>
            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div className="text-xl flex items-center gap-2 text-primaryNew">
                            <MdBlock
                                className="w-5 h-5"
                                style={{ color: '#ef4444' }}
                            />
                            <Typography variant="small">
                                {removalReason === 'duplicate'
                                    ? 'Remove Duplicate'
                                    : removalReason === 'not-eligible'
                                    ? 'Remove Not Eligible'
                                    : 'Blacklist Warning'}
                            </Typography>
                        </div>
                        <button
                            onClick={onCancel}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <MdClose className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                    <div className="text-gray-600 pt-2">
                        {removalReason === 'duplicate' ? (
                            <>
                                You are removing this company because it appears
                                to be a <strong>possible duplicate</strong> of
                                an existing entry.
                                <br />
                                <br />
                                <strong>
                                    If you remove this company, it will be
                                    blacklisted
                                </strong>{' '}
                                and won't appear in future searches for this
                                industry.
                            </>
                        ) : removalReason === 'not-eligible' ? (
                            <>
                                You are removing this company because it may{' '}
                                <strong>not be eligible</strong> based on
                                SkilTrak database matching.
                                <br />
                                <br />
                                <strong>
                                    If you remove this company, it will be
                                    blacklisted
                                </strong>{' '}
                                and won't appear in future searches for this
                                industry.
                            </>
                        ) : (
                            <>
                                This company has significant keyword matches
                                with your selected industry sector.
                                <br />
                                <br />
                                <strong>
                                    If you remove this company, it will be
                                    blacklisted
                                </strong>{' '}
                                and won't appear in future searches for this
                                industry.
                            </>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {itemToRemove && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                            <div className="flex items-start gap-2">
                                <MdWarning className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <div className="font-medium text-red-800">
                                        {
                                            mockResults
                                                .flatMap((g) => g.companies)
                                                .find(
                                                    (c) => c.id === itemToRemove
                                                )?.name
                                        }
                                    </div>
                                    <div className="text-red-600 text-xs mt-1">
                                        <strong>Reason for removal:</strong>{' '}
                                        {removalReason === 'duplicate'
                                            ? 'Possible duplicate entry'
                                            : removalReason === 'not-eligible'
                                            ? 'Maybe not eligible (SkilTrak match)'
                                            : `Keyword matches: ${companyAnalyses
                                                  .get(itemToRemove)
                                                  ?.keywordMatches.slice(0, 3)
                                                  .map((m: any) => m.keyword)
                                                  .join(', ')}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                            <MdBlock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-yellow-800">
                                <div className="font-medium">
                                    Industry Blacklist Confirmation
                                </div>
                                <div className="text-xs mt-1">
                                    This industry will not come up in future
                                    listings. Can you confirm this action?
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={onConfirmBlacklist}
                            variant="error"
                            Icon={MdBlock}
                            text="Yes, Confirm Blacklist"
                        />

                        <Button variant="primaryNew" outline onClick={onCancel}>
                            Cancel - Keep in Results
                        </Button>
                    </div>

                    <div
                        className="mt-4 p-3 rounded-lg border"
                        style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.05)',
                            borderColor: 'rgba(239, 68, 68, 0.2)',
                        }}
                    >
                        <div className="flex items-center gap-2 text-sm text-red-700">
                            <MdWarning className="w-4 h-4" />
                            <Typography variant="small" color="text-red-700">
                                Blacklisted companies are permanently excluded
                                from this industry sector
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
