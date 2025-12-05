import { Badge } from '@components'
import { Course } from '@types'
import React from 'react'

export const CourseCard = ({
    onClick,
    selectedCourse,
}: {
    onClick?: () => void
    selectedCourse: Course
}) => {
    return (
        <div
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            className="relative  bg-gradient-to-br from-[#044866]/5 via-[#0D5468]/5 to-[#F7A619]/5 rounded-2xl p-4 border border-[#044866]/20 shadow-inner"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#044866]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative">
                <div className="flex items-center gap-2 mb-3.5">
                    <h3 className="text-slate-900">{selectedCourse?.title}</h3>
                    <Badge
                        variant="primaryNew"
                        text="✓ Active"
                        size="xs"
                        className="border border-[#044866]/20 shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-3.5 text-sm text-slate-600">
                    <span className="bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/40">
                        {selectedCourse?.code}
                    </span>
                    {/* <span className="flex items-center gap-1">
                                <Target className="w-3.5 h-3.5 text-[#044866]" />
                                3 streams
                            </span> */}
                    <span className="text-slate-500">
                        {selectedCourse?.sector?.name}
                    </span>
                </div>
            </div>
        </div>
    )
}
