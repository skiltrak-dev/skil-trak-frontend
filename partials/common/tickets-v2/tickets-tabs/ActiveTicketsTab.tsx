import React, { useState } from 'react'
import { StatsCard } from '../components'
import { AlertCircle, AlertTriangle, Clock, TrendingUp } from 'lucide-react'
import { CommonApi } from '@queries'

export const ActiveTicketsTab = () => {
   

    return (
        <>
            {/* Stats */}
            <div
                className="mb-4 animate-slide-up"
                style={{ animationDelay: '0.15s' }}
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <StatsCard
                        icon={<AlertTriangle className="w-4 h-4" />}
                        label="Overdue (8h+)"
                        value={11}
                        color="red"
                        gradient="from-red-500 to-red-600"
                    />
                    <StatsCard
                        icon={<AlertCircle className="w-4 h-4" />}
                        label="Open Tickets"
                        value={5}
                        color="orange"
                        gradient="from-[#F7A619] to-[#f59e0b]"
                    />
                    <StatsCard
                        icon={<Clock className="w-4 h-4" />}
                        label="In Progress"
                        value={10}
                        color="teal"
                        gradient="from-[#0D5468] to-[#0891b2]"
                    />
                    <StatsCard
                        icon={<TrendingUp className="w-4 h-4" />}
                        label="Critical Priority"
                        value={5}
                        color="dark"
                        gradient="from-[#044866] to-[#0D5468]"
                    />
                </div>
            </div>
        </>
    )
}
