import { TabNavigation, TabProps } from '@components'
import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { ResolutionPathLabel, StatusCheckLabelNotes } from '@partials'
import React, { ReactElement, useEffect } from 'react'

const NoteTemplatePage = () => {
    const navBar = useNavbar()

    useEffect(() => {
        navBar.setTitle('Notes Templates')
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Status Check Label Notes',
            href: {
                pathname: 'note-template',
                query: { tab: 'statusCheckLabelNotes', page: 1, pageSize: 50 },
            },

            element: <StatusCheckLabelNotes />,
        },
        {
            label: 'Resolution Path Label',
            href: {
                pathname: 'note-template',
                query: { tab: 'resolutionPathLabel', page: 1, pageSize: 50 },
            },

            element: <ResolutionPathLabel />,
        },
    ]
    return (
        <div className="p-4">
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div>{header}</div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}

NoteTemplatePage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default NoteTemplatePage
