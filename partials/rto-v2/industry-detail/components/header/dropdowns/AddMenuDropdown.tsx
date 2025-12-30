import { Users, UserCircle, FileText } from 'lucide-react'

interface AddMenuDropdownProps {
    onClose: () => void
}

export function AddMenuDropdown({ onClose }: AddMenuDropdownProps) {
    const handleNavigation = (tab: string) => {
        window.dispatchEvent(new CustomEvent('changeTab', { detail: tab }))
        onClose()
    }

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute right-[110px] top-[90px] w-52 bg-white rounded-xl shadow-2xl border border-[#E2E8F0] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-[#E2E8F0]">
                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wide">
                        Quick Add
                    </p>
                </div>
                <button
                    onClick={() => handleNavigation('students')}
                    className="w-full px-3 py-2 text-left hover:bg-[#F8FAFB] flex items-center gap-2.5 text-[#1A2332] transition-all group"
                >
                    <div className="w-7 h-7 bg-[#14B8A6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#14B8A6]/20 transition-colors">
                        <Users className="w-3.5 h-3.5 text-[#14B8A6]" />
                    </div>
                    <span className="text-xs font-medium">Add Student</span>
                </button>
                <button
                    onClick={() => handleNavigation('supervisors')}
                    className="w-full px-3 py-2 text-left hover:bg-[#F8FAFB] flex items-center gap-2.5 text-[#1A2332] transition-all group"
                >
                    <div className="w-7 h-7 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
                        <UserCircle className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    </div>
                    <span className="text-xs font-medium">Add Supervisor</span>
                </button>
                <button
                    onClick={() => handleNavigation('documents')}
                    className="w-full px-3 py-2 text-left hover:bg-[#F8FAFB] flex items-center gap-2.5 text-[#1A2332] transition-all group"
                >
                    <div className="w-7 h-7 bg-[#F7A619]/10 rounded-lg flex items-center justify-center group-hover:bg-[#F7A619]/20 transition-colors">
                        <FileText className="w-3.5 h-3.5 text-[#F7A619]" />
                    </div>
                    <span className="text-xs font-medium">Add Document</span>
                </button>
            </div>
        </>
    )
}
