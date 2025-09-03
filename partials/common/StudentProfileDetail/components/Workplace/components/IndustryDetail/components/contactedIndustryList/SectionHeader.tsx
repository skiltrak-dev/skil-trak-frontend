export const SectionHeader = ({
    title,
    icon,
    count,
}: {
    title: string
    icon: React.ReactNode
    count: number
}) => (
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
            <div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">
                    {count} {count === 1 ? 'industry' : 'industries'} contacted
                </p>
            </div>
        </div>
        <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full">
            {count}
        </div>
    </div>
)
