import { Phone, CheckCircle, Clock } from 'lucide-react'
import { Call, CallStatus } from './call'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useState } from 'react'
import { AllCallList } from '../call-management-tabs'
import { CallDetailModal, TicketModal } from '../modal'

interface DashboardStatsProps {
    calls: Call[]
}

export function DashboardStats({ calls }: DashboardStatsProps) {
    const totalCalls = calls.length
    const completedCalls = calls.filter((c) => c.status === 'completed').length
    const openCalls = calls.filter((c) => c.status === 'open').length
    const [selectedCall, setSelectedCall] = useState<Call | null>(null)
    const [ticketModalCall, setTicketModalCall] = useState<Call | null>(null)

    const handleCreateTicket = (callId: string) => {
        const call = calls.find((c) => c.id === callId)
        if (call) {
            setTicketModalCall(call)
        }
    }
    const stats = [
        {
            label: 'Total Calls',
            value: totalCalls,
            icon: Phone,
            color: 'bg-[#044866]',
            lightColor: 'bg-[#E6F2F7]',
            textColor: 'text-[#044866]',
            valueKey: 'all',
        },
        {
            label: 'Completed Placements',
            value: completedCalls,
            icon: CheckCircle,
            color: 'bg-[#0D5468]',
            lightColor: 'bg-[#E8F4F6]',
            textColor: 'text-[#0D5468]',
            valueKey: 'completed',
        },
        {
            label: 'Open States',
            value: openCalls,
            icon: Clock,
            color: 'bg-[#044866]',
            lightColor: 'bg-[#E6F2F7]',
            textColor: 'text-[#044866]',
            valueKey: 'open',
        },
    ] as const

    return (
        <>
            <Tabs defaultValue="all" className="mb-5">
                <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-transparent p-0 h-32 w-full">
                    {stats.map((stat) => {
                        const Icon = stat.icon

                        return (
                            <TabsTrigger
                                key={stat.valueKey}
                                value={stat.valueKey}
                                className={`
                                group relative rounded-xl border-2 p-4 text-left transition-all 
                                data-[state=active]:shadow-lg
                                data-[state=active]:scale-[1.02]
                                data-[state=active]:border-transparent
                                data-[state=active]:${stat.color}
                                bg-white border-gray-200 hover:border-gray-300 hover:shadow-md
                            `}
                            >
                                <div className="relative z-10 w-full ">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-600 data-[state=active]:text-white/80">
                                            {stat.label}
                                        </span>

                                        <div
                                            className={`
                                            p-1.5 rounded-lg
                                            data-[state=active]:bg-white/20
                                            ${stat.lightColor}
                                        `}
                                        >
                                            <Icon
                                                className={`
                                                w-4 h-4
                                                ${stat.textColor}
                                                data-[state=active]:text-white
                                            `}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-3xl text-gray-900 data-[state=active]:text-white">
                                        {stat.value}
                                    </div>
                                </div>

                                {/* Active indicator */}
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/40 hidden data-[state=active]:block" />
                            </TabsTrigger>
                        )
                    })}
                </TabsList>

                {/* 
              Render these wherever you want:
              */}
                <TabsContent value="all">
                    <AllCallList
                        setSelectedCall={setSelectedCall}
                        handleCreateTicket={handleCreateTicket}
                    />
                </TabsContent>
                <TabsContent value="completed">Completed List</TabsContent>
                <TabsContent value="open">Open States</TabsContent>
            </Tabs>

            {selectedCall && (
                <CallDetailModal
                    call={selectedCall}
                    onClose={() => setSelectedCall(null)}
                />
            )}

            {/* Ticket Creation Modal */}
            {ticketModalCall && (
                <TicketModal
                    call={ticketModalCall}
                    onClose={() => setTicketModalCall(null)}
                />
            )}
        </>
    )
}
