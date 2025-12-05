import { FileText } from 'lucide-react'
import { useState } from 'react'
import { AddDocumentModal } from '../modal'
import { DefaultDocuments } from './DefaultDocuments'

interface CheckFolder {
    id: string
    name: string
    description: string
    linkToApply: string
    validForMonths: number
    allowedFiles: string[]
    maxSizeMB: number
    requiresApproval: boolean
    status: 'Active' | 'Archived'
}

export const CreateCheckFolders = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <FileText className="w-6 h-6 text-gray-700" />
                        <h2 className="text-gray-900">Create Check Folders</h2>
                    </div>
                    <p className="text-gray-600 mt-1">
                        Manage reusable industry check templates
                    </p>
                </div>
                <AddDocumentModal
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                />
            </div>

            {/* Folders Table */}
            <DefaultDocuments />
        </div>
    )
}
