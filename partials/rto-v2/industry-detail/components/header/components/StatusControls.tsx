import { IndustryHiring } from './IndustryHiring'
import { IndustryPartner } from './IndustryPartner'
import { SnoozedIndustry } from './SnoozedIndustry'

export function StatusControls() {
    return (
        <div className="relative rounded-b-xl px-3 py-2.5 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center gap-2">
                {/* Hiring with ON/OFF Toggle */}
                <IndustryHiring />

                {/* Partner with ON/OFF Toggle */}
                <IndustryPartner />

                {/* Snoozed Button */}
                <SnoozedIndustry />
            </div>
        </div>
    )
}
