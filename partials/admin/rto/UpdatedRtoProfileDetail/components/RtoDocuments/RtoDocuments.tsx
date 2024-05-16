import { FileUpload } from '@hoc'
import { useContextBar, useNotification } from '@hooks'
import { AddAdminCB } from '@partials/rto'
import { AdminApi, RtoApi } from '@queries'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { ContextBarDropdown } from '../ContextBarDropdown'
import { RtoDocumentCard } from './Cards'
import { DocumentType } from '@partials/admin/documents/componnets'
import { UserRoles } from '@constants'
import { ShowErrorNotifications } from '@components'

export const RtoDocuments = ({ userId }: { userId: number }) => {
    const [modal, setModal] = useState<ReactNode | null>(null)
    const [isViewd, setIsViewd] = useState<boolean>(false)
    const [selectedDoc, setSelectedDoc] = useState<DocumentType | null>(null)

    const { notification } = useNotification()

    const getDocuments = RtoApi.RtoDocument.useGetRtoDocuments(Number(userId), {
        skip: !isViewd,
    })
    const [addDocument, addDocumentResult] =
        RtoApi.RtoDocument.useAddRtoDocuments()

    const filterDocuments = (docType: string) =>
        getDocuments.data
            ?.map((doc: any) => ({ ...doc, for: 'rto' }))
            ?.find((doc: any) => doc?.docType === docType)

    const data = {
        workflow: filterDocuments(DocumentType.WorkFlow),
        inductionProcess: filterDocuments(DocumentType.InductionProcess),
        placementInfo: filterDocuments(DocumentType.PlacementInfo),
        legal: filterDocuments(DocumentType.Legal),
    }

    const MyComponent = ({ name }: { name: string }) => {
        const documentNames = {
            'Work Flow': DocumentType.WorkFlow,
            'Induction Process': DocumentType.InductionProcess,
            'Placement Info': DocumentType.PlacementInfo,
            Legal: DocumentType.Legal,
        }

        return (
            <RtoDocumentCard
                name={name}
                title={name}
                file={(data as any)?.[(documentNames as any)?.[name]]?.file}
                loading={
                    addDocumentResult.isLoading &&
                    selectedDoc === (documentNames as any)?.[name]
                }
            />
        )
    }

    const onUploadDocument = (file: File, docType: DocumentType) => {
        setSelectedDoc(docType)
        const formData = new FormData()
        const values = {
            file: file,
            for: UserRoles.RTO,
            fileType: 'file',
            docType: docType,
            userId: String(userId),
        }
        Object.entries(values)?.map(([key, value]: any) => {
            formData.append(key, value)
        })

        addDocument(formData).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'File Uploaded',
                    description: 'File Uploaded Successfully',
                })
            }
        })
    }

    return (
        <div>
            {modal}
            <ShowErrorNotifications result={addDocumentResult} />
            <ContextBarDropdown title="Documents" onSetDropdown={setIsViewd}>
                <div className="h-96 overflow-auto custom-scrollbar">
                    <FileUpload
                        name="Work Flow"
                        component={MyComponent}
                        onChange={(e: any) => {
                            onUploadDocument(e, DocumentType.WorkFlow)
                        }}
                    />
                    <FileUpload
                        name="Induction Process"
                        component={MyComponent}
                        onChange={(e: any) => {
                            onUploadDocument(e, DocumentType.InductionProcess)
                        }}
                        loading={
                            addDocumentResult.isLoading &&
                            selectedDoc === DocumentType.InductionProcess
                        }
                    />
                    <FileUpload
                        name="Placement Info"
                        component={MyComponent}
                        onChange={(e: any) => {
                            onUploadDocument(e, DocumentType.PlacementInfo)
                        }}
                        loading={
                            addDocumentResult.isLoading &&
                            selectedDoc === DocumentType.PlacementInfo
                        }
                    />
                    <FileUpload
                        name="Legal"
                        component={MyComponent}
                        onChange={(e: any) => {
                            onUploadDocument(e, DocumentType.Legal)
                        }}
                        loading={
                            addDocumentResult.isLoading &&
                            selectedDoc === DocumentType.Legal
                        }
                    />
                </div>
            </ContextBarDropdown>
        </div>
    )
}
