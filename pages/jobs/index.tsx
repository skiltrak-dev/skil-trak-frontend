import { ReactElement, useState } from 'react'
// Components
import { NoData } from '@components'
import { RecentJobCard } from '@components/site/jobs/RecentJobCard'
// react icons
//Queries
//  site components
import { SiteLayout } from '@layouts'
import { PaginatedItems } from '@partials/common'
import { NextPageWithLayout } from '@types'

const Jobs: NextPageWithLayout = ({ data }: any) => {
    const [itemPerPage, setItemPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const [currentItems, setCurrentItems] = useState([])

    // const { data, isLoading, isError } = commonApi.useGetAllAdvertisedJobsQuery(
    //     { skip: itemPerPage * page - itemPerPage, limit: itemPerPage }
    // )
    return (
        <>
            {/* <Navbar2 /> */}
            <div className="md:px-[140px] md:py-[72px] px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* {isError && <TechnicalError />} */}
                    <h1 className="font-bold text-2xl md:text-4xl mb-4">
                        Jobs
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        {currentItems?.map((job: any) => (
                            <RecentJobCard key={job.id} {...job} />
                        ))}
                    </div>

                    <div className="flex items-center justify-end mb-4">
                        {data?.data && data.data.length > 0 && (
                            <div className="flex items-center justify-end gap-x-4">
                                <span className="text-gray-600 text-sm">
                                    results({data?.data?.length})
                                </span>
                                <PaginatedItems
                                    data={data?.data}
                                    itemsPerPage={12}
                                    setCurrentItems={setCurrentItems}
                                    url="/jobs"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Footer */}
            {/* <Footer3 /> */}
        </>
    )
}

Jobs.getLayout = (page: ReactElement) => {
    return <SiteLayout title={'Jobs'}>{page}</SiteLayout>
}

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/jobs/list`)
    const data = await res.json()
    if (!data) {
        return <NoData text="No Data" />
    }
    return {
        props: {
            data: data,
        },
        revalidate: 900,
    }
}

export default Jobs
