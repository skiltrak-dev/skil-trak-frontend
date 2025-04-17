import { ReactElement, useEffect } from 'react'

import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { AdminApi } from '@queries'

// hooks
import { useContextBar, useNavbar, useNotification } from '@hooks'
import {
    InductionProcess,
    Legal,
    PlacementInfo,
    Workflow,
} from '@partials/admin/documents'
import { DocumentType } from '@partials/admin/documents/componnets'
import { ShowErrorNotifications } from '@components'

const Documents: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const navbar = useNavbar()
    const { notification } = useNotification()

    const getDocuments = AdminApi.Documents.useGetDocuments()

    const [addDocument, addDocumentResult] = AdminApi.Documents.addDocuments()

    useEffect(() => {
        if (addDocumentResult.isSuccess) {
            notification.success({
                title: 'Document Added',
                description: 'Document Added Successfully',
            })
        }
    }, [addDocumentResult])

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
        navbar.setTitle('Documents')
        return () => {
            navbar.setTitle('')
        }
    }, [])

    const filterDocuments = (docType: string) => {
        return getDocuments.data?.filter((doc: any) => doc?.docType === docType)
    }

    const data = {
        workflow: filterDocuments(DocumentType.WorkFlow),
        inductionProcess: filterDocuments(DocumentType.InductionProcess),
        placementInfo: filterDocuments(DocumentType.PlacementInfo),
        legal: filterDocuments(DocumentType.Legal),
    }

    const onAddDocument = (values: any) => {
        addDocument(values)
    }

    return (
        <>
            <ShowErrorNotifications result={addDocumentResult} />
            <Workflow
                loading={addDocumentResult.isLoading}
                workflow={data?.workflow}
                onAddDocument={(values: any) => {
                    onAddDocument(values)
                }}
            />
            <InductionProcess
                loading={addDocumentResult.isLoading}
                onAddDocument={(values: any) => {
                    onAddDocument(values)
                }}
                inductionProcess={data?.inductionProcess}
            />
            <PlacementInfo
                loading={addDocumentResult.isLoading}
                onAddDocument={(values: any) => {
                    onAddDocument(values)
                }}
                placementInfo={data?.placementInfo}
            />
            <Legal
                loading={addDocumentResult.isLoading}
                onAddDocument={(values: any) => {
                    onAddDocument(values)
                }}
                legal={data?.legal}
            />
        </>
    )
}

Documents.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Documents
