import { useState } from 'react'
import {
    AlertCircle,
    CheckCircle2,
    Download,
    FileSpreadsheet,
    Upload,
    X,
} from 'lucide-react'
import { Badge, Button, Card, Typography } from '@components'

interface BulkIndustryImportFormProps {
    onClose: () => void
}

type ValidationResult = {
    valid: Array<{ name: string; abn: string; status: string }>
    conflicts: Array<{
        name: string
        abn: string
        conflictType: string
        reason: string
    }>
}

export const BulkIndustryImportForm = ({
    onClose,
}: BulkIndustryImportFormProps) => {
    const [dragActive, setDragActive] = useState(false)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [showValidation, setShowValidation] = useState(false)
    const [validationResults, setValidationResults] =
        useState<ValidationResult>({
            valid: [],
            conflicts: [],
        })

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setUploadedFile(e.dataTransfer.files[0])
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0])
        }
    }

    const handleSubmitBulk = () => {
        const mockValidation: ValidationResult = {
            valid: [
                {
                    name: 'Sunshine Aged Care',
                    abn: '12 345 678 901',
                    status: 'Ready to import',
                },
                {
                    name: 'Harmony Services',
                    abn: '23 456 789 012',
                    status: 'Ready to import',
                },
            ],
            conflicts: [
                {
                    name: 'Metro Care Services',
                    abn: '34 567 890 123',
                    conflictType: 'Other RTO',
                    reason: 'Already partnered with Sydney RTO',
                },
                {
                    name: 'Global Healthcare Network',
                    abn: '45 678 901 234',
                    conflictType: 'SkilTrak',
                    reason: 'Belongs to SkilTrak global directory',
                },
            ],
        }
        setValidationResults(mockValidation)
        setShowValidation(true)
    }

    const downloadTemplate = () => {
        const csvContent =
            'Name,ABN,Sector,Location,Contact Person,Contact Email,Contact Phone,Capacity,Website,Facilities\n' +
            'Example Aged Care,12 345 678 901,Community Services,Melbourne VIC,John Smith,john@example.com.au,(03) 1234 5678,15,https://example.com.au,Aged Care|Disability Support\n'

        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'industry-partners-template.csv'
        a.click()
        window.URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-4 mt-4 animate-fadeIn">
            <Card className="p-4 border border-primaryNew/15 bg-gradient-to-r from-primaryNew/5 via-background to-primaryNew/10 rounded-xl">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primaryNew to-primaryNew shadow-md">
                            <Upload className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <Typography variant="subtitle" semibold>
                                Bulk import partners in one go
                            </Typography>
                            <Typography variant="xs" color="text-muted">
                                Upload a CSV or Excel file and we&apos;ll
                                validate partners before you import them into
                                SkilTrak.
                            </Typography>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-5 border-2 border-dashed border-primaryNew/30 hover:border-primaryNew/60 transition-all rounded-2xl bg-background/60">
                <div
                    className={`relative rounded-xl p-6 text-center transition-all cursor-pointer ${
                        dragActive
                            ? 'border-2 border-primaryNew bg-primaryNew/5'
                            : 'border-2 border-border hover:border-primaryNew/60 hover:bg-muted/60'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() =>
                        document.getElementById('bulk-file-upload')?.click()
                    }
                >
                    <input
                        type="file"
                        id="bulk-file-upload"
                        className="hidden"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                    />

                    {uploadedFile ? (
                        <div className="space-y-3">
                            <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-500 flex items-center justify-center shadow-md">
                                <CheckCircle2 className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <Typography variant="label" semibold>
                                    {uploadedFile.name}
                                </Typography>
                                <Typography variant="xs" color="text-muted">
                                    {(uploadedFile.size / 1024).toFixed(2)} KB
                                </Typography>
                            </div>
                            <Button
                                text="Remove file"
                                outline
                                Icon={X}
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation()
                                    setUploadedFile(null)
                                }}
                            />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-primaryNew/10 to-primaryNew/10 flex items-center justify-center">
                                <FileSpreadsheet className="h-6 w-6 text-primaryNew" />
                            </div>
                            <div>
                                <Typography variant="label" semibold>
                                    Drag &amp; drop your file here
                                </Typography>
                                <Typography variant="xs" color="text-muted">
                                    or click to browse from your computer
                                </Typography>
                            </div>
                            <Button
                                text="Choose file"
                                outline
                                variant="primaryNew"
                                Icon={Upload}
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation()
                                    document
                                        .getElementById('bulk-file-upload')
                                        ?.click()
                                }}
                            />
                        </div>
                    )}
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <Badge text="CSV" variant="primaryNew" />
                    <Badge text="XLSX" variant="primaryNew" />
                    <Badge text="XLS" variant="primaryNew" />
                </div>
            </Card>

            <Card className="p-4 border border-primaryNew/20 bg-gradient-to-br from-primaryNew/5 to-transparent rounded-xl">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primaryNew/10 to-primaryNew/10">
                            <Download className="h-4 w-4 text-primaryNew" />
                        </div>
                        <div>
                            <Typography variant="label" semibold>
                                Need a template?
                            </Typography>
                            <Typography variant="xs" color="text-muted">
                                Download our CSV template with example data to
                                get started.
                            </Typography>
                        </div>
                    </div>
                    <Button
                        text="Download template"
                        outline
                        variant="primaryNew"
                        Icon={Download}
                        onClick={downloadTemplate}
                    />
                </div>
            </Card>

            {showValidation && validationResults.valid.length > 0 && (
                <Card className="p-5 border border-primaryNew/30 bg-gradient-to-br from-primaryNew/5 to-transparent rounded-xl space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FileSpreadsheet className="h-5 w-5 text-primaryNew" />
                        <Typography variant="subtitle" semibold>
                            Validation results
                        </Typography>
                    </div>

                    <div className="space-y-4">
                        {validationResults.valid.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle2 className="h-4 w-4 text-success" />
                                    <Typography variant="label" semibold>
                                        Valid industries (
                                        {validationResults.valid.length})
                                    </Typography>
                                </div>
                                <div className="space-y-2">
                                    {validationResults.valid.map(
                                        (item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20"
                                            >
                                                <div>
                                                    <Typography
                                                        variant="label"
                                                        semibold
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="xs"
                                                        color="text-muted"
                                                    >
                                                        ABN: {item.abn}
                                                    </Typography>
                                                </div>
                                                <Badge
                                                    variant="success"
                                                    text={item.status}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {validationResults.conflicts.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="h-4 w-4 text-warning" />
                                    <Typography variant="label" semibold>
                                        Conflicts detected (
                                        {validationResults.conflicts.length})
                                    </Typography>
                                </div>
                                <div className="space-y-2">
                                    {validationResults.conflicts.map(
                                        (item, idx) => (
                                            <div
                                                key={idx}
                                                className={`p-3 rounded-lg border ${
                                                    item.conflictType ===
                                                    'Other RTO'
                                                        ? 'bg-destructive/5 border-destructive/20'
                                                        : 'bg-warning/5 border-warning/20'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <div className="flex-1">
                                                        <Typography
                                                            variant="label"
                                                            semibold
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="xs"
                                                            color="text-muted"
                                                        >
                                                            ABN: {item.abn}
                                                        </Typography>
                                                    </div>
                                                    <Badge
                                                        variant={
                                                            item.conflictType ===
                                                            'Other RTO'
                                                                ? 'error'
                                                                : 'warning'
                                                        }
                                                        text={item.conflictType}
                                                    />
                                                </div>
                                                <Typography
                                                    variant="xs"
                                                    color="text-muted"
                                                >
                                                    {item.reason}
                                                </Typography>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border flex flex-col gap-1 text-sm">
                        <div className="flex items-center justify-between">
                            <Typography variant="label" color="text-muted">
                                Ready to import:
                            </Typography>
                            <Typography
                                variant="label"
                                semibold
                                color="text-success"
                            >
                                {validationResults.valid.length} industries
                            </Typography>
                        </div>
                        <div className="flex items-center justify-between">
                            <Typography variant="label" color="text-muted">
                                Require resolution:
                            </Typography>
                            <Typography
                                variant="label"
                                semibold
                                color="text-warning"
                            >
                                {validationResults.conflicts.length} conflicts
                            </Typography>
                        </div>
                    </div>
                </Card>
            )}

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
                <Button text="Cancel" variant="secondary" onClick={onClose} />
                {!showValidation ? (
                    <Button
                        text="Validate & Continue"
                        variant="info"
                        Icon={FileSpreadsheet}
                        onClick={handleSubmitBulk}
                        disabled={!uploadedFile}
                    />
                ) : (
                    <Button
                        text={`Import ${validationResults.valid.length} industries`}
                        variant="primaryNew"
                        Icon={Upload}
                        onClick={() => {
                            console.log(
                                'Importing valid industries:',
                                validationResults.valid
                            )
                            onClose()
                        }}
                        disabled={validationResults.valid.length === 0}
                    />
                )}
            </div>
        </div>
    )
}
