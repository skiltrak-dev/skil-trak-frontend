import { Building2 } from 'lucide-react'

export function CompanyAvatar() {
    return (
        <div className="relative group/avatar">
            <div className="w-8 h-8 bg-gradient-to-br from-[#044866] via-[#0D5468] to-[#044866] rounded-lg flex items-center justify-center shadow-2xl transform group-hover/avatar:scale-110 group-hover/avatar:rotate-3 transition-all duration-300">
                <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10B981] rounded-full border border-white flex items-center justify-center">
                <svg
                    className="w-1.5 h-1.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    )
}
