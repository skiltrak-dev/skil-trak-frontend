import { ReactElement, useEffect } from 'react'

import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { AdminApi } from '@queries'

// hooks
import { useContextBar, useNavbar } from '@hooks'
import {
    InductionProcess,
    Legal,
    PlacementInfo,
    Workflow,
} from '@partials/admin/documents'
import { DocumentType } from '@partials/admin/documents/componnets'

const Documents: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const navbar = useNavbar()

    const getDocuments = AdminApi.Documents.useGetDocuments()
    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
        navbar.setTitle('Documents')
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

    return (
        <>
            <Workflow workflow={data?.workflow} />
            <InductionProcess inductionProcess={data?.inductionProcess} />
            <PlacementInfo placementInfo={data?.placementInfo} />
            <Legal legal={data?.legal} />
        </>
    )
}

Documents.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Documents
