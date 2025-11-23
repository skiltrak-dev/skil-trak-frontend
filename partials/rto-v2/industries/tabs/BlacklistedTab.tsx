import { Card, EmptyData, Table, TableChildrenProps } from '@components'
import { createBlacklistedColumns } from '../component/columns'
import { BlacklistedIndustry } from '../types'

interface BlacklistedTabProps {
    data: BlacklistedIndustry[]
    onView: (industry: BlacklistedIndustry) => void
    onUnblock: (industry: BlacklistedIndustry) => void
}

export const BlacklistedTab = ({
    data,
    onView,
    onUnblock,
}: BlacklistedTabProps) => {
    const columns = createBlacklistedColumns({
        onView,
        onUnblock,
    })

    return (
        <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-1">
                    Blacklisted Industries
                </h3>
                <p className="text-sm text-red-700">
                    These industries have been blocked or rejected due to
                    compliance issues or other concerns. Review carefully before
                    unblocking.
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
                        title="No blacklisted industries"
                        description="No industries are currently blocked or rejected"
                        height="50vh"
                    />
                )}
            </Card>
        </div>
    )
}
