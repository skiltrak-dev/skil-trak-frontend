import { Typography } from '@components/Typography'

interface DescriptiveInfoProps {
    Icon: any
    title: string
    description: string
}
export const DescriptiveInfo = ({
    Icon,
    title,
    description,
}: DescriptiveInfoProps) => {
    return (
        <div className="h-full flex flex-col justify-center">
            <div className="flex items-center gap-x-2 mb-1">
                <Icon className="text-gray" />
                <Typography variant={'muted'} color={'gray'}>
                    {title}
                </Typography>
            </div>
            <Typography>{description}</Typography>
        </div>
    )
}
