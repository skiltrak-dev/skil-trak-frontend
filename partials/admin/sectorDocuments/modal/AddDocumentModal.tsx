import { Button, ShowErrorNotifications } from '@components'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@components/ui/dialog'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Plus } from 'lucide-react'
import { AddDefaultDocumentForm } from '../form'

export const AddDocumentModal = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}) => {
    const { notification } = useNotification()

    const [add, addResult] = AdminApi.DefaultDocuments.addDefaultDocument()

    const onSubmit = async (values: any) => {
        const res: any = await add(values)
        if (res?.data) {
            notification.success({
                title: 'Default Document Added',
                description: 'A new default document has been created',
            })
            setIsOpen(false)

            return res
        }
        return res
    }

    return (
        <div>
            <ShowErrorNotifications result={addResult} />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="dark">
                        <Plus className="w-4 h-4" />
                        New Folder
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create New Check Folder</DialogTitle>
                    </DialogHeader>

                    <AddDefaultDocumentForm
                        onSubmit={onSubmit}
                        onCancel={() => setIsOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}
