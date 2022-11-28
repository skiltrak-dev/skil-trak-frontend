import { Typography } from '@components'
import { Packages } from '@types'
import { BsFillCheckCircleFill } from 'react-icons/bs'

export const PackageView = ({ pkg }: { pkg: Packages }) => {
    return (
        <div className="w-full">
            <Typography variant={'label'} color={'text-gray-400'}>
                {pkg?.name}
            </Typography>
            <div className="flex items-center justify-between">
                <Typography variant={'subtitle'}>
                    {pkg?.name}
                </Typography>
                <p className="capitalize text-xs font-medium">
                    {pkg?.billingType}
                </p>
            </div>
            <div className="flex flex-col gap-y-1.5 mt-4">
                {pkg?.description?.split(',')?.map((option) => (
                    <div key={option} className="flex items-center gap-x-2">
                        <BsFillCheckCircleFill className="text-info" />
                        <p className="text-sm text-gray-700">{option}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
