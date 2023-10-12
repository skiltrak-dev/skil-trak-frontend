import { ReactElement, useState } from 'react'
// Components
import {
    EmptyData,
    LoadingAnimation,
    NoData,
    PageSize,
    Paginate,
    Pagination,
    TechnicalError
} from '@components'
import { RecentJobCard } from '@components/site/jobs/RecentJobCard'
// react icons
//Queries
import { commonApi } from '@queries'
//  site components
import { Footer3 } from '@components/site/Footer3'
import { Navbar2 } from '@components/site/navbar'
import { SiteLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { NextPage } from 'next'

const Jobs: NextPageWithLayout = () => {
    const [itemPerPage, setItemPerPage] = useState(10)
    const [page, setPage] = useState(1)

    const { data, isLoading, isError } = commonApi.useGetAllAdvertisedJobsQuery(
        { skip: itemPerPage * page - itemPerPage, limit: itemPerPage }
    )

    return (
        <>
            <Navbar2 />
            <div className="md:px-[140px] md:py-[72px] px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* {isError && <TechnicalError />} */}
                    {isLoading ? (
                        <LoadingAnimation />
                    ) : data?.data?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                            {data?.data?.map((job: any) => (
                                <RecentJobCard key={job.id} {...job} />
                            ))}
                        </div>
                    ) : (
                        <EmptyData
                            description="There is no jobs posted yet"
                            title="No jobs found"
                        />
                    )}

                    <div className="flex items-center justify-end mb-4">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            records={data?.data?.length}
                        />
                        <Pagination
                            pagination={data?.pagination}
                            setPage={setPage}
                        />
                        
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer3 />
        </>
    )
}

Jobs.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default Jobs
