import { useState } from 'react'
import { FileText, User, Tag } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components/ui'
import {
    Badge,
    Button,
    Select,
    Switch,
    TextArea,
    Typography,
} from '@components'

interface AddNoteModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (note: {
        content: string
        category: string
        isPinned: boolean
    }) => void
    studentName: string
}

export function AddNoteModal({
    isOpen,
    onClose,
    onSubmit,
    studentName,
}: AddNoteModalProps) {
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('general')
    const [isPinned, setIsPinned] = useState(false)

    const handleSubmit = () => {
        if (content.trim()) {
            onSubmit({
                content,
                category,
                isPinned,
            })
            // Reset form
            setContent('')
            setCategory('general')
            setIsPinned(false)
            onClose()
        }
    }

    const handleCancel = () => {
        // Reset form
        setContent('')
        setCategory('general')
        setIsPinned(false)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle>
                                Add Note to Student Profile
                            </DialogTitle>
                            <DialogDescription>
                                Add a note to {studentName}'s profile
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Student Info Badge */}
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                        <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                Student:
                            </span>
                            <Badge
                                variant="secondary"
                                text={studentName}
                            ></Badge>
                        </div>
                    </div>

                    {/* Note Category */}
                    <div className="space-y-2">
                        <Select
                            label={'Category'}
                            name="category"
                            onChange={setCategory}
                            options={[
                                { key: 'general', value: 'General Note' },
                                { key: 'placement', value: 'Placement Update' },
                                {
                                    key: 'communication',
                                    value: 'Communication Log',
                                },
                                { key: 'progress', value: 'Progress Report' },
                                { key: 'concern', value: 'Concern/Issue' },
                                { key: 'achievement', value: 'Achievement' },
                                { key: 'meeting', value: 'Meeting Notes' },
                            ]}
                        />
                    </div>

                    {/* Note Content */}
                    <div className="space-y-2">
                        <TextArea
                            name="content"
                            label={'Note'}
                            required
                            value={content}
                            onChange={(e: any) => setContent(e.target.value)}
                            placeholder="Enter your note here..."
                            helpText="This note will be added to the student's profile timeline."
                        />
                    </div>

                    {/* Pin Option */}
                    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                        <div className="space-y-0.5">
                            <Typography
                                htmlFor="pin-note"
                                className="cursor-pointer"
                            >
                                Pin this note
                            </Typography>
                            <p className="text-sm text-muted-foreground">
                                Pinned notes appear at the top of the profile
                            </p>
                        </div>
                        <Switch
                            name="pin-note"
                            value={isPinned}
                            onChange={setIsPinned}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!content.trim()}>
                        Add Note
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
