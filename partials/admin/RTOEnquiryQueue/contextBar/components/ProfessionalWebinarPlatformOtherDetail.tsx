import { Badge, Card } from '@components'
import { User } from 'lucide-react'
import React from 'react'
import { DetailViewCard } from '../cards'

export const ProfessionalWebinarPlatformOtherDetail = ({
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
                        title="Preferred Date"
                        description={enquiryDetails?.preferredDate}
                    />
                    <DetailViewCard
                        title="Accessibility"
                        description={enquiryDetails?.accessibility}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <DetailViewCard
                        title="Duration"
                        description={enquiryDetails?.duration}
                    />
                    <DetailViewCard
                        title="Expected Attendees"
                        description={enquiryDetails?.expectedAttendees}
                    />
                </div>

                {/*  */}
                <div className="grid grid-cols-2 gap-4">
                    <DetailViewCard
                        title="Learning Outcomes"
                        description={enquiryDetails?.learningOutcomes}
                    />
                    <DetailViewCard
                        title="Recording"
                        description={enquiryDetails?.recording
                            ?.split(',')
                            ?.map((rec: string) => (
                                <Badge key={rec} text={rec} variant="info" />
                            ))}
                    />
                </div>

                {/*  */}
                <div className="grid grid-cols-2 gap-4">
                    <DetailViewCard
                        title="Budget"
                        description={enquiryDetails?.budget}
                    />
                </div>
            </div>
        </Card>
    )
}
