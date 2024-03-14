import { Typography } from '@components'
import { getGender } from '@utils'
import { useMemo } from 'react'

export const StudentInfoCard = ({ profile, getSectors }: any) => {
    // const getSectors = profile?.courses?.map((course: any) => course?.sector)
    return (
        <div>
            <div className="bg-[#EFF4FF] border rounded-md p-2.5 mb-5">
                <Typography variant="small">Sector</Typography>
                <Typography variant="muted">
                    {getSectors && getSectors.length > 0 ? (
                        <Typography variant="muted">
                            {getSectors[0]?.name}
                        </Typography>
                    ) : (
                        <Typography variant="muted">
                            No sectors found
                        </Typography>
                    )}
                </Typography>
            </div>
            <Typography variant="subtitle">Personal Information</Typography>
            <div className="flex flex-col gap-y-1.5 mt-3">
                {/* Name */}
                <div className="bg-[#EFF4FF] border rounded-md py-1.5 px-2.5">
                    <Typography variant="xs" color="text-[#374151]">
                        Name
                    </Typography>
                    <Typography variant="muted" color="text-[#374151]">
                        {profile?.user?.name}
                    </Typography>
                </div>
                {/* Email */}
                <div className="bg-[#EFF4FF] border rounded-md py-1.5 px-2.5">
                    <Typography variant="xs" color="text-[#374151]">
                        Email
                    </Typography>
                    <Typography variant="muted" color="text-[#374151]">
                        {profile?.user?.email}
                    </Typography>
                </div>
                {/* Phone Number */}
                <div className="bg-[#EFF4FF] border rounded-md py-1.5 px-2.5">
                    <Typography variant="xs" color="text-[#374151]">
                        Phone Number
                    </Typography>
                    <Typography variant="muted" color="text-[#374151]">
                        {profile?.phone}
                    </Typography>
                </div>
                {/* Age and Gender */}
                <div className="flex flex-col md:flex-row md:gap-x-1">
                    {/* Age */}
                    <div className="bg-[#EFF4FF] border rounded-md py-1.5 px-2.5 w-full">
                        <Typography variant="xs" color="text-[#374151]">
                            Age Range
                        </Typography>
                        <Typography variant="muted" color="text-[#374151]">
                            {profile?.age}
                        </Typography>
                    </div>
                    {/* Gender */}
                    <div className="bg-[#EFF4FF] border rounded-md py-1.5 px-2.5 w-full">
                        <Typography variant="xs" color="text-[#374151]">
                            Gender
                        </Typography>
                        <Typography variant="muted" color="text-[#374151]">
                            {profile?.gender
                                ? getGender(profile?.gender)
                                : 'N/A'}
                        </Typography>
                    </div>
                </div>
                {/* Suburb */}
                <div className="bg-[#EFF4FF] border rounded-md py-1.5 px-2.5">
                    <Typography variant="xs" color="text-[#374151]">
                        Suburbs
                    </Typography>
                    <Typography variant="muted" color="text-[#374151]">
                        {profile?.suburb}
                    </Typography>
                </div>
                {/* Student Type */}
                <div className="bg-[#EFF4FF] border rounded-md py-1.5 px-2.5">
                    <Typography variant="xs" color="text-[#374151]">
                        Student Type
                    </Typography>
                    <Typography variant="muted" color="text-[#374151]">
                        {!profile?.isInternational
                            ? 'Domestic'
                            : 'International'}
                    </Typography>
                </div>
            </div>
            {/* Academic Information */}
            <div className="mt-5">
                <Typography variant="subtitle">Academic Information</Typography>
            </div>
            <div className="flex flex-col gap-y-1.5 mt-3">
                {/* College/Institute */}
                <div className="bg-[#EFF4FF] border rounded-md py-1.5 px-2.5">
                    <Typography variant="xs" color="text-[#374151]">
                        Institution/College Name
                    </Typography>
                    <Typography variant="muted" color="text-[#374151]">
                        {profile?.rto?.user?.name}
                    </Typography>
                </div>
               
                {/* Expected Graduation Date */}
                <div className="bg-[#EFF4FF] border rounded-md py-1.5 px-2.5">
                    <Typography variant="xs" color="text-[#374151]">
                        Expected Graduation Date
                    </Typography>
                    <Typography variant="muted" color="text-[#374151]">
                        {profile?.expiryDate?.toString().slice(0, 10)}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
