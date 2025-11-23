import { useState } from 'react'
import { Card, EmptyData, Table, TableChildrenProps } from '@components'
import { IndustryKPIStats, IndustryFilterBar } from '../component'
import { createYourIndustriesColumns } from '../component/columns'
import { Industry } from '../types'

interface YourIndustriesTabProps {
    data: Industry[]
    getTotalCapacity: (industry: Industry) => number
    getTotalPlacements: (industry: Industry) => number
    getAvailablePositions: (industry: Industry) => number
    onView: (industry: Industry) => void
    onEdit: (industry: Industry) => void
    onDelete: (industry: Industry) => void
}

export const YourIndustriesTab = ({
    data,
    getTotalCapacity,
    getTotalPlacements,
    getAvailablePositions,
    onView,
    onEdit,
    onDelete,
}: YourIndustriesTabProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterSector, setFilterSector] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')

    const filterIndustries = (industries: Industry[]) => {
        return industries.filter((industry) => {
            const matchesSearch =
                industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                industry.location
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                industry.abn.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesSector =
                filterSector === 'all' || industry.sector === filterSector
            const matchesStatus =
                filterStatus === 'all' || industry.status === filterStatus

            return matchesSearch && matchesSector && matchesStatus
        })
    }

    const calculateStats = (industries: Industry[]) => {
        const totalIndustries = industries.length
        const verifiedIndustries = industries.filter(
            (i) => i.status === 'verified'
        ).length
        const pendingIndustries = industries.filter(
            (i) => i.status === 'pending'
        ).length
        const totalCapacity = industries.reduce(
            (sum, i) => sum + getTotalCapacity(i),
            0
        )
        const totalPlacements = industries.reduce(
            (sum, i) => sum + getTotalPlacements(i),
            0
        )
        const totalAvailablePositions = industries.reduce(
            (sum, i) => sum + getAvailablePositions(i),
            0
        )
        const averageComplianceScore =
            totalIndustries > 0
                ? Math.round(
                      industries.reduce((sum, i) => sum + i.complianceScore, 0) /
                          totalIndustries
                  )
                : 0
        const averageRating =
            totalIndustries > 0
                ? (
                      industries.reduce((sum, i) => sum + i.rating, 0) /
                      totalIndustries
                  ).toFixed(1)
                : '0.0'

        return {
            totalIndustries,
            verifiedIndustries,
            pendingIndustries,
            totalCapacity,
            totalPlacements,
            totalAvailablePositions,
            averageComplianceScore,
            averageRating,
        }
    }

    const filteredData = filterIndustries(data)
    const stats = calculateStats(data)

    const columns = createYourIndustriesColumns({
        getTotalCapacity,
        getTotalPlacements,
        getAvailablePositions,
        onView,
        onEdit,
        onDelete,
    })

    return (
        <div className="space-y-4">
            <IndustryKPIStats {...stats} />

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

