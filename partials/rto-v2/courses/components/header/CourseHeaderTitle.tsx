import { Badge } from '@components/ui/badge'
import { Building2, GraduationCap } from 'lucide-react'
import React from 'react'

export const CourseHeaderTitle = ({ course }: any) => {
    return (
        <div className="flex items-start gap-4 flex-1">
            <div className="relative shrink-0">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primaryNew to-[#0d5468] flex items-center justify-center shadow-lg">
                    <GraduationCap className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="text-xl font-semibold mb-2 leading-tight">
                    {course?.title ?? "NA"}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">
                        {course?.code ?? "NA"}

                    </Badge>
                    <Badge variant="default" className="text-xs px-2 py-0.5">
                        <Building2 className="h-3 w-3 mr-1" />
                        {course?.sector?.name || "NA"}
                    </Badge>
                </div>
            </div>
        </div>
    )
}
