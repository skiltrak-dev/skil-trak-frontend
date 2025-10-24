import { Badge, Checkbox, Typography } from '@components'
import { Course, Rto } from '@types'
import { getSectors } from '@utils'
import { X } from 'lucide-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const AvailableServiceCourseForm = ({ rto }: { rto: Rto }) => {
    const formContext = useFormContext()

    const coursesBySectors = getSectors(rto?.courses)

    const selectedCourses = formContext.watch('courses')
    return (
        <div className="space-y-2">
            <Typography variant="small">
                Program(s)/Course(s) Impacted{' '}
                <span className="text-destructive">*</span>
            </Typography>
            <div className="border rounded-xl p-4 max-h-60 overflow-y-auto bg-gray-50 space-y-3">
                {Object.entries(coursesBySectors)?.map(
                    ([sector, courses]: [string, Course[]]) => (
                        <div key={sector}>
                            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                                {sector}
                            </p>
                            <div className="space-y-2">
                                {courses.map((course) => (
                                    <div
                                        key={course.code}
                                        className="flex items-start space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <Checkbox
                                            id={course.code}
                                            value={course?.id}
                                            label={`${course?.code} - ${course?.title}`}
                                            showError={false}
                                            name={'courses'}
                                            className="mt-0.5"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
            {selectedCourses?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {rto?.courses
                        ?.filter((r) =>
                            selectedCourses?.includes(String(r?.id))
                        )
                        ?.map((code: Course) => (
                            <Badge
                                text={code?.code}
                                key={code?.code}
                                variant="secondary"
                                className="text-xs px-2 py-0.5"
                                Icon={() => <X className="h-3 w-3" />}
                            />
                        ))}
                </div>
            )}
        </div>
    )
}
