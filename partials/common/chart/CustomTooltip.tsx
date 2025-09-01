const ListData = ({ title, data }: { title: string; data: any }) => {
    return (
        <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2 text-sm border-b border-gray-200 pb-1">
                {title}
            </h4>
            {data?.map((entry: any, index: number) => (
                <p key={index} className="text-sm mb-1">
                    <span style={{ color: entry.color }}>●</span>
                    <span
                        style={{ color: entry.color }}
                        className="ml-2"
                    >{`${entry.dataKey}: ${entry.value}`}</span>
                </p>
            ))}
        </div>
    )
}

const filterData = (data: string[], payload: any) =>
    payload.filter((item: any) => data.includes(item.dataKey))

export const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        // Separate workplace and student data
        const workplaceData = filterData(
            [
                'ALL WPR',
                'Current Month WPR',
                'Manual WPO',
                'Automated WPO',
                'Cancelled Workplace Requests',
            ],
            payload
        )

        const studentData = filterData(['Added', 'Placed', 'Expired'], payload)

        return (
            <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg min-w-[250px]">
                <p className="font-semibold text-gray-800 mb-3">{`${label}`}</p>

                {/* Workplace Section */}
                {workplaceData.length > 0 && (
                    <ListData data={workplaceData} title="Workplace" />
                )}

                {/* Student Section */}
                {studentData.length > 0 && (
                    <ListData data={studentData} title="Students" />
                )}
            </div>
        )
    }
    return null
}
