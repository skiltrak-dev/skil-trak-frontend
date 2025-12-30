import { Badge, Button } from '@components'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@components/ui'
import { Edit3, Eye, MapPin, Users } from 'lucide-react'
import React from 'react'

export const BranchLocationsModal = ({
    showBranchLocations,
    setShowBranchLocations,
}: {
    showBranchLocations: boolean
    setShowBranchLocations: (showBranchLocations: boolean) => void
}) => {
    const branchLocations = [
        {
            name: 'Head Office',
            address: '123 Tech Street, Sydney NSW 2000',
            status: 'Primary',
            students: 45,
        },
        {
            name: 'Northern Branch',
            address: '45 Innovation Ave, North Sydney NSW 2060',
            status: 'Active',
            students: 28,
        },
        {
            name: 'Western Branch',
            address: '78 Business Rd, Parramatta NSW 2150',
            status: 'Active',
            students: 32,
        },
    ]
    return (
        <div>
            {' '}
            <Dialog
                open={showBranchLocations}
                onOpenChange={setShowBranchLocations}
            >
                <DialogContent className="max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden p-0">
                    <DialogHeader className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-white font-bold">
                                    Branch Locations
                                </DialogTitle>
                                <p className="text-white/80 text-xs">
                                    Manage your business locations
                                </p>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-5">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] rounded-xl p-3 border border-[#E2E8F0]">
                                <p className="text-xs text-[#64748B] mb-1">
                                    Total Locations
                                </p>
                                <p className="font-bold text-[#1A2332]">
                                    {branchLocations.length}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] rounded-xl p-3 border border-[#10B981]/20">
                                <p className="text-xs text-[#064E3B] mb-1">
                                    Active Branches
                                </p>
                                <p className="font-bold text-[#065F46]">
                                    {
                                        branchLocations.filter(
                                            (b) => b.status === 'Active'
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-xl p-3 border border-[#F7A619]/20">
                                <p className="text-xs text-[#92400E] mb-1">
                                    Total Students
                                </p>
                                <p className="font-bold text-[#B45309]">
                                    {branchLocations.reduce(
                                        (sum, b) => sum + b.students,
                                        0
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Branch List */}
                        <div className="space-y-3">
                            {branchLocations.map((branch, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-[#F8FAFB] to-white rounded-xl p-4 border border-[#E2E8F0] hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-xl flex items-center justify-center shadow-md">
                                                <MapPin className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-[#1A2332]">
                                                        {branch.name}
                                                    </h3>
                                                    <Badge
                                                        className={`text-xs px-2 py-0.5 rounded-full font-medium h-auto ${
                                                            branch.status ===
                                                            'Primary'
                                                                ? 'bg-gradient-to-r from-[#044866] to-[#0D5468] text-white shadow-sm'
                                                                : 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-sm'
                                                        }`}
                                                    >
                                                        {branch.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-[#64748B] mb-2">
                                                    {branch.address}
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-6 h-6 bg-[#E8F4F8] rounded-lg flex items-center justify-center">
                                                            <Users className="w-3.5 h-3.5 text-[#044866]" />
                                                        </div>
                                                        <span className="text-xs text-[#044866] font-medium">
                                                            {branch.students}{' '}
                                                            students
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex items-center gap-2 pt-3 border-t border-[#E2E8F0]">
                                        <Button
                                            variant="secondary"
                                            className="flex-1 px-3 py-2 bg-white hover:bg-[#E8F4F8] border border-[#E2E8F0] text-[#044866] rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 h-auto"
                                        >
                                            <Eye className="w-3 h-3" />
                                            View Details
                                        </Button>
                                        <Button className="flex-1 px-3 py-2 bg-gradient-to-br from-[#044866] to-[#0D5468] hover:shadow-lg text-white rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 h-auto">
                                            <Edit3 className="w-3 h-3" />
                                            Edit Location
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add New Branch Button */}
                        <Button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 h-auto">
                            <MapPin className="w-4 h-4" />
                            Add New Branch Location
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
