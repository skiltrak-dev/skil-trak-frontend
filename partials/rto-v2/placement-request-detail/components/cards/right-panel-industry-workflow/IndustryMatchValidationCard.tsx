import React from 'react'
import { needsWorkplaceStagesEnum } from '../../workplaceStages'
import { CheckCircle2 } from 'lucide-react'
import { Badge, Card } from '@components'
import { Progressbar } from '@partials/rto-v2/components'

export const IndustryMatchValidationCard = ({
    workplaceType,
    wpCurrentStatus,
}: any) => {
    return (
        <div>
            {' '}
            {((workplaceType === 'needs' &&
                wpCurrentStatus?.stage !==
                    needsWorkplaceStagesEnum.STUDENT_ADDED) ||
                (workplaceType === 'provided' &&
                    ![
                        needsWorkplaceStagesEnum.STUDENT_ADDED,
                        'Provided Workplace Request',
                    ].includes(wpCurrentStatus?.stage))) && (
                <Card
                    noPadding
                    className="border-0 shadow-2xl shadow-emerald-200/50 overflow-hidden hover:shadow-3xl transition-shadow duration-500"
                >
                    <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                        <div className="relative flex items-center gap-3 text-white">
                            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">
                                    Industry Match Validation
                                </h3>
                                <p className="text-white/90 text-sm mt-0.5">
                                    19 criteria automatically validated
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-slate-700">
                                Match Score
                            </span>
                            <Badge
                                text={'18/19 Criteria Met'}
                                className="bg-emerald-100 text-emerald-700 border-emerald-200"
                            ></Badge>
                        </div>
                        <Progressbar value={94.7} className="h-3" />
                        <p className="text-xs text-slate-500 mt-2">
                            Excellent match based on location, availability, and
                            learning objectives
                        </p>
                    </div>
                </Card>
            )}
        </div>
    )
}
