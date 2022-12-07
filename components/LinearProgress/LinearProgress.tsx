import { Line } from 'rc-progress'

interface Props {
    percent: number
    strokeWidth?: number
    strokeColor?: string
}

export const LinearProgress = ({
    percent,
    strokeWidth,
    strokeColor,
}: Props) => {
    return (
        <Line
            percent={percent}
            strokeWidth={strokeWidth || 1}
            strokeColor={strokeColor || '#000000'}
        />
    )
}
