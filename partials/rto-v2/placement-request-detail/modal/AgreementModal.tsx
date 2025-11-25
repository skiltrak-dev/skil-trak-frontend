import { useState } from 'react'
import { GlobalModal } from '@components/Modal/GlobalModal'
import { Button } from '@components'
import { Typography } from '@components/Typography'
import {
    FileSignature,
    FileText,
    CheckCircle2,
    AlertCircle,
    UserCircle,
} from 'lucide-react'

interface AgreementModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

export function AgreementModal({
    open,
    onClose,
    onConfirm,
}: AgreementModalProps) {
    const [selectedDocuments, setSelectedDocuments] = useState<string[]>([
        'placement-agreement',
        'code-of-conduct',
    ])

    const documents = [
        {
            id: 'placement-agreement',
            name: 'Placement Agreement',
            description: 'Main placement agreement contract',
            required: true,
        },
        {
            id: 'code-of-conduct',
            name: 'Code of Conduct',
            description: 'Workplace behavior and ethics guidelines',
            required: true,
        },
        {
            id: 'confidentiality-agreement',
            name: 'Confidentiality Agreement',
            description: 'Privacy and confidentiality terms',
            required: false,
        },
        {
            id: 'safety-induction',
            name: 'Workplace Safety Induction',
            description: 'WHS and safety protocols',
            required: false,
        },
        {
            id: 'insurance-waiver',
            name: 'Insurance & Liability Waiver',
            description: 'Insurance coverage acknowledgment',
            required: false,
        },
    ]

    const toggleDocument = (docId: string) => {
        const doc = documents.find((d) => d.id === docId)
        if (doc?.required) return // Can't unselect required documents

        setSelectedDocuments((prev) =>
            prev.includes(docId)
                ? prev.filter((id) => id !== docId)
                : [...prev, docId]
        )
    }

    if (!open) return null

    return (
        <GlobalModal onCancel={onClose} className="max-w-[600px]">
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-primaryNew text-xl font-semibold mb-2">
                        <FileSignature className="h-5 w-5" />
                        <Typography variant="h3">
                            Generate Placement Agreement
                        </Typography>
                    </div>
                    <Typography variant="small" className="text-gray-600">
                        Select documents to send for e-signing by all parties
                    </Typography>
                </div>

                {/* Document Selection */}
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <FileText className="h-4 w-4 text-primaryNew" />
                            <Typography variant="label">
                                Documents to Send
                            </Typography>
                        </div>
                        <div className="space-y-2 mt-2">
                            {documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    onClick={() => toggleDocument(doc.id)}
                                    className={`
                    p-4 rounded-lg border-2 transition-all cursor-pointer
                    ${
                        selectedDocuments.includes(doc.id)
                            ? 'border-primaryNew bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                    }
                    ${doc.required ? 'cursor-not-allowed opacity-75' : ''}
                  `}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5
                      ${
                          selectedDocuments.includes(doc.id)
                              ? 'border-primaryNew bg-primaryNew'
                              : 'border-gray-300'
                      }
                    `}
                                        >
                                            {selectedDocuments.includes(
                                                doc.id
                                            ) && (
                                                <CheckCircle2 className="h-3 w-3 text-white" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {doc.name}
                                                </p>
                                                {doc.required && (
                                                    <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                                                        Required
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-600 mt-0.5">
                                                {doc.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-primaryNew/20 rounded-xl">
                        <p className="text-sm text-primaryNew font-medium mb-2 flex items-center gap-2">
                            <UserCircle className="h-4 w-4" />
                            Documents will be sent to:
                        </p>
                        <ul className="space-y-1 text-sm text-primaryNew">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                Student: Sarah Johnson
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                Industry: St Vincent's Hospital
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                RTO: AIBT Global
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-amber-900">
                            All selected documents must be signed by all parties
                            before the placement can proceed.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        text="Cancel"
                    />
                    <Button
                        variant="primaryNew"
                        onClick={onConfirm}
                        Icon={FileSignature}
                        text={`Generate & Send ${
                            selectedDocuments.length
                        } Document${selectedDocuments.length !== 1 ? 's' : ''}`}
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
