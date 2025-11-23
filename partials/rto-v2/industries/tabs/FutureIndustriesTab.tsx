import { EmptyData } from '@components'

export const FutureIndustriesTab = () => {
    return (
        <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-1">
                    Future Industries
                </h3>
                <p className="text-sm text-purple-700">
                    Track potential industry partners and manage your outreach
                    efforts.
                </p>
            </div>

            <EmptyData
                title="Future Industries"
                description="This section is under development"
                height="50vh"
            />
        </div>
    )
}

