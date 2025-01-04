import { draftToHtmlText } from '@components'
import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NoteTemplateForm } from '@partials'
import React, { ReactElement, useEffect } from 'react'
import { AdminApi } from '@queries'

const AddNoteTemplate = () => {
    const navBar = useNavbar()

    const [add, addResult] = AdminApi.NotesTemplates.addNoteTemplate()

    useEffect(() => {
        navBar.setTitle('Add Notes Templates')
    }, [])

    const onSubmit = (data: any) => {
        let content = ''
        if (data?.content) {
            content = draftToHtmlText(data?.content)
        }
        const formData = new FormData()
        const { attachment, subject, ...rest } = data
        Object.entries(rest)?.forEach(([key, value]: any) => {
            formData.append(key, value)
        })
        attachment &&
            attachment?.length > 0 &&
            attachment?.forEach((attached: File) => {
                formData.append('attachment', attached)
            })
        formData.append('subject', subject)
        formData.append('content', content)

        // createNewDraft(formData)
    }
    return (
        <div className="p-4">
            <NoteTemplateForm onSubmit={onSubmit} result={addResult} />
        </div>
    )
}

AddNoteTemplate.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AddNoteTemplate
