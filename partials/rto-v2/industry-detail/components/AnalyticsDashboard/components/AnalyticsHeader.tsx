import { TrendingUp, Calendar, Download, ChevronRight } from 'lucide-react'
import { Button, Typography } from '@components'

export function AnalyticsHeader() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                    <Typography
                        variant="h2"
                        className="text-[#1A2332] font-bold"
                    >
                        Analytics Dashboard
                    </Typography>
                    <Typography
                        variant="body"
                        className="text-[#64748B] text-xs"
                    >
                        Real-time performance metrics
                    </Typography>
                </div>
            </div>
            {/* <div className="flex items-center gap-2">
                <Button variant="action">
                    <Calendar className="w-3.5 h-3.5" />
                    Last 30 days
                    <ChevronRight className="w-3 h-3" />
                </Button>
                <Button variant="primaryNew">
                    <Download className="w-3.5 h-3.5" />
                    Export
                </Button>
            </div> */}
        </div>
    )
}
