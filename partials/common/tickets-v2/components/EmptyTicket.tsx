import { Archive, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'

export const EmptyTicket = () => {
    const router = useRouter()
    const tabName = router.query.tab
    return (
        <div className="flex justify-center flex-col items-center">
            {tabName === 'active' ? (
                <>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-[#044866] text-lg mb-1">All Clear!</h3>
                    <p className="text-[#0D5468]/70 text-sm">
                        No active tickets in this queue.
                    </p>
                </>
            ) : (
                <>
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Archive className="w-6 h-6 text-gray-500" />
                    </div>
                    <h3 className="text-[#044866] text-lg mb-1">
                        No Resolved Tickets
                    </h3>
                    <p className="text-[#0D5468]/70 text-sm">
                        No resolved tickets found.
                    </p>
                </>
            )}
        </div>
    )
}
