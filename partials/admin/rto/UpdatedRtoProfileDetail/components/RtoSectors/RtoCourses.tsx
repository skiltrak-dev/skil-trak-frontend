import { Typography } from '@components'
import { Course } from '@types'
import { RtoWorkplaceTypes } from './RtoWorkplaceTypes'

export const RtoCourses = ({
    sector,
    userId,
    courses,
}: {
    userId: number
    sector: string
    courses: Course[]
}) => {
    return (
        <div className="border border-primaryNew rounded-md overflow-hidden">
            <div className={'bg-primaryNew px-3.5 py-4'}>
                <Typography variant="label" color="text-white">
                    {sector}
                </Typography>
            </div>
            {courses?.map((course: Course, i: number) => {
                return (
                    <div
                        className={`px-2.5 py-2.5 flex justify-between items-center gap-x-2 ${
                            i !== courses?.length - 1
                                ? 'border-b border-primaryNew'
                                : ''
                        }`}
                    >
                        <div>
                            <Typography variant="small" medium>
                                Course
                            </Typography>
                            <Typography variant="small" normal>
                                {course?.code} - {course?.title}
                            </Typography>
                        </div>
                        <RtoWorkplaceTypes
                            userId={userId}
                            courseId={course?.id}
                            workplaceTypes={course?.workplaceTypes}
                        />
                    </div>
                )
            })}
        </div>
    )
}
