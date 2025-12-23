import { useState } from 'react'
import { Card, EmptyData, Table, TableChildrenProps } from '@components'
import { IndustryFilterBar } from '../component'
import { useYourIndustriesColumns } from '../component/columns'
import { Industry } from '@types'

interface GlobalDirectoryTabProps {
    data: Industry[]
    getTotalCapacity: (industry: Industry) => number
    getTotalPlacements: (industry: Industry) => number
    getAvailablePositions: (industry: Industry) => number
    onView: (industry: Industry) => void
    onEdit: (industry: Industry) => void
    onDelete: (industry: Industry) => void
}

export const GlobalDirectoryTab = ({
    data,
    getTotalCapacity,
    getTotalPlacements,
    getAvailablePositions,
    onView,
    onEdit,
    onDelete,
}: GlobalDirectoryTabProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterSector, setFilterSector] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')

    const { getTableConfig, modal } = useYourIndustriesColumns()
    // We can pass specific action keys if needed, but default is fine for now
    const { columns } = getTableConfig()

    const filterIndustries = (industries: Industry[]) => {
        return industries.filter((industry) => {
            const matchesSearch =
                (industry.businessName || industry.user?.name || '')
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                (industry.location || '')
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                (industry.abn || '').toLowerCase().includes(searchTerm.toLowerCase())

            // Note: 'sector' might need mapping from industry.courses or industrySectorCapacity
            const matchesSector =
                filterSector === 'all' ||
                industry.courses?.some(c => c.name === filterSector) ||
                (industry.industrySectorCapacity as any)?.some(
                    (s: any) => s.sector === filterSector
                )

            const matchesStatus =
                filterStatus === 'all' || (industry.user?.status as string) === filterStatus

            return matchesSearch && matchesSector && matchesStatus
        })
    }

    const filteredData = filterIndustries(data)

    return (
        <div className="space-y-4">
            {modal}
            <IndustryFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterSector={filterSector}
                onSectorChange={(option: any) =>
                    setFilterSector(option?.value || 'all')
                }
                filterStatus={filterStatus}
                onStatusChange={(option: any) =>
                    setFilterStatus(option?.value || 'all')
                }
            />

            <Card noPadding>
                {filteredData.length > 0 ? (
                    <Table columns={columns} data={filteredData}>
                        {({
                            table,
                            pagination,
                            pageSize,
                        }: TableChildrenProps) => (
                            <div>
                                <div>{table}</div>
                            </div>
                        )}
                    </Table>
                ) : (
                    <EmptyData
                        title="No industries found"
                        description="Try adjusting your search or filters"
                        height="50vh"
                    />
                )}
            </Card>
        </div>
    )
}
