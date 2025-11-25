import { GlobalModal } from '@components/Modal/GlobalModal'
import { Button, Typography } from '@components'
import { TextInput } from '@components/inputs/TextInput'
import { Upload, FileCheck, Info, CheckCircle2, Clock } from 'lucide-react'
import { MdCancel } from 'react-icons/md'

interface ProofUploadModalProps {
    open: boolean
    onClose: () => void
    proofFile: File | null
    onProofFileChange: (file: File | null) => void
    onSubmit: () => void
    onSkip: () => void
}

export function ProofUploadModal({
    open,
    onClose,
    proofFile,
    onProofFileChange,
    onSubmit,
    onSkip,
}: ProofUploadModalProps) {
    if (!open) return null

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        onProofFileChange(file)
    }

    const handleClose = () => {
        onClose()
        onProofFileChange(null)
    }

    return (
        <GlobalModal onCancel={handleClose} className="sm:max-w-[500px]">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div>
                        <Typography
                            variant="h3"
                            className="text-[#044866] flex items-center gap-2"
                        >
                            <Upload className="h-5 w-5" />
                            Upload Proof of Employment
                        </Typography>
                        <Typography
                            variant="small"
                            className="text-gray-600 mt-1"
                        >
                            Upload a payslip or employment contract to verify
                            the student's employment
                        </Typography>
                    </div>
                    <MdCancel
                        onClick={handleClose}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                <div className="space-y-4 py-4">
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-[#044866] transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                        />
                        <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                        <Typography
                            variant="body"
                            className="text-slate-700 font-medium mb-1"
                        >
                            Click to upload or drag and drop
                        </Typography>
                        <Typography variant="small" className="text-slate-500">
                            PDF, JPG, PNG (max 10MB)
                        </Typography>
                    </div>

                    {proofFile && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <div className="flex items-center gap-2">
                                <FileCheck className="h-4 w-4 text-emerald-600" />
                                <Typography
                                    variant="small"
                                    className="text-emerald-700 font-medium"
                                >
                                    {proofFile.name}
                                </Typography>
                            </div>
                        </div>
                    )}

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                            <Typography
                                variant="small"
                                className="text-blue-900"
                            >
                                Accepted documents: Recent payslip, employment
                                contract, or offer letter
                            </Typography>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t mt-4">
                    <div className="flex gap-2 flex-1">
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            text="Cancel"
                        />
                        <Button
                            outline
                            variant="secondary"
                            className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300"
                            onClick={onSkip}
                            Icon={Clock}
                            text="Skip for Now"
                        />
                    </div>
                    <Button
                        variant="primaryNew"
                        onClick={onSubmit}
                        Icon={CheckCircle2}
                        text="Submit Request"
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
