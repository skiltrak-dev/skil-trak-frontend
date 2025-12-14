import { useState } from 'react'
import {
    AddDocumentModal,
    DocumentsFooter,
    DocumentsStats,
    DocumentsModuleHeader,
    SectorTabs,
    DocumentCard,
    InsuranceSection,
} from './components'

const sectors = [
    'Community Services',
    'Cookery',
    'Information Technology',
    'Healthcare',
    'Business Administration',
]

const initialDocumentsBySector = {
    'Community Services': [
        {
            name: 'NDIS Worker Screening Check',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'Working with Children Check',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'Police Check',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'First Aid Certificate',
            required: true,
            enabled: false,
            isCustom: false,
        },
        {
            name: 'CPR Certificate',
            required: false,
            enabled: true,
            isCustom: false,
        },
    ],
    Cookery: [
        {
            name: 'Food Safety Certificate',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'Responsible Service of Alcohol',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'Police Check',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'Allergen Training',
            required: false,
            enabled: false,
            isCustom: false,
        },
    ],
    'Information Technology': [
        {
            name: 'Police Check',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'Confidentiality Agreement',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'IT Security Clearance',
            required: false,
            enabled: true,
            isCustom: false,
        },
    ],
    Healthcare: [
        {
            name: 'AHPRA Registration',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'Police Check',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'Immunization Records',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'First Aid Certificate',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'Manual Handling Training',
            required: false,
            enabled: false,
            isCustom: false,
        },
    ],
    'Business Administration': [
        {
            name: 'Police Check',
            required: true,
            enabled: true,
            isCustom: false,
        },
        {
            name: 'Confidentiality Agreement',
            required: true,
            enabled: true,
            isCustom: false,
        },
    ],
}

export function DocumentsModule() {
    const [activeSector, setActiveSector] = useState('Community Services')
    const [documentsBySector, setDocumentsBySector] = useState(
        initialDocumentsBySector
    )
    const [showAddModal, setShowAddModal] = useState(false)
    const [newDocName, setNewDocName] = useState('')
    const [newDocRequired, setNewDocRequired] = useState(false)

    const currentDocs =
        documentsBySector[activeSector as keyof typeof documentsBySector]
    const enabledCount = currentDocs.filter((doc) => doc.enabled).length
    const mandatoryCount = currentDocs.filter((doc) => doc.required).length

    const handleAddDocument = () => {
        if (newDocName.trim()) {
            const newDocuments = [
                ...currentDocs,
                {
                    name: newDocName,
                    required: newDocRequired,
                    enabled: true,
                    isCustom: true,
                },
            ]
            setDocumentsBySector((prev) => ({
                ...prev,
                [activeSector]: newDocuments,
            }))
            setShowAddModal(false)
            setNewDocName('')
            setNewDocRequired(false)
        }
    }

    const handleToggleDocument = (index: number) => {
        const newDocuments = currentDocs.map((doc, i) =>
            i === index ? { ...doc, enabled: !doc.enabled } : doc
        )
        setDocumentsBySector((prev) => ({
            ...prev,
            [activeSector]: newDocuments,
        }))
    }

    const handleDeleteDocument = (index: number) => {
        const newDocuments = currentDocs.filter((_, i) => i !== index)
        setDocumentsBySector((prev) => ({
            ...prev,
            [activeSector]: newDocuments,
        }))
    }

    return (
        <div className="space-y-4 px-4">
            <DocumentsModuleHeader onAddClick={() => setShowAddModal(true)} />

            <DocumentsStats
                enabledCount={enabledCount}
                totalCount={currentDocs.length}
                mandatoryCount={mandatoryCount}
                activeSector={activeSector}
            />

            <SectorTabs
                sectors={sectors}
                activeSector={activeSector}
                onSectorChange={setActiveSector}
            />

            <div className="grid gap-3">
                {currentDocs.map((doc, index) => (
                    <DocumentCard
                        key={index}
                        doc={doc}
                        onToggle={() => handleToggleDocument(index)}
                        onDelete={
                            doc.isCustom
                                ? () => handleDeleteDocument(index)
                                : undefined
                        }
                    />
                ))}
            </div>

            <InsuranceSection />

            <DocumentsFooter />

            <AddDocumentModal
                open={showAddModal}
                onOpenChange={setShowAddModal}
                newDocName={newDocName}
                newDocRequired={newDocRequired}
                onDocNameChange={setNewDocName}
                onDocRequiredChange={setNewDocRequired}
                onAddDocument={handleAddDocument}
            />
        </div>
    )
}
