import { ReactElement, useEffect } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { AssessmentsTools, Button, SidebarCalendar } from '@components'
import { Typography } from '@components'
import { FaEdit } from 'react-icons/fa'
import { useContextBar } from '@hooks'

type Props = {}

const AssessmentTools: NextPageWithLayout = (props: Props) => {
    const { setContent } = useContextBar()
    useEffect(() => {
        setContent(
            <>
                <Button variant={'dark'} text={'My Schedule'} />
                <SidebarCalendar />
            </>
        )
    }, [setContent])
    const actions = () => {
        return (
            <div className="flex gap-x-2 ">
                <Typography variant="tableCell" color="text-blue-600">
                    Download
                </Typography>
            </div>
        )
    }
    return (
        <>
            <AssessmentsTools role={'Student'} actions={actions} />
        </>
    )
}
AssessmentTools.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Assessment Tools">{page}</StudentLayout>
}

export default AssessmentTools
