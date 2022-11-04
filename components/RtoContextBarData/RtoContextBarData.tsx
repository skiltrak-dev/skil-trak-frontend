import { ImportantDocument, Typography } from '@components'

type Props = {}

export const RtoContextBarData = (props: Props) => {
    const data = [
        {
            title: 'Work Flow',
            description:
                'See all the requirements asked by RTO for your courses',
            imageUrl: '/#',
        },
        {
            title: 'Course Requirements',
            description:
                'See all the requirements asked by RTO for your courses',
            imageUrl: '/#',
        },
        {
            title: 'Induction Process',
            description: 'This document is about the flow of work we have here',
            imageUrl: '/#',
        },
        {
            title: 'Placement Info',
            description: 'This document is about the flow of work we have here',
            imageUrl: '/#',
        },
        {
            title: 'Legal',
            description: 'This document is about the flow of work we have here',
            imageUrl: '/#',
        },
    ]
    return (
        <div className="flex flex-col gap-y-1">
            <Typography variant="muted" color="text-gray-400">
                Important Documents
            </Typography>
            {data.map((item, index) => (
                <ImportantDocument
                    key={index}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                />
            ))}
        </div>
    )
}
