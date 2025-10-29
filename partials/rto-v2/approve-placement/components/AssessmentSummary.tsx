import { Card, Typography } from '@components'
import { Course } from '@types'
import { FileText } from 'lucide-react'

export const AssessmentSummary = ({ course }: { course: Course }) => {
    return (
        <Card className="border-2 border-border/60 shadow-md bg-gradient-to-br from-primaryNew/3 to-primaryNew/1">
            <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primaryNew/10 to-primaryNew/5 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primaryNew" />
                    </div>
                    <Typography variant="label" bold className="mb-3 block">
                        Assessment Summary
                    </Typography>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed pl-13">
                    The workplace has been assessed and approved for suitability
                    for the{' '}
                    <strong>
                        {course?.title}-{course?.code}
                    </strong>{' '}
                    following direct industry contact.
                </p>
            </div>
        </Card>
    )
}
