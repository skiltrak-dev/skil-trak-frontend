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
import { useRouter } from 'next/router'
import { AddDefaultDocumentForm } from '../form'

export const UpdateDocumentModal = ({
    isOpen,
    setIsOpen,
    initialValues,
}: {
    isOpen: boolean
    initialValues?: any
    setIsOpen: (open: boolean) => void
}) => {
    console.log({ initialValues })

    const router = useRouter()
    const { notification } = useNotification()

    const [update, updateResult] =
        AdminApi.DefaultDocuments.updateDefaultDocument()

    const onSubmit = async (values: any) => {
        const res: any = await update({
            ...values,
            id: initialValues?.id,
        })
        if (res?.data) {
            notification.success({
                title: 'Default Document Updated',
                description: 'Default document has been updated successfully',
            })
            setIsOpen(false)
            return res
        }
        return res
    }

    return (
        <div>
            <ShowErrorNotifications result={updateResult} />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="dark">
                        <Plus className="w-4 h-4" />
                        New Folder
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Check Folder</DialogTitle>
                    </DialogHeader>

                    <AddDefaultDocumentForm
                        edit
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        onCancel={() => setIsOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}
