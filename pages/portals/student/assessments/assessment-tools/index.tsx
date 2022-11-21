import { ReactElement, useEffect } from 'react'
// Layouts
import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
// Hooks
import { useContextBar } from '@hooks'
// Components
import { Button, SidebarCalendar, Typography } from '@components'
import { StudentAssessmentTools } from '@components/sections/student/AssessmentsContainer'

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
    const actions = (id:any) => {
        return (
            <div className="flex gap-x-2 ">
                <a href={`${process.env.NEXT_PUBLIC_END_POINT}/rtos/course/content/${id}`} target="blank" rel="noreferrer">
                    <Typography variant="tableCell" color="text-blue-600">
                        Download
                    </Typography>
                </a>
            </div>
        )
    }
    return (
        <>
            <StudentAssessmentTools role={'Student'} actions={actions} />
        </>
    )
}
AssessmentTools.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Assessment Tools">{page}</StudentLayout>
}

export default AssessmentTools
