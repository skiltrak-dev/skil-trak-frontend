import { ReactElement, useEffect } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query

// hooks
import { useContextBar, useNavbar } from '@hooks'
import { RtoAddDocuments } from '@partials/rto/components'

const AddDocuments: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const navBar = useNavbar()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
        navBar.setTitle('')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    return <RtoAddDocuments />
}

AddDocuments.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default AddDocuments
