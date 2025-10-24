import { Select } from '@components'
import { Button } from '@components/buttons/Button/Button'
import { Card } from '@components/cards/Card/Card'
import { TextInput } from '@components/inputs/TextInput'
import { Download, Search } from 'lucide-react'
import { ChangeEvent, useMemo, useState, useCallback } from 'react'
import { Enquiries, TableHeader, Tabs } from './components'
import { RtoInquiryRequestStatus } from './enum'
import { PremiumFeatureTypes } from '@partials/rto-v2/dashboard/enum'
import debounce from 'lodash/debounce'

export interface EnquiryFilters {
    status: RtoInquiryRequestStatus
    name: string
    type: PremiumFeatureTypes | null
}

export function RTOEnquiryQueue() {
    const [filters, setFilters] = useState<EnquiryFilters>({
        status: RtoInquiryRequestStatus.All,
        name: '',
        type: null,
    })

    const serviceTypes = Object.entries(PremiumFeatureTypes).map(
        ([label, value]) => ({
            label,
            value,
        })
    )

    const updateFilter = (key: keyof EnquiryFilters, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    // Create a debounced function for name updates
    const debouncedUpdateName = useMemo(
        () =>
            debounce((value: string) => {
                updateFilter('name', value)
            }, 700),
        []
    )

    return (
        <div className="space-y-6">
            {/* Filters & Controls */}
            <Card>
                <div className="pb-3">
                    <div className="flex flex-col lg:flex-row gap-3">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8c8c8c]" />
                            <TextInput
                                name="search"
                                placeholder="Search by RTO name, service type, or requirements..."
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
                                    debouncedUpdateName(e.target.value)
                                }}
                                className="pl-9"
                            />
                        </div>

                        <div className="w-96">
                            <Select
                                name="serviceTypes"
                                options={serviceTypes}
                                placeholder="All Service Types"
                                onChange={(e: PremiumFeatureTypes) => {
                                    updateFilter('type', e)
                                }}
                                onlyValue
                            />
                        </div>

                        {/* Export */}
                        <div>
                            <Button
                                variant="secondary"
                                text="Export"
                                Icon={() => <Download size={12} />}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    {/* Status Tabs */}
                    <Tabs
                        className="mb-4"
                        filters={filters}
                        onValueChange={(value) => updateFilter('status', value)}
                    />

                    {/*  */}
                    <TableHeader />

                    {/*  */}
                    <Enquiries filters={filters} />
                </div>
            </Card>
        </div>
    )
}
