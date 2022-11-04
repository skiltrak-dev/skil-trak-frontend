import { Line } from 'rc-progress'

interface Props {
    percent: number
    strokeWidth?: number
}

export const LinearProgress = ({ percent, strokeWidth }: Props) => {
    return (
        <Line
            percent={percent}
            strokeWidth={strokeWidth || 1}
            strokeColor="#000000"
        />
    )
}
