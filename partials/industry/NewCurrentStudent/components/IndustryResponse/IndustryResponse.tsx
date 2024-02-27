import { Card, Typography } from '@components'
import { StudentAssessmentsCourses } from '../StudentAssessmentsCourses'
import { StudentIndustryResponseCourses } from './StudentIndustryResponseCourses'

export const IndustryResponse = ({ profile }: { profile: any }) => {
    return (
        <>
            <Card noPadding fullHeight>
                <div className="h-[inherit] overflow-auto custom-scrollbar">
                    <div className="px-4  py-3.5 flex justify-between items-center border-b border-secondary-dark">
                        <Typography variant="label" semibold>
                            Student Industry Response
                        </Typography>
                    </div>

                    <div className="border-b border-secondary-dark">
                        <StudentIndustryResponseCourses profile={profile} />
                    </div>
                </div>
            </Card>
        </>
    )
}
