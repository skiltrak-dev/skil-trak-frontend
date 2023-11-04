import { ReactElement, useEffect, useState } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { RtoApi } from '@queries'

// hooks
import { ShowErrorNotifications } from '@components'
import { useContextBar, useNavbar } from '@hooks'
import {
    InductionProcess,
    Legal,
    PlacementInfo,
    Workflow,
} from '@partials/admin/documents'
import {
    DocumentType,
    placementInfoData,
} from '@partials/admin/documents/componnets'
import { UserRoles } from '@constants'

const AddDocuments: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const navbar = useNavbar()

    const getDocuments = RtoApi.RtoDocument.useGetRtoDocuments()
    const [addDocument, addDocumentResult] =
        RtoApi.RtoDocument.useAddRtoDocuments()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
        navbar.setTitle('')
    }, [])

    const filterDocuments = (docType: string) =>
        getDocuments.data
            ?.filter((doc: any) => doc?.docType === docType)
            ?.map((doc: any) => ({ ...doc, for: 'rto' }))

    const data = {
        workflow: filterDocuments(DocumentType.WorkFlow),
        inductionProcess: filterDocuments(DocumentType.InductionProcess),
        placementInfo: filterDocuments(DocumentType.PlacementInfo),
        legal: filterDocuments(DocumentType.Legal),
    }

    const onAddDocument = (values: any) => {
        addDocument(values)
    }

    console.log({ addDocumentResult })

    const rtoDoc = (data: any) =>
        data?.filter((d: any) => d?.role === UserRoles.RTO)

    return (
        <>
            <ShowErrorNotifications result={addDocumentResult} />
            <Workflow
                loading={addDocumentResult.isLoading}
                workflow={data?.workflow}
                onAddDocument={(values: any) => {
                    onAddDocument(values)
                }}
                rtoDoc={rtoDoc}
            />
            <InductionProcess
                loading={addDocumentResult.isLoading}
                onAddDocument={(values: any) => {
                    onAddDocument(values)
                }}
                inductionProcess={data?.inductionProcess}
                rtoDoc={rtoDoc}
            />
            <PlacementInfo
                loading={addDocumentResult.isLoading}
                onAddDocument={(values: any) => {
                    onAddDocument(values)
                }}
                placementInfo={data?.placementInfo}
                rtoDoc={rtoDoc}
            />
            <Legal
                loading={addDocumentResult.isLoading}
                onAddDocument={(values: any) => {
                    onAddDocument(values)
                }}
                legal={data?.legal}
                rtoDoc={rtoDoc}
            />
        </>
    )
}

AddDocuments.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default AddDocuments
