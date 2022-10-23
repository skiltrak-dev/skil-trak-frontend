import { Typography } from '@components/Typography'

type Props = {}

export const AssessmentCourseCard = (props: Props) => {
    const assessmentCoursesData = [
        {
            courseName: 'Work Effectively As Cook',
            courseCode: 'SITHCCC020',
            coordinator: 'Julie Clark',
            status: 'Active',
        },
        {
            courseName: 'Coordinate Cooking Operations',
            courseCode: 'SITHKOP005',
            coordinator: 'Julie Clark',
            status: 'Not Active',
        },
    ]
    return (
        <>
            <div className="mb-3 grid grid-cols-3 gap-x-2">
                {assessmentCoursesData.map((course, index) => (
                    <div
                        key={index}
                        className={`${
                            course.status === 'Active'
                                ? 'bg-red-100'
                                : 'bg-white'
                        } rounded-lg border p-2 w-full`}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <Typography variant="xs" color="text-black">
                                    {course.courseCode}
                                </Typography>
                            </div>
                            <div
                                className={`${
                                    course.status === 'Active'
                                        ? 'bg-[#686DE0]'
                                        : 'bg-rose-400'
                                } px-1`}
                            >
                                <Typography variant="xs" color="text-white">
                                    {course.status}
                                </Typography>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Typography variant="label" color="text-black">
                                    {course.courseName}
                                </Typography>
                            </div>
                            <div className="">
                                <Typography
                                    variant="label"
                                    color="text-gray-400"
                                >
                                    {course.coordinator}
                                </Typography>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
