// import { ProgressStep } from '@components'
// import { PinnedNotes } from '@components/sections/subAdmin'

// import { Courses } from '../../components/Courses'
// import { MyRto } from '../../components/MyRto'
// import { MyWorkplace } from '../../components/MyWorkplace'

import { CommonApi } from '@queries'

//
import { CourseList, RecentAppointment } from '@partials/common'
import { SectorCard } from '@partials/admin/components'
import { NoData, Typography } from '@components'
import { AssessmentsEvidence } from './AssessmentsEvidence'
import { RequiredDocs } from './RequiredDocs'

type StudentsProfileOverviewProps = {
    student: any
}

const getSectors = (courses: any) => {
    if (!courses) return {}
    const sectors = {}
    courses.forEach((c: any) => {
        if ((sectors as any)[c.sector.name]) {
            ;(sectors as any)[c.sector.name].push(c)
        } else {
            ;(sectors as any)[c.sector.name] = []
            ;(sectors as any)[c.sector.name].push(c)
        }
    })
    return sectors
}

export const OverViewTab = ({ workplace }: { workplace: any }) => {
    const sectorsWithCourses = getSectors(workplace?.courses)

    return (
        <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <SectorCard
                    sector={{
                        ...workplace?.courses[0]?.sector,
                        courses: workplace?.courses,
                    }}
                />
            </div>
            <div className="my-6 border-t border-b">
                <Typography variant="title">Student Submissions</Typography>
                <AssessmentsEvidence
                    studentId={workplace?.student?.id}
                    studentUserId={workplace?.student?.user?.id}
                    courses={workplace?.courses}
                />
            </div>
            <div className="border-t pt-4">
                <Typography variant="title">
                    Student Industry Response
                </Typography>

                <RequiredDocs
                    studentId={workplace?.student?.id}
                    studentUserId={workplace?.student?.user?.id}
                    courses={workplace?.courses}
                />
            </div>
            <RecentAppointment
                userId={workplace?.student?.user?.id}
                link={'/portals/industry/students/appointments'}
            />
        </div>
    )
}
