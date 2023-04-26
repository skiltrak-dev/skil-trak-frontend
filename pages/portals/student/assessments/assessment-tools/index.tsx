import { ReactElement, useEffect } from 'react'
// Layouts
import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
// Hooks
import { useContextBar } from '@hooks'
// Components
import { Button, SidebarCalendar, Typography } from '@components'
import { StudentAssessmentTools } from '@components/sections/student/AssessmentsContainer'
import Link from 'next/link'

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
    const actions = (assessment: any) => {
        return (
            <div className="flex gap-x-2 ">
                <Link
                    className="cursor-pointer"
                    href={`${
                        process.env.NEXT_PUBLIC_END_POINT
                    }/shared/assessment-tool/download/${Number(
                        assessment?.id
                    )}`}
                    download
                    referrerPolicy="no-referrer"
                    target="_blank"
                >
                    <Typography variant="tableCell" color="text-blue-600">
                        Download
                    </Typography>
                </Link>
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
    return (
        <StudentLayout pageTitle={{ title: 'Assessment Tools' }}>
            {page}
        </StudentLayout>
    )
}

export default AssessmentTools
