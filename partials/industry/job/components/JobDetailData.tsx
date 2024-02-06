import React from 'react'

// components
import { Typography } from 'components'

export const JobDetailData = ({ data }: any) => {
    const employmentType = () => {
        switch (data?.employmentType) {
            case 'fullTime':
                return 'Full Time'
            case 'partTime':
                return 'Part Time'
            default:
                return 'Temporary & Casual'
        }
    }
    return (
        <>
            <div className="border-b border-secondary-dark pb-1">
                <Typography variant={'muted'} color={'gray'}>
                    Job Details
                </Typography>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-2 gap-y-4 py-4">
                {/* Job Title */}
                <div className="flex flex-col gap-y-1">
                    <Typography variant={'muted'} color={'gray'}>
                        Job Title
                    </Typography>
                    <Typography color={'black'}>{data?.title}</Typography>
                </div>

                {/* Employment Type */}
                <div className="flex flex-col gap-y-1">
                    <Typography variant={'muted'} color={'gray'}>
                        Employment Type
                    </Typography>
                    <Typography color={'black'}>{employmentType()}</Typography>
                </div>

                {/*  Salary */}
                <div className="flex flex-col gap-y-1">
                    <Typography variant={'muted'} color={'gray'}>
                        Salary From
                    </Typography>
                    <Typography color={'black'}>{data?.salaryFrom}</Typography>
                </div>

                <div className="flex flex-col gap-y-1">
                    <Typography variant={'muted'} color={'gray'}>
                        Salary To
                    </Typography>
                    <Typography color={'black'}>{data?.salaryTo}</Typography>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-y-1">
                    <Typography variant={'muted'} color={'gray'}>
                        Address 
                    </Typography>
                    <Typography color={'black'}>
                        {data?.addressLine1}
                    </Typography>
                </div>

                <div className="flex flex-col gap-y-1">
                    <Typography variant={'muted'} color={'gray'}>
                        Suburb
                    </Typography>
                    <Typography color={'black'}>{data?.suburb}</Typography>
                </div>
            </div>

            {/* Job Description */}
            <div className="flex flex-col gap-y-1">
                <Typography variant={'muted'} color={'gray'}>
                    Job Description
                </Typography>
                <Typography color={'black'}>{data?.description}</Typography>
            </div>

            {/* Employer Details */}
            <div className="border-b border-secondary-dark mt-4 pb-1">
                <Typography variant={'muted'} color={'gray'}>
                    Employer Details
                </Typography>
            </div>

            {/*  */}
            <div className="grid grid-cols-2 gap-y-4 py-4">
                {/*Contact Person */}
                <div className="flex flex-col gap-y-1">
                    <Typography variant={'muted'} color={'gray'}>
                        Contact Person
                    </Typography>
                    <Typography color={'black'}>
                        {data?.contactPerson}
                    </Typography>
                </div>
            </div>
        </>
    )
}
