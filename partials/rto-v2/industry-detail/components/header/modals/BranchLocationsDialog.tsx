import { MapPin, Users, Edit3, Trash2, ArrowLeft, Loader2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@components/ui/dialog'
import { Button, NoData } from '@components'
import { Badge } from '@components'
import { ScrollArea } from '@components/ui/scroll-area'
import { useState } from 'react'
import { BranchForm } from './components'
import { CommonApi } from '@queries'
import { useAppSelector } from '@redux/hooks'
import { DeleteBranchModal } from './DeleteBranchModal'
import { PulseLoader } from 'react-spinners'

interface BranchLocationsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

type ViewMode = 'list' | 'add' | 'edit'

interface StatCard {
    label: string
    bgGradient: string
    borderColor: string
    labelColor: string
    valueColor: string
    count: number
    loading: boolean
}

export function BranchLocationsDialog({
    open,
    onOpenChange,
}: BranchLocationsDialogProps) {
    const [view, setView] = useState<ViewMode>('list')
    const [selectedBranch, setSelectedBranch] = useState<any>(null)
    const [branchToDelete, setBranchToDelete] = useState<number | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const industryId = useAppSelector(
        (state) => state.industry.industryDetail?.id
    )

    // Api Queries
    const { data: branchLocationsDict, isLoading: isListLoading } =
        CommonApi.Industries.useList(
            { id: industryId },
            { skip: !open || !industryId }
        )

    const counts = CommonApi.Industries.useBranchesCounts(industryId!, {
        skip: !open || !industryId,
    })

    const branchLocations = branchLocationsDict?.data || []

    const handleDeleteClick = (id: number) => {
        setBranchToDelete(id)
        setShowDeleteModal(true)
    }

    const startEdit = (branch: any) => {
        setSelectedBranch(branch)
        setView('edit')
    }

    const onFormSuccess = () => {
        setView('list')
        setSelectedBranch(null)
    }

    const statsCards: StatCard[] = [
        {
            label: 'Total Locations',
            bgGradient: 'from-[#F8FAFB] to-[#E8F4F8]',
            borderColor: 'border-[#E2E8F0]',
            labelColor: 'text-[#64748B]',
            valueColor: 'text-[#1A2332]',
            count: counts?.data?.totalBranches || 0,
            loading: counts?.isLoading,
        },
        {
            label: 'Active Branches',
            bgGradient: 'from-[#D1FAE5] to-[#A7F3D0]',
            borderColor: 'border-[#10B981]/20',
            labelColor: 'text-[#064E3B]',
            valueColor: 'text-[#065F46]',
            count: counts?.data?.totalBranches || 0,
            loading: counts?.isLoading,
        },
        {
            label: 'Total Students',
            bgGradient: 'from-[#FEF3C7] to-[#FDE68A]',
            borderColor: 'border-[#F7A619]/20',
            labelColor: 'text-[#92400E]',
            valueColor: 'text-[#B45309]',
            count: counts?.data?.totalEnrolledStudents || 0,
            loading: counts?.isLoading,
        },
    ]

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden p-0 [&>button]:text-white">
                <DialogHeader className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-4">
                    <div className="flex items-center gap-3">
                        {view !== 'list' && (
                            <Button
                                onClick={() => setView('list')}
                                className="p-1 px-2 h-auto text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg mr-1"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        )}
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-white font-bold">
                                {view === 'list'
                                    ? 'Branch Locations'
                                    : view === 'add'
                                    ? 'Add New Branch'
                                    : 'Edit Branch'}
                            </DialogTitle>
                            <DialogDescription className="text-white/80 text-xs">
                                {view === 'list'
                                    ? 'Manage your business locations'
                                    : view === 'add'
                                    ? 'Enter details for the new location'
                                    : 'Update location details'}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <ScrollArea className="h-[70vh]">
                    <div className="p-5">
                        {isListLoading ? (
                            <div className="flex items-center justify-center h-40">
                                <Loader2 className="w-8 h-8 text-[#044866] animate-spin" />
                            </div>
                        ) : view === 'list' ? (
                            <>
                                {/* Summary Stats */}
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {statsCards.map((card, index) => (
                                        <div
                                            key={index}
                                            className={`bg-gradient-to-br ${card.bgGradient} rounded-xl p-3 border ${card.borderColor}`}
                                        >
                                            <p
                                                className={`text-xs ${card.labelColor} mb-1`}
                                            >
                                                {card.label}
                                            </p>
                                            <p
                                                className={`font-bold ${card.valueColor}`}
                                            >
                                                {card?.loading ? (
                                                    <PulseLoader
                                                        size={4}
                                                        color="#044866"
                                                    />
                                                ) : (
                                                    card?.count || 0
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Branch List */}
                                <div className="space-y-3">
                                    {branchLocations.length === 0 ? (
                                        <NoData
                                            simple
                                            text="No branch locations added yet."
                                        />
                                    ) : null}
                                    {branchLocations.map(
                                        (branch: any, index: number) => (
                                            <div
                                                key={index}
                                                className="bg-gradient-to-br from-[#F8FAFB] to-white rounded-xl p-4 border border-[#E2E8F0] hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-start gap-3 w-full">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                                            <MapPin className="w-6 h-6 text-white" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                                <h3 className="font-bold text-[#1A2332] truncate">
                                                                    {branch.contactPerson ||
                                                                        branch.name ||
                                                                        'Branch'}
                                                                </h3>
                                                                <Badge
                                                                    className={`text-xs px-2 py-0.5 rounded-full font-medium h-auto ${
                                                                        branch.status ===
                                                                        'Primary'
                                                                            ? 'bg-gradient-to-r from-[#044866] to-[#0D5468] text-white shadow-sm'
                                                                            : 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-sm'
                                                                    }`}
                                                                >
                                                                    {branch.status ||
                                                                        'Active'}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-xs text-[#64748B] mb-2 truncate">
                                                                {branch.address}
                                                                ,{' '}
                                                                {branch.suburb}
                                                            </p>
                                                            <div className="flex items-center gap-4 flex-wrap">
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className="w-6 h-6 bg-[#E8F4F8] rounded-lg flex items-center justify-center">
                                                                        <Users className="w-3.5 h-3.5 text-[#044866]" />
                                                                    </div>
                                                                    <span className="text-xs text-[#044866] font-medium">
                                                                        {branch.enrolledStudents ||
                                                                            0}{' '}
                                                                        /{' '}
                                                                        {branch.studentCapacity ||
                                                                            0}{' '}
                                                                        students
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Quick Actions */}
                                                <div className="flex items-center gap-2 pt-3 border-t border-[#E2E8F0]">
                                                    {/* <Button
                                                    variant="action"
                                                    className="flex-1 px-3 py-2 bg-white hover:bg-[#E8F4F8] border border-[#E2E8F0] text-[#044866] rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 h-auto"
                                                >
                                                    <Eye className="w-3 h-3" />
                                                    View
                                                </Button> */}
                                                    <Button
                                                        onClick={() =>
                                                            startEdit(branch)
                                                        }
                                                        className="flex-1 px-3 py-2 bg-gradient-to-br from-[#044866] to-[#0D5468] hover:shadow-lg text-white rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 h-auto"
                                                    >
                                                        <Edit3 className="w-3 h-3" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                branch.id
                                                            )
                                                        }
                                                        variant="error"
                                                        className="flex-1"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Add New Branch Button */}
                                <Button
                                    onClick={() => setView('add')}
                                    className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 h-auto"
                                >
                                    <MapPin className="w-4 h-4" />
                                    Add New Branch Location
                                </Button>
                            </>
                        ) : view === 'add' ? (
                            <BranchForm
                                onSuccess={onFormSuccess}
                                industryId={industryId}
                                onCancel={() => setView('list')}
                            />
                        ) : (
                            <BranchForm
                                isEdit
                                industryId={industryId}
                                defaultValues={selectedBranch}
                                onSuccess={onFormSuccess}
                                onCancel={() => {
                                    setView('list')
                                    setSelectedBranch(null)
                                }}
                            />
                        )}
                    </div>
                </ScrollArea>
                <DeleteBranchModal
                    open={showDeleteModal}
                    branchId={branchToDelete}
                    onClose={() => setShowDeleteModal(false)}
                />
            </DialogContent>
        </Dialog>
    )
}
