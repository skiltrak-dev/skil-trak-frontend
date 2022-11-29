import { ImportantDocument, Typography } from '@components'

type Props = {}

export const RtoContextBarData = (props: Props) => {
    const data = [
        {
            title: 'Work Flow',
            description:
                'See all the requirements asked by RTO for your courses',
            imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        },
        {
            title: 'Course Requirements',
            description:
                'See all the requirements asked by RTO for your courses',
            imageUrl: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdXJzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        },
        {
            title: 'Induction Process',
            description: 'This document is about the flow of work we have here',
            imageUrl: 'https://images.unsplash.com/photo-1624686713594-21157487be91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGluZHVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        },
        {
            title: 'Placement Info',
            description: 'This document is about the flow of work we have here',
            imageUrl: 'https://images.unsplash.com/photo-1548882097-ee1e4da9bc9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        },
        {
            title: 'Legal',
            description: 'This document is about the flow of work we have here',
            imageUrl: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGVnYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60s',
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
