import {
    InitialAvatar,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { RelatedJobCard } from '@components/site/jobs/RelatedJobCard'
import { NextPage } from 'next'
import { HiCurrencyDollar } from 'react-icons/hi2'
import { MdLocationOn } from 'react-icons/md'
//Queries
import { Footer3 } from '@components/site/Footer3'
import { Navbar2 } from '@components/site/navbar'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { useContextBar } from '@hooks'
import { ApplyJobModal } from '@components/site/jobs'

const JobDetail: NextPage = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [modal, setModal] = useState<ReactNode | null>(null)
    const [onClickId, setOnClickId] = useState(null)
    const router = useRouter()
    const { id } = router.query

    const contextBar = useContextBar()

    const jobDetail = CommonApi.Industries.getAdvertisedJobDetail(id, {
        skip: !id,
    })
    const { data, isLoading, isError } =
        CommonApi.Industries.getAllAdvertisedJobs({
            industry: jobDetail?.data?.job?.industry?.id,
        })
    const openJobId = jobDetail?.data?.job?.id

    const onCancelModal = () => setModal(null)

    const onApplyJobClicked = () => {
        setModal(
            <ApplyJobModal id={openJobId} onCancel={() => onCancelModal()} />
        )
    }
    return (
        <>
            {modal}
            <Navbar2 />
            <div className="md:px-[140px] md:py-[72px] px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex md:flex-row flex-col items-start gap-y-4 md:gap-x-12">
                        <div className="md:w-2/3">
                            <div className="flex flex-col gap-y-2">
                                <div className="flex flex-col gap-y-1 pt-1">
                                    {jobDetail?.isLoading ? (
                                        <LoadingAnimation />
                                    ) : jobDetail?.data?.job ? (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-x-2">
                                                        {jobDetail?.data?.job?.sectors
                                                            ?.slice(0, 2)
                                                            .map(
                                                                (
                                                                    sector: any,
                                                                    index: any
                                                                ) => (
                                                                    <span
                                                                        title={
                                                                            sector?.name
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="py-0.5 px-2 text-xs rounded-full border text-center text-blue-400 border-blue-400"
                                                                    >
                                                                        {sector
                                                                            ?.name
                                                                            .length <=
                                                                        12
                                                                            ? sector?.name
                                                                            : sector.name.substr(
                                                                                  0,
                                                                                  12
                                                                              ) +
                                                                                  '...' ||
                                                                              'N/A'}
                                                                    </span>
                                                                )
                                                            )}
                                                    </div>{' '}
                                                    <div>
                                                        <Typography variant="title">
                                                            {jobDetail?.data
                                                                ?.job?.title ||
                                                                'N/A'}
                                                        </Typography>
                                                    </div>
                                                    <div className="flex items-center flex-row gap-x-2">
                                                        <div>
                                                            {/* <Image
                                                        className="rounded-full"
                                                        src={
                                                            '/images/site/partners/p14.png'
                                                        }
                                                        alt="avatar"
                                                        width={40}
                                                        height={40}
                                                    /> */}
                                                            <InitialAvatar
                                                                name={
                                                                    jobDetail
                                                                        ?.data
                                                                        ?.job
                                                                        ?.industry
                                                                        ?.user
                                                                        ?.name ||
                                                                    'N/A'
                                                                }
                                                                imageUrl="#"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Typography variant="small">
                                                                {jobDetail?.data
                                                                    ?.job
                                                                    ?.industry
                                                                    ?.user
                                                                    ?.name ||
                                                                    'N/A'}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        onApplyJobClicked()
                                                    }
                                                    className="cursor-pointer hover:bg-blue-500 hover:transition-all rounded-lg text-xs md:text-base px-2 py-1 md:px-4 md:py-2 text-white bg-blue-400"
                                                >
                                                    Apply to this job
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-x-8">
                                                <div className="flex gap-x-2 items-center">
                                                    <div>
                                                        <MdLocationOn className="text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <Typography variant="small">
                                                            {jobDetail?.data
                                                                ?.job?.suburb ||
                                                                'N/A'}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className="flex gap-x-2 items-center">
                                                    <div>
                                                        <HiCurrencyDollar className="text-blue-400" />
                                                    </div>
                                                    <div className="flex items-center ">
                                                        <div>
                                                            <div className="flex items-center gap-x-2">
                                                                <strong>
                                                                    {jobDetail
                                                                        ?.data
                                                                        ?.job
                                                                        ?.salaryFrom ||
                                                                        'N/A'}
                                                                </strong>
                                                                <Typography
                                                                    variant="muted"
                                                                    color="text-gray-300"
                                                                >
                                                                    AUD
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                        <strong className="mx-2">
                                                            -
                                                        </strong>
                                                        <div>
                                                            <div className="flex items-center gap-x-2">
                                                                <strong>
                                                                    {jobDetail
                                                                        ?.data
                                                                        ?.job
                                                                        ?.salaryTo ||
                                                                        'N/A'}
                                                                </strong>
                                                                <Typography
                                                                    variant="muted"
                                                                    color="text-gray-300"
                                                                >
                                                                    AUD
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-[#C4C4C4] w-[114px] h-[1px] mx-auto mb-8 mt-2"></div>
                                            {/* Jobs Description */}
                                            <div className="flex flex-col gap-y-2">
                                                <Typography variant="subtitle">
                                                    Description:
                                                </Typography>
                                                <Typography variant="body">
                                                    {jobDetail?.data?.job
                                                        ?.description || 'N/A'}
                                                </Typography>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            Job Detail:
                                            <NoData
                                                text={'No Job detail found'}
                                            />
                                        </>
                                    )}
                                    {/* Divider */}
                                </div>
                            </div>
                        </div>
                        {/* Other Jobs From This Industry Right Sidebar */}
                        <div className="md:w-1/3">
                            Other Jobs From This Industry
                            <div className="flex flex-col gap-y-2">
                                {isLoading ? (
                                    <LoadingAnimation size={60} />
                                ) : data?.data?.length > 0 ? (
                                    data?.data
                                        .filter(
                                            (job: any) => job.id !== openJobId
                                        )
                                        .slice(0, 3)
                                        .map((job: any, index: any) => (
                                            <div
                                                key={index}
                                                onClick={() =>
                                                    router.push(
                                                        `/jobs/${job.id}`
                                                    )
                                                }
                                                className="cursor-pointer"
                                            >
                                                <RelatedJobCard
                                                    key={job?.id}
                                                    {...job}
                                                />
                                            </div>
                                        ))
                                ) : (
                                    <NoData text="No jobs found from this industry" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${
                            jobDetail?.data?.relatedJobs?.length > 0
                                ? 'block'
                                : 'hidden'
                        } mt-12`}
                    >
                        Related jobs
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {jobDetail?.isLoading ? (
                                <LoadingAnimation size={60} />
                            ) : jobDetail?.data?.relatedJobs?.length > 0 ? (
                                jobDetail?.data?.relatedJobs?.map(
                                    (job: any, index: any) => (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                router.push(`/jobs/${job?.id}`)
                                            }
                                            className="cursor-pointer"
                                        >
                                            <RelatedJobCard
                                                key={job?.id}
                                                {...job}
                                            />
                                        </div>
                                    )
                                )
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer3 />
        </>
    )
}

// export async function getStaticProps() {
//     return {
//         props: {
//             data: [],
//         },
//     }
// }

export default JobDetail
