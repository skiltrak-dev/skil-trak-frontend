import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@components/ui/dialog'
import { Switch, Button, TextInput } from '@components'
import { ChangeEvent } from 'react'

interface AddDocumentModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    newDocName: string
    newDocRequired: boolean
    onDocNameChange: (name: string) => void
    onDocRequiredChange: (required: boolean) => void
    onAddDocument: () => void
}

export function AddDocumentModal({
    open,
    onOpenChange,
    newDocName,
    newDocRequired,
    onDocNameChange,
    onDocRequiredChange,
    onAddDocument,
}: AddDocumentModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle className="text-[#1A2332] font-bold">
                        Add Custom Document
                    </DialogTitle>
                    <DialogDescription className="text-[#64748B] text-sm">
                        Add a new document requirement for the selected sector.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <TextInput
                        label="Document Name"
                        id="docName"
                        name="docName"
                        type="text"
                        showError={false}
                        placeholder="Document Name"
                        value={newDocName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onDocNameChange(e.target.value)
                        }
                    />

                    <Switch
                        name="mandatory"
                        isChecked={newDocRequired}
                        customStyleClass="profileSwitch"
                        onChange={(checked: boolean) =>
                            onDocRequiredChange(checked)
                        }
                        label="Mandatory"
                    />
                    <div className="flex items-center justify-end">
                        <Button
                            className="bg-gradient-to-br from-[#044866] to-[#0D5468] hover:shadow-lg text-white text-xs font-medium"
                            onClick={onAddDocument}
                        >
                            Add Document
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
