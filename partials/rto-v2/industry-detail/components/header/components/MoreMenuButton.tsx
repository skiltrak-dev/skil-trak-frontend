import { Badge } from '@components'
import { cn } from '@utils'
import { MoreVertical, X } from 'lucide-react'
import { useState } from 'react'
import { MoreMenuDropdown } from '../dropdowns'

export function MoreMenuButton() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className="relative">
            <Badge
                onClick={() => setShowMenu(!showMenu)}
                Icon={showMenu ? X : MoreVertical}
                className={cn(
                    '!bg-white !text-[#044866] border border-[#044866]/20 cursor-pointer hover:bg-slate-50 transition-all active:scale-95',
                    showMenu && 'border-primary/40 shadow-sm'
                )}
                title="More Options"
            />

            {showMenu && <MoreMenuDropdown onClose={() => setShowMenu(false)} />}
        </div>
    )
}
