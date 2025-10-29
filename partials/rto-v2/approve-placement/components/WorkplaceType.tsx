import { Badge, Card } from '@components'
import { Briefcase, Building2, MapPin } from 'lucide-react'
import React from 'react'
import { Industry } from '@types'

export const WorkplaceType = ({ industry }: { industry: Industry }) => {
    return (
        <Card className="border-2 border-primaryNew/20 shadow-lg hover:shadow-xl transition-all">
            <div className="p-5">
                <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primaryNew to-primaryNew/80 flex items-center justify-center shrink-0">
                        <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 space-y-3">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1.5">
                                Workplace Type
                            </p>
                            <Badge
                                Icon={Briefcase}
                                text={industry?.workplaceType?.name}
                                variant="primaryNew"
                                shape="pill"
                            />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1.5">
                                Full Address
                            </p>
                            <p className="text-sm font-semibold text-foreground flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-primaryNew mt-0.5 shrink-0" />
                                {industry?.addressLine1}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
