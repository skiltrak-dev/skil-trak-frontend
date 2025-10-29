import { Button } from '@components'
import {
    User,
    Eye,
    Clock,
    FileCheck,
    ExternalLink,
    CheckCircle2,
} from 'lucide-react'
import React from 'react'
import { InfoCard } from '../card'
import { PlacementApproval } from '../PendingPlacement'
import { DocumentsView } from '@hooks'

export const InfoCardsData = ({
    courseInfo,
    supervisor,
}: {
    supervisor: any
    courseInfo: any
}) => {
    console.log({ courseInfo })
    const { documentsViewModal, onFileClicked } = DocumentsView()

    const infoCardsData = [
        {
            Icon: Clock,
            title: 'Required Hours',
            description: `${courseInfo?.course?.hours} h`,
        },
        {
            Icon: User,
            title: 'Supervisor',
            description: supervisor?.name,
        },
        {
            Icon: FileCheck,
            title: 'Checklist',
            StatusIcon: CheckCircle2,
            description: (
                <Button
                    className="h-8 px-3 text-xs !text-success hover:text-success hover:bg-success/20 font-semibold -ml-3 bg-transparent shadow-none"
                    onClick={() =>
                        onFileClicked({
                            file: courseInfo?.file,
                            extension: courseInfo?.file
                                ?.split('.')
                                ?.reverse()[0],
                            type: 'all',
                        })
                    }
                >
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    View
                </Button>
            ),
        },
        {
            Icon: ExternalLink,
            title: 'Website',
            description: (
                <a
                    href={courseInfo?.reference?.[0] || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primaryNew hover:underline flex items-center gap-1.5 font-semibold"
                >
                    Visit <ExternalLink className="h-3.5 w-3.5" />
                </a>
            ),
        },
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {documentsViewModal}
            {infoCardsData?.map((card, index) => (
                <InfoCard
                    key={index}
                    Icon={card?.Icon}
                    title={card?.title}
                    description={card?.description}
                    StatusIcon={card?.StatusIcon}
                />
            ))}
        </div>
    )
}
