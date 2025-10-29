import { Card, Typography } from '@components'
import { Briefcase } from 'lucide-react'

export const WorkplaceDetailAndService = ({
    description,
}: {
    description: string
}) => {
    return (
        <Card className="border-2 border-primaryNew/30 shadow-md bg-gradient-to-br from-primaryNew/5 to-primaryNew/3 hover:shadow-lg transition-all">
            <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primaryNew/20 to-primaryNew/10 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-primaryNew" />
                    </div>
                    <Typography variant="label" bold className="mb-3 block">
                        Workplace Details & Services
                    </Typography>
                </div>
                <div className="bg-primaryNew/5 rounded-lg p-4 border border-primaryNew/10">
                    <p
                        className="text-sm text-foreground/90 leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    />
                </div>
            </div>
        </Card>
    )
}
