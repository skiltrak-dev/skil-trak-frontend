import { Typography } from '@components'
import { ProgressView } from './ProgressView'
import { ProgressChart } from './ProgressChart'

export interface RtoProfileProgressTypes {
    title: string
    color: string
    percent: number
}

export const RtoProfileProgress = () => {
    const progressData: RtoProfileProgressTypes[] = [
        {
            title: 'Placement Started',
            color: '#34B53A',
            percent: 35,
        },
        {
            title: 'In Progress',
            color: '#4339F2',
            percent: 20,
        },
        {
            title: 'Agreement Pending',
            color: '#FF3A29',
            percent: 15,
        },
        {
            title: 'Appointments',
            color: '#02A0FC',
            percent: 15,
        },
        {
            title: 'Don’t Have Workplace',
            color: '#21516A',
            percent: 15,
        },
    ]

    return (
        <div>
            <Typography semibold center>
                <span className="text-[15px]">Progress</span>
            </Typography>
            <ProgressChart data={progressData} />
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                {progressData.map((progress, i) => (
                    <ProgressView key={i} progress={progress} />
                ))}
            </div>
        </div>
    )
}
