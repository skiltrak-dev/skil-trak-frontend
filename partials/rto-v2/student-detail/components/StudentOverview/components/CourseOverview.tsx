import { Badge, Button, LoadingAnimation, NoData } from '@components'
import { Course, Student } from '@types'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CourseCard } from '../card'
import { useCourseSelection } from '../hooks'
import { ViewAllCourseModal } from '../modal'

export const CourseOverview = () => {
    const [modalOpen, setModalOpen] = useState(false)

    const { studentCourses } = useCourseSelection()

    const selectedCourse = useSelector(
        (state: any) => state?.student?.selectedCourse
    )

    console.log({ selectedCourse })

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-4.5 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/30">
                        <BookOpen className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 flex items-center gap-2">
                            My Courses
                            <Badge
                                variant="primaryNew"
                                text="3 Active"
                                size="xs"
                                className="border border-[#044866]/20"
                            />
                        </h3>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Track your learning progress
                        </p>
                    </div>
                </div>
                <Button
                    outline
                    variant="secondary"
                    onClick={() => setModalOpen(true)}
                    className="border-slate-300 hover:border-[#044866] hover:text-[#044866] hover:bg-[#044866]/5 shadow-md hover:shadow-lg transition-all px-3.5 py-2 text-sm"
                >
                    View All Courses ({(studentCourses?.data?.length || 1) - 1}{' '}
                    more) <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
            </div>

            <ViewAllCourseModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                courses={studentCourses?.data || []}
                isLoading={studentCourses?.isLoading}
            />

            {studentCourses?.isError ? (
                <NoData isError text="There is some technical error!" />
            ) : null}

            {studentCourses?.isLoading ? (
                <div className="flex justify-center py-10">
                    <LoadingAnimation />
                </div>
            ) : studentCourses?.isSuccess &&
              studentCourses?.data &&
              studentCourses?.data?.length > 0 ? (
                <CourseCard selectedCourse={selectedCourse as Course} />
            ) : (
                studentCourses?.isSuccess && (
                    <NoData text="No Call Logs Found!" />
                )
            )}
        </div>
    )
}
