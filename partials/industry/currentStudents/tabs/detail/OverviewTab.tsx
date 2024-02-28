import { Typography } from '@components'
import { SectorCard } from '@partials/admin/components'
import { RecentAppointment } from '@partials/common'
import { SmallDetail } from '../../components/SmallDetail'
import { ViewStudentProfileCB } from '../../contextBar'
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
            <ViewStudentProfileCB student={workplace?.student} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-7">
                <div>
                    <Typography>
                        <span className="font-semibold">Sector</span>
                    </Typography>
                    <SectorCard
                        sector={{
                            ...workplace?.courses[0]?.sector,
                            courses: workplace?.courses,
                        }}
                    />
                </div>
            </div>
            <div className="pt-5 border-t">
                <Typography variant="label">Student Availability</Typography>
                <SmallDetail
                    currentWork={workplace?.currentWork}
                    haveTransport={workplace?.haveTransport}
                    haveDrivingLicense={workplace?.haveDrivingLicense}
                    currentQualification={workplace?.currentQualification}
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
