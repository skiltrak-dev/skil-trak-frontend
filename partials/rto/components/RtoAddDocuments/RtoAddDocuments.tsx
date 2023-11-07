// query
import { RtoApi } from '@queries'

// hooks
import { ShowErrorNotifications } from '@components'
import { UserRoles } from '@constants'
import {
    InductionProcess,
    Legal,
    PlacementInfo,
    Workflow,
} from '@partials/admin/documents'
import { DocumentType } from '@partials/admin/documents/componnets'
import { Rto } from '@types'

export const RtoAddDocuments = ({ rto }: { rto?: Rto }) => {
    console.log({ rto })
    const getDocuments = RtoApi.RtoDocument.useGetRtoDocuments(
        Number(rto?.user?.id)
    )
    const [addDocument, addDocumentResult] =
        RtoApi.RtoDocument.useAddRtoDocuments()

    console.log({ rto })

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
        values.append('userId', rto?.user?.id)

        addDocument(values)
    }

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
