import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs'
import { CallStatus } from './components/call'
import { StatusBadge } from './components'

interface StatusTabsProps {
    activeStatus: CallStatus | 'all'
    onStatusChange: (status: CallStatus | 'all') => void
    callCounts: Record<CallStatus | 'all', number>
}

export function CallStatusTabs({
    activeStatus,
    onStatusChange,
    callCounts,
}: StatusTabsProps) {
    const allStatuses: (CallStatus | 'all')[] = ['all', 'pending', 'completed']

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-5 overflow-hidden">
            <Tabs
                value={activeStatus}
                onValueChange={(value: any) =>
                    onStatusChange(value as CallStatus | 'all')
                }
            >
                <TabsList className="flex w-full overflow-x-auto scrollbar-hide bg-transparent p-0 h-auto">
                    {allStatuses.map((status) => {
                        const isActive = activeStatus === status
                        const count = callCounts[status] || 0

                        return (
                            <TabsTrigger
                                key={status}
                                value={status}
                                className={`
                  relative flex-1 min-w-[140px] px-5 py-3 rounded-none
                  border-b-3 transition-all
                  data-[state=active]:shadow-none
                  ${
                      isActive
                          ? 'border-[#044866] bg-gradient-to-b from-blue-50 to-transparent'
                          : 'border-transparent hover:bg-gray-50 hover:border-gray-300'
                  }
                `}
                            >
                                <div className="flex flex-col items-center gap-1.5">
                                    {status === 'all' ? (
                                        <>
                                            <span
                                                className={`text-xs font-medium transition-colors ${
                                                    isActive
                                                        ? 'text-[#044866]'
                                                        : 'text-gray-700 group-hover:text-gray-900'
                                                }`}
                                            >
                                                All Calls
                                            </span>
                                            <div
                                                className={`text-2xl transition-colors ${
                                                    isActive
                                                        ? 'text-[#044866]'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                {count}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <StatusBadge
                                                status={status}
                                                size="sm"
                                            />
                                            <div
                                                className={`text-2xl transition-colors ${
                                                    isActive
                                                        ? 'text-[#044866]'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                {count}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Active indicator line */}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#044866] shadow-sm" />
                                )}
                            </TabsTrigger>
                        )
                    })}
                </TabsList>
            </Tabs>
        </div>
    )
}
