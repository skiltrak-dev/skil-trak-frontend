import { Typography } from "@components"
import { Lock } from "lucide-react"

export const LockedIndustryCard = ({ remainingToUnlock }: { remainingToUnlock: number }) => {
    return (
        <div className="flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl shadow-sm p-8 w-full min-h-[100px]">
            <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Lock className="text-gray-500" size={24} />
                </div>
                <div>
                    <Typography variant="muted" color="text-gray-600" className="font-semibold">
                        Locked Industry
                    </Typography>
                    <Typography variant="muted" color="text-gray-500" className="text-xs mt-1">
                        Contact {remainingToUnlock} more {remainingToUnlock === 1 ? 'industry' : 'industries'} to unlock
                    </Typography>
                </div>
            </div>
        </div>
    )
}