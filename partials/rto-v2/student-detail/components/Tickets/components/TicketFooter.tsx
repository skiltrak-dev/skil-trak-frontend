import { Button } from '@components'
import { Plus } from '@icons'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'

export const TicketFooter = ({ studentId }: { studentId: number }) => {
    const router = useRouter()

    const onAddTicket = () => {
        router.push(
            `/portals/rto/students-and-placements/tickets/add-ticket?student=${studentId}`
        )
    }
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#044866]/5 via-[#0D5468]/5 to-transparent rounded-2xl border border-[#044866]/20 p-8 shadow-lg">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#044866]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative">
                <h4 className="text-slate-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#F7A619]" />
                    Need Help?
                </h4>
                <p className="text-slate-600 mb-6 leading-relaxed">
                    Create a new support ticket and our team will get back to
                    you as soon as possible. For urgent matters, please contact
                    your coordinator directly.
                </p>
                <Button
                    onClick={onAddTicket}
                    className="bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Ticket
                </Button>
            </div>
        </div>
    )
}
