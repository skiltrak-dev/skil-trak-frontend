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
                {...(contactPerson ? { initialValues: contactPerson } : {})}
                {...(edit ? { edit: edit } : {})}
                userId={userId}
            />
        )
        contextBar.show(false)
    }

    const onModalCancelClicked = () => setModal(null)

    const onDeleteClicked = (contactPerson: any) => {
        setModal(
            <DeleteModal
                contactPerson={contactPerson}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const actions = [
        {
            text: 'View',
            onClick: (subadmin: any) => {
                router.push({
                    pathname: `/portals/admin/sub-admin/${subadmin?.id}`,
                    query: { tab: 'history' },
                })
            },
            Icon: FaRegEye,
        },
    ]

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

        console.log({ fileObjectfileObjectfileObject: fileObject })

        return (
            <RtoDocumentCard
                title={name}
                name={name}
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
