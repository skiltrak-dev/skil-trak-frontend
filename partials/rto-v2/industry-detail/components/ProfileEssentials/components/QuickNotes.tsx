import { Button } from '@components'
import { FileText, Plus } from 'lucide-react'

export function QuickNotes() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all">
            <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-2.5 flex items-center justify-between">
                <h3 className="text-white flex items-center gap-1.5 text-xs font-medium">
                    <FileText className="w-3 h-3" />
                    Quick Notes
                </h3>
                <div className="flex items-center gap-1 bg-white/20 px-1.5 py-0.5 rounded-full">
                    <span className="text-[9px] text-white font-medium">
                        3 Notes
                    </span>
                </div>
            </div>

            <div className="p-2.5">
                <Button
                    variant="primaryNew"
                    className="w-full bg-gradient-to-br from-[#044866] to-[#0D5468] hover:shadow-lg text-white text-xs font-medium h-auto py-2"
                >
                    <Plus className="w-3.5 h-3.5 mr-2" />
                    Add New Note
                </Button>
            </div>
        </div>
    )
}
