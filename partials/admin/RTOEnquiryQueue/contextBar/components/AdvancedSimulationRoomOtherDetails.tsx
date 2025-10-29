import React from 'react'
import { DetailViewCard } from '../cards'
import { Badge, Card, Typography } from '@components'
import { User } from 'lucide-react'
import moment from 'moment'

export const AdvancedSimulationRoomOtherDetails = ({
    enquiryDetails,
}: {
    enquiryDetails: any
}) => {
    return (
        <Card className="!bg-[#F7A619]/5 border-[#F7A619]/30 !py-6">
            <div className="pb-3">
                <div className="flex items-center gap-2 text-[#F7A619] font-bold">
                    <User className="h-4 w-4" />
                    Other Details
                </div>
            </div>
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                    <DetailViewCard
                        title="Jurisdiction"
                        description={enquiryDetails?.jurisdiction}
                    />
                    <DetailViewCard
                        title="Student Count"
                        description={enquiryDetails?.studentCount}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <DetailViewCard
                        title="Type"
                        description={enquiryDetails?.type
                            ?.split(',')
                            ?.map((t: string) => (
                                <Badge key={t} text={t} variant="info" />
                            ))}
                    />
                    <div>
                        <Typography variant="small">Required Dates</Typography>
                        <div className="flex items-center gap-x-4">
                            <DetailViewCard
                                title="Start Date"
                                description={moment(
                                    enquiryDetails?.startDate
                                ).format('MMM DD, YYYY')}
                            />
                            <DetailViewCard
                                title="End Date"
                                description={moment(
                                    enquiryDetails?.endDate
                                ).format('MMM DD, YYYY')}
                            />
                        </div>
                    </div>
                </div>

                {/*  */}
                <div className="grid grid-cols-2 gap-4">
                    <DetailViewCard
                        title="Equipment / Setup Needed"
                        description={enquiryDetails?.equipment}
                    />
                    <DetailViewCard
                        title="Trainer/Assessor Attending"
                        description={enquiryDetails?.trainer}
                    />
                </div>

                {/*  */}
                <div className="grid grid-cols-2 gap-4">
                    <DetailViewCard
                        title="Summary of Requirements"
                        description={enquiryDetails?.summary}
                    />
                    <DetailViewCard
                        title="Accessibility or WHS Notess"
                        description={enquiryDetails?.accessibility}
                    />
                </div>
            </div>
        </Card>
    )
}
