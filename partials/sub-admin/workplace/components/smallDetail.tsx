import React from 'react'
import { Typography } from '@components'

export const SmallDetail = ({
    currentQualification,
    haveDrivingLicense,
    currentWork,
    haveTransport,
}: any) => {
    return (
        <div className="mt-5">
            <div className="grid grid-cols-4 gap-x-3">
                <div>
                    <Typography variant={'small'} color={'text-gray-500'}>
                        Current Qualification
                    </Typography>
                    <Typography variant={'label'} color={'text-gray-700'}>
                        {currentQualification}
                    </Typography>
                </div>
                <div>
                    <Typography variant={'small'} color={'text-gray-500'}>
                        Current Work
                    </Typography>
                    <Typography variant={'label'} color={'text-gray-700'}>
                        {currentWork}
                    </Typography>
                </div>
                <div>
                    <Typography variant={'small'} color={'text-gray-500'}>
                        Have Driving License
                    </Typography>
                    <Typography variant={'label'} color={'text-gray-700'}>
                        {haveDrivingLicense ? 'Yes' : 'No'}
                    </Typography>
                </div>
                <div>
                    <Typography variant={'small'} color={'text-gray-500'}>
                        Have Transport
                    </Typography>
                    <Typography variant={'label'} color={'text-gray-700'}>
                        {haveTransport ? 'Yes' : 'No'}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
