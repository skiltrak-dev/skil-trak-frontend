import { Key, Send, Eye, MapPin, Users, Award, Image } from 'lucide-react'

interface MoreMenuDropdownProps {
    onClose: () => void
}

export function MoreMenuDropdown({ onClose }: MoreMenuDropdownProps) {
    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-2xl border border-[#E2E8F0] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-[#E2E8F0]">
                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wide">
                        Security
                    </p>
                </div>
                <button className="w-full px-3 py-2 text-left hover:bg-[#F8FAFB] flex items-center gap-2.5 text-[#1A2332] transition-all group">
                    <div className="w-7 h-7 bg-[#044866]/10 rounded-lg flex items-center justify-center group-hover:bg-[#044866]/20 transition-colors">
                        <Key className="w-3.5 h-3.5 text-[#044866]" />
                    </div>
                    <span className="text-xs font-medium">Edit Password</span>
                </button>
                <button className="w-full px-3 py-2 text-left hover:bg-[#F8FAFB] flex items-center gap-2.5 text-[#1A2332] transition-all group">
                    <div className="w-7 h-7 bg-[#044866]/10 rounded-lg flex items-center justify-center group-hover:bg-[#044866]/20 transition-colors">
                        <Send className="w-3.5 h-3.5 text-[#044866]" />
                    </div>
                    <span className="text-xs font-medium">Send Password</span>
                </button>
                <button className="w-full px-3 py-2 text-left hover:bg-[#F8FAFB] flex items-center gap-2.5 text-[#1A2332] transition-all group">
                    <div className="w-7 h-7 bg-[#044866]/10 rounded-lg flex items-center justify-center group-hover:bg-[#044866]/20 transition-colors">
                        <Eye className="w-3.5 h-3.5 text-[#044866]" />
                    </div>
                    <span className="text-xs font-medium">View Password</span>
                </button>

                <div className="px-3 py-2 border-b border-t border-[#E2E8F0] mt-1">
                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wide">
                        Management
                    </p>
                </div>
                <button className="w-full px-3 py-2 text-left hover:bg-[#F8FAFB] flex items-center gap-2.5 text-[#1A2332] transition-all group">
                    <div className="w-7 h-7 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
                        <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    </div>
                    <span className="text-xs font-medium">
                        Placement Status
                    </span>
                </button>
                <button className="w-full px-3 py-2 text-left hover:bg-[#F8FAFB] flex items-center gap-2.5 text-[#1A2332] transition-all group">
                    <div className="w-7 h-7 bg-[#14B8A6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#14B8A6]/20 transition-colors">
                        <Users className="w-3.5 h-3.5 text-[#14B8A6]" />
                    </div>
                    <span className="text-xs font-medium">View Visitors</span>
                </button>
                <button className="w-full px-3 py-2 text-left hover:bg-[#F8FAFB] flex items-center gap-2.5 text-[#1A2332] transition-all group">
                    <div className="w-7 h-7 bg-[#F7A619]/10 rounded-lg flex items-center justify-center group-hover:bg-[#F7A619]/20 transition-colors">
                        <Award className="w-3.5 h-3.5 text-[#F7A619]" />
                    </div>
                    <span className="text-xs font-medium">Add RPL</span>
                </button>
                <button className="w-full px-3 py-2 text-left hover:bg-[#F8FAFB] flex items-center gap-2.5 text-[#1A2332] transition-all group rounded-b-lg">
                    <div className="w-7 h-7 bg-[#EC4899]/10 rounded-lg flex items-center justify-center group-hover:bg-[#EC4899]/20 transition-colors">
                        <Image className="w-3.5 h-3.5 text-[#EC4899]" />
                    </div>
                    <span className="text-xs font-medium">
                        Industry Gallery
                    </span>
                </button>
            </div>
        </>
    )
}
