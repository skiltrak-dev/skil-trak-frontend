import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NoteTemplate } from '@partials'
import React, { ReactElement, useEffect } from 'react'

const NoteTemplatePage = () => {
    const navBar = useNavbar()

    useEffect(() => {
        navBar.setTitle('Notes Templates')
    }, [])
    return (
        <div className="p-4">
            <NoteTemplate />
        </div>
    )
}

NoteTemplatePage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default NoteTemplatePage
