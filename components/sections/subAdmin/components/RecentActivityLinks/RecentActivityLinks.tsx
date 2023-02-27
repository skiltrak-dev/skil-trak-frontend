import { Typography } from '@components/Typography'

type Props = {
    title: string
    color: any
    bgColor: any
}

export const RecentActivityLinks = ({ title, color, bgColor }: Props) => {
    return (
        <div>
            <div
                className={`${bgColor} rounded-full px-2 text-center whitespace-nowrap`}
            >
                <Typography variant={'muted'} color={color}>
                    {title}
                </Typography>
            </div>
        </div>
    )
}
