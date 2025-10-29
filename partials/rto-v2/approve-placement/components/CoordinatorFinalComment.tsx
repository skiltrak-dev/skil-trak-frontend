import { Card, Typography } from '@components'
import { MessageSquare } from 'lucide-react'

export const CoordinatorFinalComment = ({
    hodComment,
}: {
    hodComment: string
}) => {
    return (
        <Card className="relative overflow-hidden border-2 border-primaryNew/40 shadow-xl bg-gradient-to-br from-primaryNew/5 via-primaryNew/4 to-success/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primaryNew/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="p-6 relative">
                <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primaryNew to-primaryNew/80 flex items-center justify-center shadow-lg shrink-0">
                        <MessageSquare className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <Typography variant="label" bold className="mb-3 block">
                            Coordinator Final Approval Comment
                        </Typography>
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border-l-4 border-primaryNew shadow-md">
                            <p className="text-sm text-foreground italic leading-relaxed">
                                "{hodComment}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
