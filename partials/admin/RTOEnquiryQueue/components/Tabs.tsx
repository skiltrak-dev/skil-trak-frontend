import { Badge } from '@components/Badge/Badge'
import React, { useMemo } from 'react'
import { RtoInquiryRequestStatus } from '../enum'
import { AdminApi } from '@queries'
import { EnquiryFilters } from '../RTOEnquiryQueue'
import { removeEmptyValues } from '@utils'

interface TabItem {
    value: string
    label: string
    count: number
    badgeColor?: string
}

interface TabsProps {
    onValueChange: (value: RtoInquiryRequestStatus) => void
    className?: string
    filters: EnquiryFilters
}
export const Tabs = ({ filters, onValueChange, className = '' }: TabsProps) => {
    const { status, ...rest } = filters || {}
    const getRtoEnquiriesCounts = AdminApi.RtoEnquiry.getRtoEnquiriesCounts(
        {
            search: `${JSON.stringify(
                removeEmptyValues({
                    ...rest,
                })
            )
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
        },
        { refetchOnMountOrArgChange: 30 }
    )

    const tabs = useMemo(
        () => [
            {
                value: RtoInquiryRequestStatus.All,
                label: 'All',
                count: getRtoEnquiriesCounts?.data?.all,
                badgeColor: 'bg-gray-200 text-gray-600',
            },
            {
                value: RtoInquiryRequestStatus.IN_PROGRESS,
                label: 'IN PROGRESS',
                count: getRtoEnquiriesCounts?.data?.inProgress,
                badgeColor: 'bg-[#F7A619]/20 text-[#F7A619]',
            },

            {
                value: RtoInquiryRequestStatus.MATCHED,
                label: 'Matched',
                count: getRtoEnquiriesCounts?.data?.matched,
                badgeColor: 'bg-[#52c41a]/20 text-[#52c41a]',
            },
            {
                value: RtoInquiryRequestStatus.CLOSED,
                label: 'Closed',
                count: getRtoEnquiriesCounts?.data?.closed,
                badgeColor: 'bg-gray-200 text-gray-600',
            },
        ],
        [getRtoEnquiriesCounts?.data]
    )
    return (
        <div className={`mb-4 ${className}`}>
            <div className="grid grid-cols-5 w-full bg-[#f0f2f5] rounded-lg p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() =>
                            onValueChange(tab.value as RtoInquiryRequestStatus)
                        }
                        className={`
                            flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer
                            ${
                                status === tab.value
                                    ? 'bg-white text-[#0D5468] shadow-sm'
                                    : 'text-[#8c8c8c] hover:text-[#262626] hover:bg-white/50'
                            }
                        `}
                    >
                        <span>{tab?.label}</span>
                        <Badge
                            text={tab?.count}
                            variant="secondary"
                            className={`ml-1 ${
                                tab.badgeColor || 'bg-gray-200 text-gray-600'
                            }`}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
