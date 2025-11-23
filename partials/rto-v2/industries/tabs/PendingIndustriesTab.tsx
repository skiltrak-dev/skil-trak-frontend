import { Card, EmptyData, Table, TableChildrenProps } from '@components'
import { createPendingIndustriesColumns } from '../component/columns'
import { PendingIndustryFull } from '../types'

interface PendingIndustriesTabProps {
    data: PendingIndustryFull[]
    onView: (industry: PendingIndustryFull) => void
    onApproveCourses: (industry: PendingIndustryFull) => void
}

export const PendingIndustriesTab = ({
    data,
    onView,
    onApproveCourses,
}: PendingIndustriesTabProps) => {
    const columns = createPendingIndustriesColumns({
        onView,
        onApproveCourses,
    })

    return (
        <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-1">
                    Pending Approval
                </h3>
                <p className="text-sm text-blue-700">
                    These industries are awaiting course approval and final
                    verification before they can accept student placements.
                </p>
            </div>

            <Card noPadding>
                {data.length > 0 ? (
                    <Table columns={columns} data={data}>
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
                        title="No pending industries"
                        description="All industries are either approved or in other status"
                        height="50vh"
                    />
                )}
            </Card>
        </div>
    )
}

