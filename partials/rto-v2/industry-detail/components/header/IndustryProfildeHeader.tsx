import {
    ActionButtons,
    CompanyInfo,
    StatusBanner,
    StatusControls,
} from './components'

export function IndustryProfildeHeader() {
    const profileCompletion = 85
    const isPlacementReady = profileCompletion >= 90

    return (
        <div className="relative">
            {/* Clean Card Design */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Premium Status Banner */}
                <StatusBanner
                    isPlacementReady={isPlacementReady}
                    profileCompletion={profileCompletion}
                />

                {/* Main Header Content */}
                <div className="px-4 py-2.5">
                    <div className="flex items-start justify-between gap-4">
                        {/* Left: Company Info */}
                        <CompanyInfo />

                        {/* Right: Action Buttons */}
                        <ActionButtons />
                    </div>
                </div>

                {/* Industry Status Buttons - Enhanced Design */}
                <StatusControls />
            </div>
        </div>
    )
}
