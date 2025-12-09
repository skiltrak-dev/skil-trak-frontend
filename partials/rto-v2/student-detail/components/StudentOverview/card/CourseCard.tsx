import { Badge } from '@components'
import { Course } from '@types'
import { cn } from '@utils'
import { Target } from 'lucide-react'
import React from 'react'

export const CourseCard = ({
    onClick,
    selectedCourse,
    isActive = false,
}: {
    isActive?: boolean
    onClick?: () => void
    selectedCourse: Course & { coursePrograms: number }
}) => {
    return (
        <div
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            className={cn(
                'relative bg-gradient-to-br from-[#044866]/5 via-[#0D5468]/5 to-[#F7A619]/5 rounded-2xl p-4 border border-[#044866]/20 shadow-inner',
                {
                    'bg-primaryNew': isActive,
                }
            )}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#044866]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative">
                <div className="flex items-center gap-2 mb-3.5">
                    <h3
                        className={cn('text-slate-900', {
                            'text-white': isActive,
                        })}
                    >
                        {selectedCourse?.title}
                    </h3>
                    <Badge
                        variant="primaryNew"
                        text="✓ Active"
                        size="xs"
                        className={cn('border border-[#044866]/20 shadow-sm', {
                            'border-white': isActive,
                        })}
                    />
                </div>
                <div className="flex items-center gap-3.5 text-sm text-slate-600">
                    <span
                        className={cn(
                            'bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/40',
                            {
                                '!bg-white': isActive,
                            }
                        )}
                    >
                        {selectedCourse?.code}
                    </span>
                    <span
                        className={cn('flex items-center gap-1', {
                            'text-white': isActive,
                        })}
                    >
                        <Target className="w-3.5 h-3.5 " />
                        {selectedCourse?.coursePrograms} streams (blocks)
                    </span>
                    <span
                        className={cn('text-slate-500', {
                            'text-white': isActive,
                        })}
                    >
                        {selectedCourse?.sector?.name}
                    </span>
                </div>
            </div>
        </div>
    )
}
