import { Avatar, Button, StudentAvatar, Typography } from '@components'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const TalentPoolHiredProfileCard = ({ data }: any) => {
    const router = useRouter()
    return (
        <div className="bg-white shadow-lg rounded-lg pb-6">
            <div className="flex justify-end mb-5">
                <span className="bg-green-800 py-2 px-5 text-white text-sm rounded-tr-md">
                    Hired
                </span>
            </div>
            <div className="px-8">
                <div className="w-full h-full">
                    <StudentAvatar
                        imageUrl={``}
                        name={`${data?.student?.user?.name}`}
                        gender={`${data?.student?.gender}`}
                    />
                </div>
                <div className="mt-5 mb-3">
                    <div className="flex flex-col gap-y-1">
                        <Typography variant="title">
                            {data?.student?.user?.name}
                        </Typography>
                        <Typography variant="muted">
                            {data?.student?.user?.email}
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col gap-y-2.5">
                    <div>
                        <Typography variant="xs">Phone Number</Typography>
                        <Typography variant="small">+6125121451523</Typography>
                    </div>
                    <div>
                        <Typography variant="xs">Sector</Typography>
                        {data?.sector ? (
                            <Typography variant="muted">
                                {data?.sector?.name}
                            </Typography>
                        ) : (
                            <Typography variant="small">
                                No sectors found
                            </Typography>
                        )}
                    </div>
                    <div>
                        <Typography variant="xs">Courses</Typography>
                        <div className="ml-2">
                            {data?.sector?.courses?.map(
                                (course: any, index: number) => {
                                    return (
                                        <div
                                            key={course?.id}
                                            className="flex items-center gap-x-2 mb-1"
                                        >
                                            <div className='whitespace-nowrap'>
                                            <Typography variant="xs">
                                                {`${index + 1})`}
                                            </Typography>
                                            </div>
                                            <Typography variant="small">
                                                {`${course?.code} - ${course?.title} `}
                                            </Typography>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                    <div>
                        <Typography variant="small">Suburb</Typography>
                        <Typography variant="small">
                            {data?.student?.suburb || 'N/A'}
                        </Typography>
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <Button
                        variant="info"
                        text="View Profile"
                        onClick={() =>
                            router.push(
                                `/portals/industry/talent-pool/matching-profiles/${data?.id}`
                            )
                        }
                    />
                </div>
            </div>
        </div>
    )
}
