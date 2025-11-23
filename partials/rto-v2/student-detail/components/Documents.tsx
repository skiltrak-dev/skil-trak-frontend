import {
    FileText,
    Download,
    Upload,
    Eye,
    Search,
    Filter,
    CheckCircle,
    Clock,
    AlertCircle,
    Folder,
    XCircle,
    Shield,
    ChevronDown,
    ChevronRight,
    FolderOpen,
    ThumbsUp,
    ThumbsDown,
} from 'lucide-react'
import { Button, Badge, GlobalModal, TextArea } from '@components'
import { useState } from 'react'

const industryCheckFolders = [
    {
        id: 1,
        name: 'Police Check',
        status: 'approved',
        lastUpdated: 'Nov 15, 2025',
        documentsCount: 2,
        documents: [
            {
                id: 1,
                name: 'National Police Check Certificate.pdf',
                type: 'PDF',
                size: '1.2 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 15, 2025',
                status: 'approved',
                verifiedBy: 'RTO Admin',
            },
            {
                id: 2,
                name: 'Police Check Application Receipt.pdf',
                type: 'PDF',
                size: '456 KB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 14, 2025',
                status: 'approved',
                verifiedBy: 'RTO Admin',
            },
        ],
    },
    {
        id: 2,
        name: 'Working with Children Check',
        status: 'approved',
        lastUpdated: 'Nov 12, 2025',
        documentsCount: 1,
        documents: [
            {
                id: 1,
                name: 'WWCC Card - Front and Back.pdf',
                type: 'PDF',
                size: '945 KB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 12, 2025',
                status: 'approved',
                verifiedBy: 'Daniel',
            },
        ],
    },
    {
        id: 3,
        name: 'First Aid Certificate',
        status: 'pending',
        lastUpdated: 'Nov 18, 2025',
        documentsCount: 2,
        documents: [
            {
                id: 1,
                name: 'First Aid Certificate - HLTAID011.pdf',
                type: 'PDF',
                size: '1.8 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 18, 2025',
                status: 'pending',
                verifiedBy: null,
            },
            {
                id: 2,
                name: 'CPR Training Certificate.pdf',
                type: 'PDF',
                size: '892 KB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 18, 2025',
                status: 'approved',
                verifiedBy: 'Daniel',
            },
        ],
    },
    {
        id: 4,
        name: 'COVID-19 Vaccination',
        status: 'approved',
        lastUpdated: 'Sep 20, 2025',
        documentsCount: 3,
        documents: [
            {
                id: 1,
                name: 'Vaccination Certificate - Dose 1.pdf',
                type: 'PDF',
                size: '356 KB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Sep 20, 2025',
                status: 'approved',
                verifiedBy: 'RTO Admin',
            },
            {
                id: 2,
                name: 'Vaccination Certificate - Dose 2.pdf',
                type: 'PDF',
                size: '367 KB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Sep 20, 2025',
                status: 'approved',
                verifiedBy: 'RTO Admin',
            },
            {
                id: 3,
                name: 'Vaccination Certificate - Booster.pdf',
                type: 'PDF',
                size: '389 KB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Sep 20, 2025',
                status: 'approved',
                verifiedBy: 'RTO Admin',
            },
        ],
    },
    {
        id: 5,
        name: 'NDIS Worker Screening',
        status: 'rejected',
        lastUpdated: 'Nov 10, 2025',
        documentsCount: 1,
        rejectionReason:
            'Document quality insufficient - please resubmit clearer scan',
        documents: [
            {
                id: 1,
                name: 'NDIS Worker Check - Scan.pdf',
                type: 'PDF',
                size: '1.1 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 10, 2025',
                status: 'rejected',
                verifiedBy: 'RTO Admin',
                rejectionReason:
                    'Document quality insufficient - please resubmit clearer scan',
            },
        ],
    },
    {
        id: 6,
        name: 'TB Test Certificate',
        status: 'uploaded',
        lastUpdated: 'Nov 20, 2025',
        documentsCount: 1,
        documents: [
            {
                id: 1,
                name: 'Tuberculosis Test Results.pdf',
                type: 'PDF',
                size: '890 KB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 20, 2025',
                status: 'uploaded',
                verifiedBy: null,
            },
        ],
    },
]

const courseDocumentFolders = [
    {
        id: 1,
        name: 'Placement Agreement',
        category: 'Workplace Records',
        status: 'approved',
        lastUpdated: 'Sep 15, 2025',
        documentsCount: 4,
        documents: [
            {
                id: 1,
                name: 'Signed Placement Agreement - Hale Foundation.pdf',
                type: 'PDF',
                size: '2.1 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Sep 15, 2025',
                status: 'approved',
            },
            {
                id: 2,
                name: 'Workplace Supervisor Agreement.pdf',
                type: 'PDF',
                size: '1.4 MB',
                uploadedBy: 'Sarah Mitchell',
                uploadDate: 'Sep 15, 2025',
                status: 'approved',
            },
            {
                id: 3,
                name: 'Student Acknowledgement Form.pdf',
                type: 'PDF',
                size: '856 KB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Sep 16, 2025',
                status: 'approved',
            },
            {
                id: 4,
                name: 'Workplace Induction Checklist.pdf',
                type: 'PDF',
                size: '1.2 MB',
                uploadedBy: 'Daniel',
                uploadDate: 'Sep 17, 2025',
                status: 'approved',
            },
        ],
    },
    {
        id: 2,
        name: 'Workplace Logs',
        category: 'Workplace Records',
        status: 'approved',
        lastUpdated: 'Nov 18, 2025',
        documentsCount: 8,
        documents: [
            {
                id: 1,
                name: 'Workplace Log - Week 8.pdf',
                type: 'PDF',
                size: '2.4 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 18, 2025',
                status: 'approved',
            },
            {
                id: 2,
                name: 'Workplace Log - Week 7.pdf',
                type: 'PDF',
                size: '2.2 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 11, 2025',
                status: 'approved',
            },
            {
                id: 3,
                name: 'Workplace Log - Week 6.pdf',
                type: 'PDF',
                size: '2.3 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 4, 2025',
                status: 'approved',
            },
            {
                id: 4,
                name: 'Workplace Log - Week 5.pdf',
                type: 'PDF',
                size: '2.1 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Oct 28, 2025',
                status: 'approved',
            },
            {
                id: 5,
                name: 'Workplace Log - Week 4.pdf',
                type: 'PDF',
                size: '2.0 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Oct 21, 2025',
                status: 'approved',
            },
            {
                id: 6,
                name: 'Workplace Log - Week 3.pdf',
                type: 'PDF',
                size: '1.9 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Oct 14, 2025',
                status: 'approved',
            },
            {
                id: 7,
                name: 'Workplace Log - Week 2.pdf',
                type: 'PDF',
                size: '1.8 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Oct 7, 2025',
                status: 'approved',
            },
            {
                id: 8,
                name: 'Workplace Log - Week 1.pdf',
                type: 'PDF',
                size: '1.7 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Sep 30, 2025',
                status: 'approved',
            },
        ],
    },
    {
        id: 3,
        name: 'Reflection Journals',
        category: 'Assessment',
        status: 'pending',
        lastUpdated: 'Nov 14, 2025',
        documentsCount: 3,
        documents: [
            {
                id: 1,
                name: 'Weekly Reflection - Week 8.docx',
                type: 'DOCX',
                size: '856 KB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 14, 2025',
                status: 'pending',
            },
            {
                id: 2,
                name: 'Weekly Reflection - Week 7.docx',
                type: 'DOCX',
                size: '892 KB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 7, 2025',
                status: 'approved',
            },
            {
                id: 3,
                name: 'Weekly Reflection - Week 6.docx',
                type: 'DOCX',
                size: '834 KB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Oct 31, 2025',
                status: 'approved',
            },
        ],
    },
    {
        id: 4,
        name: 'Client Care Plans',
        category: 'Workplace Records',
        status: 'approved',
        lastUpdated: 'Nov 12, 2025',
        documentsCount: 2,
        documents: [
            {
                id: 1,
                name: 'Care Plan - Mrs. Anderson.pdf',
                type: 'PDF',
                size: '3.1 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 12, 2025',
                status: 'approved',
            },
            {
                id: 2,
                name: 'Care Plan - Mr. Thompson.pdf',
                type: 'PDF',
                size: '2.8 MB',
                uploadedBy: 'Hema Maya Monger',
                uploadDate: 'Nov 5, 2025',
                status: 'approved',
            },
        ],
    },
    {
        id: 5,
        name: 'Skills Assessments',
        category: 'Assessment',
        status: 'approved',
        lastUpdated: 'Nov 10, 2025',
        documentsCount: 2,
        documents: [
            {
                id: 1,
                name: 'Skills Assessment Checklist - Module 3.pdf',
                type: 'PDF',
                size: '1.8 MB',
                uploadedBy: 'Daniel',
                uploadDate: 'Nov 10, 2025',
                status: 'approved',
            },
            {
                id: 2,
                name: 'Competency Sign-off Sheet.pdf',
                type: 'PDF',
                size: '1.2 MB',
                uploadedBy: 'Sarah Mitchell',
                uploadDate: 'Nov 8, 2025',
                status: 'approved',
            },
        ],
    },
]

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'approved':
            return (
                <Badge
                    Icon={CheckCircle}
                    text="Approved"
                    className="bg-emerald-100 text-emerald-700 border-emerald-200 flex items-center gap-1 text-xs"
                />
            )
        case 'pending':
            return (
                <Badge
                    Icon={Clock}
                    text="Pending"
                    className="bg-amber-100 text-amber-700 border-amber-200 flex items-center gap-1 text-xs"
                />
            )
        case 'rejected':
            return (
                <Badge
                    Icon={XCircle}
                    text="Rejected"
                    className="bg-red-100 text-red-700 border-red-200 flex items-center gap-1 text-xs"
                />
            )
        case 'uploaded':
            return (
                <Badge
                    Icon={Upload}
                    text="Uploaded"
                    className="bg-blue-100 text-blue-700 border-blue-200 flex items-center gap-1 text-xs"
                />
            )
        default:
            return <Badge variant="secondary" text="Unknown" />
    }
}

const getFolderIcon = (isOpen: boolean) => {
    return isOpen ? FolderOpen : Folder
}

export function Documents() {
    const [expandedIndustryFolders, setExpandedIndustryFolders] = useState<
        number[]
    >([])
    const [expandedCourseFolders, setExpandedCourseFolders] = useState<
        number[]
    >([])
    const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false)
    const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
    const [rejectionReason, setRejectionReason] = useState('')
    const [approvalComment, setApprovalComment] = useState('')
    const [selectedItem, setSelectedItem] = useState<{
        type: 'document' | 'folder'
        section: 'industry' | 'course'
        folderId: number
        documentId?: number
        name: string
    } | null>(null)

    const toggleIndustryFolder = (folderId: number) => {
        setExpandedIndustryFolders((prev) =>
            prev.includes(folderId)
                ? prev.filter((id) => id !== folderId)
                : [...prev, folderId]
        )
    }

    const toggleCourseFolder = (folderId: number) => {
        setExpandedCourseFolders((prev) =>
            prev.includes(folderId)
                ? prev.filter((id) => id !== folderId)
                : [...prev, folderId]
        )
    }

    const handleApproveClick = (
        type: 'document' | 'folder',
        section: 'industry' | 'course',
        folderId: number,
        name: string,
        documentId?: number
    ) => {
        setSelectedItem({ type, section, folderId, documentId, name })
        setApprovalDialogOpen(true)
    }

    const handleRejectClick = (
        type: 'document' | 'folder',
        section: 'industry' | 'course',
        folderId: number,
        name: string,
        documentId?: number
    ) => {
        setSelectedItem({ type, section, folderId, documentId, name })
        setRejectionDialogOpen(true)
    }

    const handleApprove = () => {
        if (selectedItem) {
            console.log('Approving:', selectedItem, 'Comment:', approvalComment)
            // In real implementation, this would update the backend
        }
        setApprovalDialogOpen(false)
        setApprovalComment('')
        setSelectedItem(null)
    }

    const handleReject = () => {
        if (selectedItem && rejectionReason.trim()) {
            console.log('Rejecting:', selectedItem, 'Reason:', rejectionReason)
            // In real implementation, this would update the backend
        }
        setRejectionDialogOpen(false)
        setRejectionReason('')
        setSelectedItem(null)
    }

    const industryStats = {
        total: industryCheckFolders.length,
        uploaded: industryCheckFolders.filter((f) => f.status === 'uploaded')
            .length,
        pending: industryCheckFolders.filter((f) => f.status === 'pending')
            .length,
        approved: industryCheckFolders.filter((f) => f.status === 'approved')
            .length,
        rejected: industryCheckFolders.filter((f) => f.status === 'rejected')
            .length,
    }

    const courseStats = {
        total: courseDocumentFolders.length,
        approved: courseDocumentFolders.filter((f) => f.status === 'approved')
            .length,
        pending: courseDocumentFolders.filter((f) => f.status === 'pending')
            .length,
    }

    return (
        <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-5 hover:shadow-2xl transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/20">
                            <Shield className="w-5.5 h-5.5 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">
                                Industry Checks
                            </p>
                            <p className="text-2xl text-slate-900">
                                {industryStats.total}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-5 hover:shadow-2xl transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                            <CheckCircle className="w-5.5 h-5.5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">Approved</p>
                            <p className="text-2xl text-slate-900">
                                {industryStats.approved + courseStats.approved}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-5 hover:shadow-2xl transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Clock className="w-5.5 h-5.5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">
                                Pending Review
                            </p>
                            <p className="text-2xl text-slate-900">
                                {industryStats.pending + courseStats.pending}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-5 hover:shadow-2xl transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                            <XCircle className="w-5.5 h-5.5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">Rejected</p>
                            <p className="text-2xl text-slate-900">
                                {industryStats.rejected}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 1: Industry Checks */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white">
                                    Industry Checks & Clearances
                                </h3>
                                <p className="text-white/80 text-sm mt-0.5">
                                    Required compliance documents organized by
                                    check type
                                </p>
                            </div>
                        </div>
                        <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                            <Upload className="w-3.5 h-3.5 mr-2" />
                            Upload Check
                        </Button>
                    </div>
                </div>

                {/* Industry Checks Status Summary */}
                <div className="p-5 bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
                    <div className="grid grid-cols-4 gap-3">
                        <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                            <p className="text-xl text-blue-600">
                                {industryStats.uploaded}
                            </p>
                            <p className="text-xs text-slate-600 mt-0.5">
                                Uploaded
                            </p>
                        </div>
                        <div className="text-center p-3 bg-amber-50 rounded-xl border border-amber-200">
                            <p className="text-xl text-amber-600">
                                {industryStats.pending}
                            </p>
                            <p className="text-xs text-slate-600 mt-0.5">
                                Pending
                            </p>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                            <p className="text-xl text-emerald-600">
                                {industryStats.approved}
                            </p>
                            <p className="text-xs text-slate-600 mt-0.5">
                                Approved
                            </p>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-xl border border-red-200">
                            <p className="text-xl text-red-600">
                                {industryStats.rejected}
                            </p>
                            <p className="text-xs text-slate-600 mt-0.5">
                                Rejected
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-5 space-y-2">
                    {industryCheckFolders.map((folder) => {
                        const isExpanded = expandedIndustryFolders.includes(
                            folder.id
                        )
                        const FolderIcon = getFolderIcon(isExpanded)
                        const canApproveFolder =
                            folder.status === 'uploaded' ||
                            folder.status === 'pending'

                        return (
                            <div
                                key={folder.id}
                                className="border border-slate-200 rounded-xl overflow-hidden"
                            >
                                {/* Folder Header */}
                                <div
                                    className={`flex items-center justify-between p-4 transition-all ${
                                        folder.status === 'approved'
                                            ? 'bg-emerald-50/50 hover:bg-emerald-50'
                                            : folder.status === 'pending'
                                            ? 'bg-amber-50/50 hover:bg-amber-50'
                                            : folder.status === 'rejected'
                                            ? 'bg-red-50/50 hover:bg-red-50'
                                            : 'bg-blue-50/50 hover:bg-blue-50'
                                    }`}
                                >
                                    <div
                                        onClick={() =>
                                            toggleIndustryFolder(folder.id)
                                        }
                                        className="flex items-center gap-3 flex-1 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            {isExpanded ? (
                                                <ChevronDown className="w-4 h-4 text-slate-600" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-slate-600" />
                                            )}
                                            <FolderIcon
                                                className={`w-5 h-5 ${
                                                    folder.status === 'approved'
                                                        ? 'text-emerald-600'
                                                        : folder.status ===
                                                          'pending'
                                                        ? 'text-amber-600'
                                                        : folder.status ===
                                                          'rejected'
                                                        ? 'text-red-600'
                                                        : 'text-blue-600'
                                                }`}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-slate-900">
                                                    {folder.name}
                                                </p>
                                                {getStatusBadge(folder.status)}
                                            </div>
                                            {folder.rejectionReason && (
                                                <p className="text-xs text-red-600 mt-1">
                                                    {folder.rejectionReason}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <Badge
                                                variant="secondary"
                                                text={`${
                                                    folder.documentsCount
                                                } ${
                                                    folder.documentsCount === 1
                                                        ? 'file'
                                                        : 'files'
                                                }`}
                                                className="text-xs"
                                            />
                                            <p className="text-xs text-slate-600 mt-1">
                                                Updated {folder.lastUpdated}
                                            </p>
                                        </div>
                                        {canApproveFolder && (
                                            <div className="flex items-center gap-1.5">
                                                <Button
                                                    variant="success"
                                                    text="Approve All"
                                                    Icon={ThumbsUp}
                                                    mini
                                                    className="h-8 px-3 text-xs"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleApproveClick(
                                                            'folder',
                                                            'industry',
                                                            folder.id,
                                                            folder.name
                                                        )
                                                    }}
                                                />
                                                <Button
                                                    variant="error"
                                                    outline
                                                    text="Reject All"
                                                    Icon={ThumbsDown}
                                                    mini
                                                    className="h-8 px-3 text-xs"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleRejectClick(
                                                            'folder',
                                                            'industry',
                                                            folder.id,
                                                            folder.name
                                                        )
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <Button
                                            variant="primaryNew"
                                            text="Add File"
                                            Icon={Upload}
                                            mini
                                            className="h-8 px-3 text-xs"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Folder Contents */}
                                {isExpanded && (
                                    <div className="bg-white">
                                        <table className="w-full">
                                            <thead className="bg-slate-50 border-b border-slate-200">
                                                <tr>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        File Name
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Type
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Size
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Uploaded
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Status
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Verified By
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {folder.documents.map(
                                                    (doc, index) => {
                                                        const canApproveDoc =
                                                            doc.status ===
                                                                'uploaded' ||
                                                            doc.status ===
                                                                'pending'

                                                        return (
                                                            <tr
                                                                key={doc.id}
                                                                className={`${
                                                                    index !==
                                                                    folder
                                                                        .documents
                                                                        .length -
                                                                        1
                                                                        ? 'border-b border-slate-100'
                                                                        : ''
                                                                } hover:bg-slate-50/50`}
                                                            >
                                                                <td className="py-3 px-5">
                                                                    <div className="flex items-center gap-2">
                                                                        <FileText className="w-4 h-4 text-slate-400" />
                                                                        <span className="text-sm text-slate-900">
                                                                            {
                                                                                doc.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-5">
                                                                    <Badge
                                                                        variant="secondary"
                                                                        text={
                                                                            doc.type
                                                                        }
                                                                        className="text-xs"
                                                                    />
                                                                </td>
                                                                <td className="py-3 px-5 text-xs text-slate-600">
                                                                    {doc.size}
                                                                </td>
                                                                <td className="py-3 px-5 text-xs text-slate-600">
                                                                    {
                                                                        doc.uploadDate
                                                                    }
                                                                </td>
                                                                <td className="py-3 px-5">
                                                                    {getStatusBadge(
                                                                        doc.status
                                                                    )}
                                                                </td>
                                                                <td className="py-3 px-5 text-xs text-slate-600">
                                                                    {doc.verifiedBy ||
                                                                        '-'}
                                                                </td>
                                                                <td className="py-3 px-5">
                                                                    <div className="flex gap-1.5">
                                                                        <Button
                                                                            variant="secondary"
                                                                            outline
                                                                            Icon={
                                                                                Eye
                                                                            }
                                                                            mini
                                                                            className="h-7 w-7 p-0"
                                                                        />
                                                                        <Button
                                                                            variant="secondary"
                                                                            outline
                                                                            Icon={
                                                                                Download
                                                                            }
                                                                            mini
                                                                            className="h-7 w-7 p-0"
                                                                        />
                                                                        {canApproveDoc && (
                                                                            <>
                                                                                <Button
                                                                                    variant="success"
                                                                                    Icon={
                                                                                        ThumbsUp
                                                                                    }
                                                                                    mini
                                                                                    className="h-7 px-2 text-xs"
                                                                                    onClick={() =>
                                                                                        handleApproveClick(
                                                                                            'document',
                                                                                            'industry',
                                                                                            folder.id,
                                                                                            doc.name,
                                                                                            doc.id
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <Button
                                                                                    variant="error"
                                                                                    outline
                                                                                    Icon={
                                                                                        ThumbsDown
                                                                                    }
                                                                                    mini
                                                                                    className="h-7 px-2 text-xs"
                                                                                    onClick={() =>
                                                                                        handleRejectClick(
                                                                                            'document',
                                                                                            'industry',
                                                                                            folder.id,
                                                                                            doc.name,
                                                                                            doc.id
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Section 2: Course Documents */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-[#0D5468] to-[#044866] p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white">Course Documents</h3>
                                <p className="text-white/80 text-sm mt-0.5">
                                    Workplace logs, assessments & learning
                                    materials organized by type
                                </p>
                            </div>
                        </div>
                        <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                            <Upload className="w-3.5 h-3.5 mr-2" />
                            Upload Document
                        </Button>
                    </div>
                </div>

                {/* Course Documents Progress */}
                <div className="p-5 bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-slate-600">
                            Document Completion
                        </p>
                        <p className="text-sm text-[#044866]">
                            {courseStats.approved}/{courseStats.total} completed
                        </p>
                    </div>
                    <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#044866] to-[#0D5468] rounded-full transition-all duration-500"
                            style={{
                                width: `${
                                    (courseStats.approved / courseStats.total) *
                                    100
                                }%`,
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                        </div>
                    </div>
                </div>

                <div className="p-5 space-y-2">
                    {courseDocumentFolders.map((folder) => {
                        const isExpanded = expandedCourseFolders.includes(
                            folder.id
                        )
                        const FolderIcon = getFolderIcon(isExpanded)
                        const canApproveFolder =
                            folder.status === 'uploaded' ||
                            folder.status === 'pending'

                        return (
                            <div
                                key={folder.id}
                                className="border border-slate-200 rounded-xl overflow-hidden"
                            >
                                {/* Folder Header */}
                                <div
                                    className={`flex items-center justify-between p-4 transition-all ${
                                        folder.status === 'approved'
                                            ? 'bg-emerald-50/50 hover:bg-emerald-50'
                                            : folder.status === 'pending'
                                            ? 'bg-amber-50/50 hover:bg-amber-50'
                                            : 'bg-slate-50/50 hover:bg-slate-50'
                                    }`}
                                >
                                    <div
                                        onClick={() =>
                                            toggleCourseFolder(folder.id)
                                        }
                                        className="flex items-center gap-3 flex-1 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            {isExpanded ? (
                                                <ChevronDown className="w-4 h-4 text-slate-600" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-slate-600" />
                                            )}
                                            <FolderIcon
                                                className={`w-5 h-5 ${
                                                    folder.status === 'approved'
                                                        ? 'text-emerald-600'
                                                        : folder.status ===
                                                          'pending'
                                                        ? 'text-amber-600'
                                                        : 'text-[#044866]'
                                                }`}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-slate-900">
                                                    {folder.name}
                                                </p>
                                                {getStatusBadge(folder.status)}
                                                <Badge
                                                    variant="secondary"
                                                    text={folder.category}
                                                    className="text-xs border-[#044866]/20 text-[#044866]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <Badge
                                                variant="secondary"
                                                text={`${
                                                    folder.documentsCount
                                                } ${
                                                    folder.documentsCount === 1
                                                        ? 'file'
                                                        : 'files'
                                                }`}
                                                className="text-xs"
                                            />
                                            <p className="text-xs text-slate-600 mt-1">
                                                Updated {folder.lastUpdated}
                                            </p>
                                        </div>
                                        {canApproveFolder && (
                                            <div className="flex items-center gap-1.5">
                                                <Button
                                                    variant="success"
                                                    text="Approve All"
                                                    Icon={ThumbsUp}
                                                    mini
                                                    className="h-8 px-3 text-xs"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleApproveClick(
                                                            'folder',
                                                            'course',
                                                            folder.id,
                                                            folder.name
                                                        )
                                                    }}
                                                />
                                                <Button
                                                    variant="error"
                                                    outline
                                                    text="Reject All"
                                                    Icon={ThumbsDown}
                                                    mini
                                                    className="h-8 px-3 text-xs"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleRejectClick(
                                                            'folder',
                                                            'course',
                                                            folder.id,
                                                            folder.name
                                                        )
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <Button
                                            variant="primaryNew"
                                            text="Add File"
                                            Icon={Upload}
                                            mini
                                            className="h-8 px-3 text-xs"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Folder Contents */}
                                {isExpanded && (
                                    <div className="bg-white">
                                        <table className="w-full">
                                            <thead className="bg-slate-50 border-b border-slate-200">
                                                <tr>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        File Name
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Type
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Size
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Uploaded By
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Upload Date
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Status
                                                    </th>
                                                    <th className="text-left py-2.5 px-5 text-slate-700 text-xs">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {folder.documents.map(
                                                    (doc, index) => {
                                                        const canApproveDoc =
                                                            doc.status ===
                                                                'uploaded' ||
                                                            doc.status ===
                                                                'pending'

                                                        return (
                                                            <tr
                                                                key={doc.id}
                                                                className={`${
                                                                    index !==
                                                                    folder
                                                                        .documents
                                                                        .length -
                                                                        1
                                                                        ? 'border-b border-slate-100'
                                                                        : ''
                                                                } hover:bg-slate-50/50`}
                                                            >
                                                                <td className="py-3 px-5">
                                                                    <div className="flex items-center gap-2">
                                                                        <FileText className="w-4 h-4 text-slate-400" />
                                                                        <span className="text-sm text-slate-900">
                                                                            {
                                                                                doc.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-5">
                                                                    <Badge
                                                                        variant="secondary"
                                                                        text={
                                                                            doc.type
                                                                        }
                                                                        className="text-xs"
                                                                    />
                                                                </td>
                                                                <td className="py-3 px-5 text-xs text-slate-600">
                                                                    {doc.size}
                                                                </td>
                                                                <td className="py-3 px-5 text-xs text-slate-600">
                                                                    {
                                                                        doc.uploadedBy
                                                                    }
                                                                </td>
                                                                <td className="py-3 px-5 text-xs text-slate-600">
                                                                    {
                                                                        doc.uploadDate
                                                                    }
                                                                </td>
                                                                <td className="py-3 px-5">
                                                                    {getStatusBadge(
                                                                        doc.status
                                                                    )}
                                                                </td>
                                                                <td className="py-3 px-5">
                                                                    <div className="flex gap-1.5">
                                                                        <Button
                                                                            variant="secondary"
                                                                            outline
                                                                            Icon={
                                                                                Eye
                                                                            }
                                                                            mini
                                                                            className="h-7 w-7 p-0"
                                                                        />
                                                                        <Button
                                                                            variant="secondary"
                                                                            outline
                                                                            Icon={
                                                                                Download
                                                                            }
                                                                            mini
                                                                            className="h-7 w-7 p-0"
                                                                        />
                                                                        {canApproveDoc && (
                                                                            <>
                                                                                <Button
                                                                                    variant="success"
                                                                                    Icon={
                                                                                        ThumbsUp
                                                                                    }
                                                                                    mini
                                                                                    className="h-7 px-2 text-xs"
                                                                                    onClick={() =>
                                                                                        handleApproveClick(
                                                                                            'document',
                                                                                            'course',
                                                                                            folder.id,
                                                                                            doc.name,
                                                                                            doc.id
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <Button
                                                                                    variant="error"
                                                                                    outline
                                                                                    Icon={
                                                                                        ThumbsDown
                                                                                    }
                                                                                    mini
                                                                                    className="h-7 px-2 text-xs"
                                                                                    onClick={() =>
                                                                                        handleRejectClick(
                                                                                            'document',
                                                                                            'course',
                                                                                            folder.id,
                                                                                            doc.name,
                                                                                            doc.id
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Approval Modal */}
            {approvalDialogOpen && (
                <GlobalModal
                    onCancel={() => {
                        setApprovalDialogOpen(false)
                        setApprovalComment('')
                    }}
                >
                    <div className="w-full max-w-md p-6">
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-emerald-700 mb-2">
                                <CheckCircle className="w-5 h-5" />
                                <h3 className="text-lg font-semibold">
                                    Approve{' '}
                                    {selectedItem?.type === 'folder'
                                        ? 'Folder'
                                        : 'Document'}
                                </h3>
                            </div>
                            <p className="text-slate-600 text-sm">
                                You are approving{' '}
                                <span className="font-semibold text-slate-900">
                                    "{selectedItem?.name}"
                                </span>
                                .
                                {selectedItem?.type === 'folder' && (
                                    <span className="block mt-2 text-amber-600">
                                        This will approve all documents within
                                        this folder.
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="approval-comment"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Comment (Optional)
                                </label>
                                <TextArea
                                    id="approval-comment"
                                    name="approval-comment"
                                    placeholder="Add any notes or comments about this approval..."
                                    value={approvalComment}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>
                                    ) => setApprovalComment(e.target.value)}
                                    rows={3}
                                    className="resize-none w-full"
                                />
                                <p className="text-xs text-slate-500">
                                    Example: "All documentation verified and
                                    meets requirements."
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <Button
                                variant="secondary"
                                outline
                                text="Cancel"
                                onClick={() => {
                                    setApprovalDialogOpen(false)
                                    setApprovalComment('')
                                }}
                            />
                            <Button
                                variant="success"
                                text="Approve"
                                Icon={CheckCircle}
                                onClick={handleApprove}
                            />
                        </div>
                    </div>
                </GlobalModal>
            )}

            {/* Rejection Modal */}
            {rejectionDialogOpen && (
                <GlobalModal
                    onCancel={() => {
                        setRejectionDialogOpen(false)
                        setRejectionReason('')
                    }}
                >
                    <div className="w-full max-w-md p-6">
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-red-700 mb-2">
                                <XCircle className="w-5 h-5" />
                                <h3 className="text-lg font-semibold">
                                    Reject{' '}
                                    {selectedItem?.type === 'folder'
                                        ? 'Folder'
                                        : 'Document'}
                                </h3>
                            </div>
                            <p className="text-slate-600 text-sm">
                                Please provide a reason for rejecting{' '}
                                <span className="font-semibold text-slate-900">
                                    "{selectedItem?.name}"
                                </span>
                                .
                                {selectedItem?.type === 'folder' && (
                                    <span className="block mt-2 text-amber-600">
                                        This will reject all documents within
                                        this folder.
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="rejection-reason"
                                    className="text-sm font-medium text-slate-700"
                                >
                                    Rejection Reason *
                                </label>
                                <TextArea
                                    id="rejection-reason"
                                    name="rejection-reason"
                                    placeholder="Enter detailed reason for rejection..."
                                    value={rejectionReason}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>
                                    ) => setRejectionReason(e.target.value)}
                                    rows={4}
                                    className="resize-none w-full"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <Button
                                variant="secondary"
                                outline
                                text="Cancel"
                                onClick={() => {
                                    setRejectionDialogOpen(false)
                                    setRejectionReason('')
                                }}
                            />
                            <Button
                                variant="error"
                                text="Reject"
                                Icon={XCircle}
                                onClick={handleReject}
                                disabled={!rejectionReason.trim()}
                            />
                        </div>
                    </div>
                </GlobalModal>
            )}
        </div>
    )
}
