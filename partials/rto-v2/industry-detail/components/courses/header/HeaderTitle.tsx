import { BookOpen } from 'lucide-react'

export function HeaderTitle() {
    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-lg flex items-center justify-center shadow-md">
                <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
                <h2 className="text-sm font-bold text-[#1A2332] mb-0.5">
                    Courses & Programs
                </h2>
                <p className="text-[9px] text-[#64748B]">
                    Manage course offerings and capacity across all sectors
                </p>
            </div>
        </div>
    )
}
