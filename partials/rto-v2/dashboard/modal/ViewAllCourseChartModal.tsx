import { Badge } from '@components'
import { Course } from '@types'
import { GraduationCap } from 'lucide-react'
import { ViewProgressByCourseChart } from '../components'
import { RtoDashboardBaseModal } from './RtoDashboardBaseModal'

export const ViewAllCourseChartModal = ({
    onCancel,
    rtoCourses,
}: {
    rtoCourses: Course[]
    onCancel: () => void
}) => {
    const coursesData = [
        {
            color: {
                from: 'from-[#044866]',
                to: 'to-[#0D5468]',
                bg: 'bg-[#044866]',
            },
        },
        {
            color: {
                from: 'from-[#F7A619]',
                to: 'to-[#d98f15]',
                bg: 'bg-[#F7A619]',
            },
        },
        {
            color: {
                from: 'from-[#0D5468]',
                to: 'to-[#044866]',
                bg: 'bg-[#0D5468]',
            },
        },
        {
            color: {
                from: 'from-[#044866]',
                to: 'to-[#F7A619]',
                bg: 'bg-[#044866]',
            },
        },
        {
            color: {
                from: 'from-[#F7A619]',
                to: 'to-[#0D5468]',
                bg: 'bg-[#F7A619]',
            },
        },
    ]
    return (
        <RtoDashboardBaseModal
            onCancel={onCancel}
            title="All Courses Overview"
            titleBadge={`${rtoCourses?.length} Courses`}
            description="Individual performance metrics and analytics for each course"
        >
            <div className="space-y-3 p-3">
                {rtoCourses?.map((course, i) => (
                    <div>
                        <div
                            className={`relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br ${coursesData[i].color.from} ${coursesData[i].color.to} p-4 shadow-premium`}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="relative flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shrink-0">
                                        <GraduationCap className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-white mb-1">
                                            {course?.code}
                                        </h3>
                                        <p className="text-sm text-white/90">
                                            {course?.title}
                                        </p>
                                    </div>
                                </div>
                                <Badge
                                    text={`Course ${i + 1}`}
                                    className="bg-white/20 text-white border-white/30 backdrop-blur-md shrink-0"
                                />
                            </div>
                        </div>

                        {/*  */}
                        <ViewProgressByCourseChart
                            key={course?.id}
                            selectedCourse={course?.id}
                            showBullets={false}
                        />
                    </div>
                ))}
            </div>
            {/* <ViewProgressByCourseChart selectedCourse={selectedCourse} /> */}
        </RtoDashboardBaseModal>
    )
}
