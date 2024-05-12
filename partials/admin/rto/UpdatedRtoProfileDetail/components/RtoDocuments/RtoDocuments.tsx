import { useContextBar } from '@hooks'
import { AddAdminCB, DeleteModal } from '@partials/rto'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { ContextBarDropdown } from '../ContextBarDropdown'
import { RtoDocumentCard } from './Cards'
import { FileUpload } from '@hoc'
import { isBrowser } from '@utils'

export const RtoDocuments = ({ userId }: { userId: number }) => {
    const [modal, setModal] = useState<ReactNode | null>(null)
    const [isViewd, setIsViewd] = useState<boolean>(false)

    const [uploadedFile, setUploadedFile] = useState<string | null>(null)

    const router = useRouter()

    const { isLoading, data, refetch } = AdminApi.Rtos.useRtoProfileSubAdmins({
        id: Number(userId),
    })

    const contextBar = useContextBar()

    const onAddAdmin = ({
        contactPerson,
        edit,
    }: {
        contactPerson?: any
        edit: boolean
    }) => {
        contextBar.setTitle('Add Contact Person')
        contextBar.setContent(
            <AddAdminCB
                userId={userId}
                {...(edit ? { edit: edit } : {})}
                {...(contactPerson ? { initialValues: contactPerson } : {})}
            />
        )
        contextBar.show(false)
    }

    const MyComponent = ({
        name,
        dragging,
        file,
        handleRemove,
        fileObject,
    }: {
        name: string
        dragging: boolean
        file: any
        handleRemove: any
        fileObject: any
    }) => {
        const onRemove = () => {
            setUploadedFile(null)
            handleRemove()
        }

        return (
            <RtoDocumentCard
                name={name}
                title={name}
                file={uploadedFile || fileObject}
            />
        )
    }

    return (
        <div>
            {modal}
            <ContextBarDropdown title="Documents" onSetDropdown={setIsViewd}>
                <FileUpload
                    name="Work Flow"
                    component={MyComponent}
                    onChange={(e: any) => {
                        const fileType = e?.type?.split('/')?.[1]
                        console.log({ fileType })
                    }}
                />
            </ContextBarDropdown>
        </div>
    )
}
