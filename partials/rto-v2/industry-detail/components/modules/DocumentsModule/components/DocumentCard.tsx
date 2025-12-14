import { Badge, Button, Card, Switch } from '@components'
import { FileText, CheckCircle, AlertCircle } from 'lucide-react'

interface Document {
    name: string
    required: boolean
    enabled: boolean
    isCustom: boolean
}

interface DocumentCardProps {
    doc: Document
    onToggle: () => void
    onDelete?: () => void
}

export function DocumentCard({ doc, onToggle, onDelete }: DocumentCardProps) {
    return (
        <Card className="p-4 hover:border-[#044866]/20 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                            doc.enabled
                                ? 'bg-gradient-to-br from-[#044866] to-[#0D5468]'
                                : 'bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8]'
                        }`}
                    >
                        <FileText
                            className={`w-5 h-5 ${
                                doc.enabled ? 'text-white' : 'text-[#64748B]'
                            }`}
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-[#1A2332]">
                                {doc.name}
                            </h4>
                            {doc.required && (
                                <Badge variant="error" outline>
                                    MANDATORY
                                </Badge>
                            )}
                            {doc.isCustom && (
                                <Badge variant="primaryNew" outline>
                                    CUSTOM
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5">
                            {doc.enabled ? (
                                <>
                                    <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
                                    <p className="text-xs text-[#64748B]">
                                        Required for this placement
                                    </p>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-3.5 h-3.5 text-[#94A3B8]" />
                                    <p className="text-xs text-[#94A3B8]">
                                        Not required
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Toggle */}
                <Switch
                    name="enabled"
                    isChecked={doc.enabled}
                    onChange={(checked: any) => onToggle()}
                    customStyleClass="profileSwitch"
                />
            </div>
            {doc.isCustom && onDelete && (
                <div className="flex items-center justify-end mt-2">
                    <Button variant="error" onClick={onDelete}>
                        Delete Document
                    </Button>
                </div>
            )}
        </Card>
    )
}
