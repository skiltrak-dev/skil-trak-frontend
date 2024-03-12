import { Avatar, InitialAvatar, StudentAvatar, Typography } from '@components'
import { SkillsTag } from './SkillsTag'
import { useMemo } from 'react'
import { getGender } from '@utils'
import Link from 'next/link'
import { AiFillEdit } from 'react-icons/ai'
import { useRouter } from 'next/router'

export const TalentPoolStudentProfile = ({ data }: any) => {
    const router = useRouter()
    const getSectors = useMemo(() => {
        return data?.student?.courses?.map((course: any) => course?.sector)
    }, [data])

    return (
        <div className=" bg-[#24556D] rounded-r-md rounded-l-md ">
            <div className="md:pl-8 md:pr-16 pb-5 px-4 flex flex-col md:flex-row md:justify-between md:items-center gap-x-2.5 w-full">
                {/* Col - 1 */}
                <div className="flex flex-col gap-y-5 mt-6 md:w-1/3">
                    <div className="flex items-center gap-x-5">
                        <div className="relative">
                            <StudentAvatar
                                imageUrl=""
                                name={`${data?.student?.user?.name}`}
                                gender={`${data?.student?.gender}`}
                            />
                            {router.pathname !==
                                '/portals/admin/talent-pool/[id]' && (
                                <div className="absolute top-0 right-0 bg-primary rounded-full p-2">
                                    <Link
                                        href={
                                            '/portals/student/talent-pool/edit-profile'
                                        }
                                    >
                                        <AiFillEdit className="text-white" />
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div>
                            <Typography variant="title" color="text-white">
                                {data?.student?.user?.name}
                            </Typography>
                            <div className="flex items-center gap-x-1.5">
                                <Typography variant="xs" color="text-white">
                                    Profile Status:
                                </Typography>
                                <Typography variant="small" color="text-white">
                                    {data?.status === 'approved'
                                        ? 'Approved'
                                        : 'N/A'}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    {/* Sector */}
                    <div className="bg-[#286788] rounded-md p-2.5">
                        <Typography variant="small" color="text-white">
                            Sector
                        </Typography>
                        {getSectors && getSectors.length > 0 ? (
                            <Typography variant="muted" color={'text-white'}>
                                {getSectors[0]?.name}
                            </Typography>
                        ) : (
                            <Typography variant="muted" color={'text-white'}>
                                No sectors found
                            </Typography>
                        )}
                    </div>
                </div>
                <div className="bg-[#286788] h-[1px] w-28 md:h-28 md:w-[1px] md:mx-8"></div>
                {/* Col - 2 */}
                <div className="md:w-1/3">
                    <div className="mt-4 mb-2">
                        <Typography variant="subtitle" color="text-white">
                            Personal Information
                        </Typography>
                    </div>
                    <div className="flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1.5 md:gap-x-1">
                            <div className="flex flex-col gap-y-1.5">
                                {/* Email */}
                                <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                                    <Typography
                                        variant="muted"
                                        color="text-white"
                                    >
                                        Email
                                    </Typography>
                                    <Typography variant="xs" color="text-white">
                                        {data?.student?.user?.email}
                                    </Typography>
                                </div>
                                {/* Phone */}
                                <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                                    <Typography
                                        variant="muted"
                                        color="text-white"
                                    >
                                        Phone Number
                                    </Typography>
                                    <Typography variant="xs" color="text-white">
                                        {data?.student?.phone}
                                    </Typography>
                                </div>
                                {/* Student Type */}
                                <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                                    <Typography
                                        variant="muted"
                                        color="text-white"
                                    >
                                        Student Type
                                    </Typography>
                                    <Typography variant="xs" color="text-white">
                                        {data?.student?.isInternational
                                            ? 'Domestic'
                                            : 'International'}
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-1.5">
                                {/* Age and Gender */}
                                <div className="flex flex-col md:flex-row gap-y-1.5 md:gap-x-1">
                                    {/* Age */}
                                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5 w-full">
                                        <Typography
                                            variant="muted"
                                            color="text-white"
                                        >
                                            Age Range
                                        </Typography>
                                        <Typography
                                            variant="xs"
                                            color="text-white"
                                        >
                                            {data?.student?.age}
                                        </Typography>
                                    </div>
                                    {/* Gender */}
                                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5 w-full">
                                        <Typography
                                            variant="muted"
                                            color="text-white"
                                        >
                                            Gender
                                        </Typography>
                                        <Typography
                                            variant="xs"
                                            color="text-white"
                                        >
                                            {getGender(data?.student?.gender)}
                                        </Typography>
                                    </div>
                                </div>
                                {/* Suburb */}
                                <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                                    <Typography
                                        variant="muted"
                                        color="text-white"
                                    >
                                        Suburbs
                                    </Typography>
                                    <Typography variant="xs" color="text-white">
                                        {data?.student?.suburb}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#286788] h-[1px] w-28 md:h-28 md:w-[1px] md:mx-8"></div>
                {/* col - 3 */}
                <div className="md:w-1/3">
                    {/* Academic Information */}
                    <div className="mt-4 mb-2">
                        <Typography variant="subtitle" color="text-white">
                            Academic Information
                        </Typography>
                    </div>
                    <div className="flex flex-col gap-y-1.5">
                        {/* College/Institute */}
                        <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                            <Typography variant="muted" color="text-white">
                                Institution/College Name
                            </Typography>
                            <Typography variant="xs" color="text-white">
                                {data?.student?.rto?.user?.name}
                            </Typography>
                        </div>
                        {/* Field of study */}
                        <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                            <Typography variant="small" color="text-white">
                                Field of Study
                            </Typography>

                            {getSectors && getSectors.length > 0 ? (
                                <Typography
                                    variant="muted"
                                    color={'text-white'}
                                >
                                    {getSectors[0]?.name}
                                </Typography>
                            ) : (
                                <Typography
                                    variant="muted"
                                    color={'text-white'}
                                >
                                    No sectors found
                                </Typography>
                            )}
                        </div>
                        {/* Expected Graduation Date */}
                        <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                            <Typography variant="muted" color="text-white">
                                Expected Graduation Date
                            </Typography>
                            <Typography variant="xs" color="text-white">
                                {data?.student?.expiryDate
                                    ?.toString()
                                    .slice(0, 10) || 'N/A'}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" bg-white md:pl-8 md:pr-16 pb-5 px-4 md:pt-5 pt-2.5">
                <div className="flex flex-col md:gap-y-0 gap-y-4 md:flex-row md:justify-between w-full">
                    <div className="md:w-1/3">
                        <Typography variant="label">About</Typography>
                        <Typography variant="small">{data?.about}</Typography>
                    </div>
                    <div className="bg-[#E6E6E6] md:h-[170px] w-[1px] mx-7 my-auto"></div>
                    <div className="flex flex-col gap-y-4">
                        <SkillsTag
                            title={'Skill & Talent'}
                            tags={data?.skills}
                        />
                        <div className="bg-[#E6E6E6] md:w-[427px] h-[1px]"></div>
                        <SkillsTag
                            title={'Portfolio/Links'}
                            tags={data?.socialLinks}
                        />
                    </div>
                    <div className="bg-[#E6E6E6] md:h-[170px] w-[1px] mx-8 my-auto"></div>
                    <div>
                        <SkillsTag
                            title={'Area of Interest'}
                            tags={data?.interest}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
