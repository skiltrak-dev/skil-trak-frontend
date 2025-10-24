import React from 'react'

export const TableHeader = () => {
    return (
        <div className="bg-[#f0f2f5] rounded-lg p-3 mb-3">
            <div className="grid grid-cols-12 gap-3 text-xs text-[#8c8c8c]">
                <div className="col-span-1"></div>
                <div className="col-span-3">RTO / SERVICE</div>
                <div className="col-span-2">STATUS</div>
                <div className="col-span-3">REQUIREMENTS</div>
                <div className="col-span-2">CONTACT</div>
                <div className="col-span-1 text-right">INFO</div>
            </div>
        </div>
    )
}
