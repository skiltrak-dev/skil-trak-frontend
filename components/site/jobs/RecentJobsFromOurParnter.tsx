import { useState } from 'react'
import Link from 'next/link'
import { RecentJobCard } from './RecentJobCard'
import { RelatedJobCard } from './RelatedJobCard'

import { IndustryApi, commonApi } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { NoData } from '@components/ActionAnimations'

const RecentJobsData = [
    {
        id: 1,
        title: 'Job Title',
        avatar: '/images/site/partners/p14.png',
        industryName: 'Industry Name',
        address: 'Address Here',
        salaryFrom: '33',
        salaryTo: '35',
        description:
            'Our exciting, team-friendly centre is seeking an experienced (min 2yrs experience) Early Childhood ...',
        sectorName: 'Sector Name Goes here',
        viewJob: '#',
    },
    {
        id: 2,
        title: 'Job Title',
        avatar: '/images/site/partners/p14.png',
        industryName: 'Industry Name',
        address: 'Address Here',
        salaryFrom: '33',
        salaryTo: '35',
        description:
            'Our exciting, team-friendly centre is seeking an experienced (min 2yrs experience) Early Childhood ...',
        sectorName: 'Sector Name Goes here',
        viewJob: '#',
    },
    {
        id: 3,
        title: 'Job Title',
        avatar: '/images/site/partners/p14.png',
        industryName: 'Industry Name',
        address: 'Address Here',
        salaryFrom: '33',
        salaryTo: '35',
        description:
            'Our exciting, team-friendly centre is seeking an experienced (min 2yrs experience) Early Childhood ...',
        sectorName: 'Sector Name Goes here',
        viewJob: '#',
    },
    {
        id: 4,
        title: 'Job Title',
        avatar: '/images/site/partners/p14.png',
        industryName: 'Industry Name',
        address: 'Address Here',
        salaryFrom: '33',
        salaryTo: '35',
        description:
            'Our exciting, team-friendly centre is seeking an experienced (min 2yrs experience) Early Childhood ...',
        sectorName: 'Sector Name Goes here',
        viewJob: '#',
    },
]
export const RecentJobsFromOurParnter = () => {
    // const [jobId, setJobId] = useState(null)
    const { data, isLoading, isError } = commonApi.useGetAllAdvertisedJobsQuery(
        {}
    )
    return (
        <div className="bg-[#F4F4F4] py-8 px-4 md:px-[140px] md:py-[72px]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex md:flex-row flex-col gap-y-2 items-center justify-between">
                    <h2 className="font-bold md:text-4xl text-2xl text-center">
                        Recent Jobs From Our Partners
                    </h2>
                    <Link
                        className="text-blue-400 font-bold text-base"
                        href="/jobs"
                    >
                        View All Jobs
                    </Link>
                </div>
                {isLoading ? (
                    <LoadingAnimation />
                ) : data?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-2 gap-y-2 md:gap-y-0">
                        {data?.data?.slice(0, 4).map((job: any, index: any) => {

                            return (
                                <div key={index}>
                                    <RecentJobCard key={job?.id} {...job} />
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="border border-dashed rounded-md flex items-center justify-center flex-col p-12 gap-y-4 w-full">
                        <p className="text-lg text-slate-300 text-center">
                            We are sorry, but there are currently no job
                            openings posted by industries on our platform. We
                            understand that finding the right opportunity is
                            important, and we are actively working to bring you
                            new job listings as soon as they become available.
                        </p>
                    </div>
                )}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-2 md:gap-y-0">
                    {RecentJobsData.map((job) => (
                        <RelatedJobCard key={job} {...job} />
                    ))}
                </div> */}
            </div>
        </div>
    )
}
