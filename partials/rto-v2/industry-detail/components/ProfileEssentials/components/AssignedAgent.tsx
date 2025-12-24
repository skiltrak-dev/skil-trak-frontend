import { useAppSelector } from '@redux/hooks'
import { User } from 'lucide-react'

export function AssignedAgent() {
    const industryAssignedAgent = useAppSelector(
        (state) => state.industry.industryDetail?.favoriteBy?.user
    )
    return (
        <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-3 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-[#1A2332] flex items-center gap-1.5 text-sm">
                    <div className="w-5 h-5 bg-[#044866]/10 rounded-lg flex items-center justify-center">
                        <User className="w-3 h-3 text-[#044866]" />
                    </div>
                    Assigned SkilTrak Agent
                </h3>
            </div>

            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-[#1A2332] text-xs font-medium">
                        {industryAssignedAgent?.name || 'N/A'}
                    </p>
                    <p className="text-[#64748B] text-[10px]">
                        {industryAssignedAgent?.email || 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )
}
