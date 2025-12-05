import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@components/ui/dialog'
import { Plus, Edit2, Archive, FileText } from 'lucide-react'
import { useNotification } from '@hooks'
import {
    Button,
    Card,
    Select,
    Switch,
    TextArea,
    TextInput,
    Typography,
} from '@components'
import { ScrollArea } from '@components/ui/scroll-area'
import { DefaultDocuments } from './DefaultDocuments'
import { AddDocumentModal } from '../modal'

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

const initialFolders: CheckFolder[] = [
    {
        id: '1',
        name: 'Working with Children Check',
        description:
            'Required for all students working with minors in community or education settings. This check ensures you meet the legal requirements to work with children under 18. You must apply online through the official government portal and receive approval before commencing any placement involving children. The check is valid for five years and must be current throughout your placement period. Upload your approval notice once received.',
        linkToApply: 'https://www.workingwithchildren.gov.au/apply',
        validForMonths: 60,
        allowedFiles: ['PDF', 'JPG', 'PNG'],
        maxSizeMB: 10,
        requiresApproval: true,
        status: 'Active',
    },
    {
        id: '2',
        name: 'Police Check',
        description:
            'National police clearance certificate for healthcare and community services. This comprehensive background check verifies your criminal history and is essential for working in vulnerable settings. The check must be less than 12 months old at the time of placement commencement. Apply through the Australian Federal Police or an accredited provider. Processing typically takes 2-3 weeks, so plan ahead.',
        linkToApply:
            'https://www.afp.gov.au/what-we-do/services/criminal-records',
        validForMonths: 12,
        allowedFiles: ['PDF'],
        maxSizeMB: 10,
        requiresApproval: true,
        status: 'Active',
    },
    {
        id: '3',
        name: 'First Aid Certificate',
        description:
            'Current first aid and CPR certification including HLTAID011 Provide First Aid and HLTAID009 Provide CPR. This training equips you with life-saving skills essential for emergency situations in healthcare and community settings. Certificates are valid for three years and must remain current throughout your placement.',
        linkToApply: 'https://www.redcross.org.au/get-involved/learn/first-aid',
        validForMonths: 36,
        allowedFiles: ['PDF', 'JPG', 'PNG'],
        maxSizeMB: 10,
        requiresApproval: false,
        status: 'Active',
    },
    {
        id: '4',
        name: 'Placement Agreement',
        description:
            'A formal agreement between the student, training organisation, and placement provider that outlines roles, responsibilities, and expectations during the work placement period. This document must be signed by all parties before placement commencement. The agreement covers supervision arrangements, assessment requirements, workplace health and safety obligations, confidentiality provisions, and dispute resolution procedures. Students must review all terms carefully before signing and retain a copy for their records.',
        linkToApply: 'https://www.skiltrak.edu.au/forms/placement-agreement',
        validForMonths: 12,
        allowedFiles: ['PDF'],
        maxSizeMB: 10,
        requiresApproval: true,
        status: 'Active',
    },
    {
        id: '5',
        name: 'Eligibility Checklist',
        description:
            'A comprehensive pre-placement eligibility checklist that verifies student readiness for industry placement. This checklist confirms completion of prerequisite units, required industry checks, insurance coverage, and understanding of workplace expectations. Students must complete all items on the checklist and obtain coordinator approval before being eligible for placement allocation. The checklist includes verification of course progress, attendance requirements, outstanding fees, and any specific placement prerequisites relevant to your course and chosen industry sector.',
        linkToApply: 'https://www.skiltrak.edu.au/forms/eligibility-checklist',
        validForMonths: 6,
        allowedFiles: ['PDF', 'JPG', 'PNG'],
        maxSizeMB: 10,
        requiresApproval: true,
        status: 'Active',
    },
    {
        id: '6',
        name: 'Placement Logbook',
        description:
            'A detailed record of all activities, tasks, and learning experiences completed during your industry placement. The logbook serves as evidence of competency development and must be maintained throughout the placement period. Students are required to document daily or weekly entries including hours worked, tasks completed, skills practiced, supervisor feedback, and reflections on learning. The logbook must be signed off by your workplace supervisor at regular intervals and submitted to your assessor for final evaluation upon placement completion.',
        linkToApply: 'https://www.skiltrak.edu.au/forms/placement-logbook',
        validForMonths: 12,
        allowedFiles: ['PDF', 'JPG', 'PNG'],
        maxSizeMB: 15,
        requiresApproval: true,
        status: 'Active',
    },
]

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
