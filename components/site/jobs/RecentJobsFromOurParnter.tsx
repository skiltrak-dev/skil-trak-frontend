import { useNotification } from '@hooks'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RecentJobCard } from './RecentJobCard'

import { LoadingAnimation } from '@components/LoadingAnimation'
import { DisplayNotifications } from '@components/Notification'
import { TextInput } from '@components/inputs'
import { AdminApi, commonApi } from '@queries'
import Image from 'next/image'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { PuffLoader } from 'react-spinners'

export const RecentJobsFromOurParnter = () => {
    const { notification } = useNotification()
    const [isSubscriptionExpanded, setSubscriptionExpanded] = useState(false)
    const [showDelayedDiv, setShowDelayedDiv] = useState(true)
    const [email, setEmail] = useState('')
    const [subscribe, subscribeResult] = AdminApi.Subscribers.useSubscribe()
    const toggleSubscription = () => {
        setTimeout(() => {
            setShowDelayedDiv(false)
        }, 1000)
        setSubscriptionExpanded(!isSubscriptionExpanded)
    }
    // const [jobId, setJobId] = useState(null)
    const { data, isLoading, isError } = commonApi.useGetAllAdvertisedJobsQuery(
        {}
    )

    // subscribe onsubmit method
    const subscribeOnSubmit = () => {
        subscribe(email)
    }

    useEffect(() => {
        if (subscribeResult.isSuccess) {
            setEmail('')
            notification.info({
                title: 'User subscribed',
                description: `User "${subscribeResult?.data?.email}" has been subscribed`,
            })
        }
    }, [subscribeResult])

    return (
        <>
            <ShowErrorNotifications result={subscribeResult} />
            <div
                id="recent_jobs"
                className="bg-[#F4F4F4]  py-8 px-4 md:px-[140px] md:py-[72px]"
            >
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
                        <div
                            className={`grid grid-cols-1 md:grid-cols-4 gap-x-2 gap-y-2 md:gap-y-0 relative min-h-[340px]`}
                        >
                            {data?.data
                                ?.slice(0, 3)
                                .map((job: any, index: any) => {
                                    return (
                                        <div key={index} className={``}>
                                            <RecentJobCard
                                                key={job?.id}
                                                {...job}
                                            />
                                        </div>
                                    )
                                })}
                            <div
                                className={`bg-white rounded-lg p-4  z-40 shadow-lg border transition-all ease-linear duration-500  ${
                                    isSubscriptionExpanded
                                        ? 'w-full absolute top-0 right-0 md:min-h-[350px] h-full'
                                        : 'md:w-72 md:h-[340px] '
                                }`}
                            >
                                <div
                                    className={`flex flex-col gap-y-2 justify-center items-center  ${
                                        isSubscriptionExpanded &&
                                        'mt-36 md:mt-0'
                                    }`}
                                >
                                    <div
                                        className={`${
                                            isSubscriptionExpanded
                                                ? 'flex justify-center'
                                                : 'block'
                                        }`}
                                    >
                                        <Image
                                            src="/images/site/subscription-image.png"
                                            width={50}
                                            height={50}
                                            alt="Subscribe"
                                            className=""
                                        />
                                    </div>
                                    <div className="cursor-pointer">
                                        <h3 className="text-xl font-bold text-center mt-2">
                                            Get the latest updates right in your
                                            inbox!
                                        </h3>
                                        <p className="text-center text-base mt-2">
                                            Subscribe to get the latest updates
                                            on job openings in your industry
                                        </p>
                                    </div>
                                    <div
                                        className={`${
                                            isSubscriptionExpanded
                                                ? 'flex items-center justify-center'
                                                : 'hidden'
                                        } h-[37px]`}
                                    >
                                        <div className="mt-6 md:min-w-[20rem]">
                                            <TextInput
                                                placeholder="Enter your email"
                                                name="subscribe"
                                                value={email}
                                                onChange={(e: any) => {
                                                    setEmail(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <button
                                            onClick={subscribeOnSubmit}
                                            className="bg-orange-500 text-white px-4 flex justify-center items-center min-w-[120px] py-[7px] h-full rounded-r-lg z-20 -mt-1 -ml-2"
                                        >
                                            {subscribeResult.isLoading ? (
                                                <PuffLoader
                                                    size={10}
                                                    color="white"
                                                />
                                            ) : (
                                                'Subscribe'
                                            )}
                                        </button>
                                    </div>
                                    <div className="mt-6 flex justify-center">
                                        <button
                                            onClick={toggleSubscription}
                                            className={`${
                                                isSubscriptionExpanded
                                                    ? 'bg-red-500 hover:ring-2 hover:ring-offset-2 hover:ring-red-400 hover:transition-all hover:duration-500 hover:ease-in-out'
                                                    : 'bg-gradient-to-r from-[#ff8200] to-[#ffc343] hover:ring-2 hover:ring-offset-2 hover:ring-[#ffc343] hover:transition-all hover:duration-500 hover:ease-in-out'
                                            } text-white px-4 py-2 rounded-lg`}
                                        >
                                            {isSubscriptionExpanded
                                                ? 'Close'
                                                : 'Click here to subscribe'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`bg-white rounded-lg p-4 shadow-lg border w-full`}
                        >
                            <div className="flex justify-center">
                                <Image
                                    src="/images/site/subscription-image.png"
                                    width={50}
                                    height={50}
                                    alt="Subscribe"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-center mt-4">
                                Get the latest updates right in your inbox!
                            </h3>
                            <p className="text-center text-base mt-2">
                                Subscribe to get the latest updates on job
                                openings in your industry
                            </p>
                            <div className="flex items-center justify-center">
                                <div className="mt-6 md:min-w-[20rem]">
                                    <TextInput
                                        placeholder="Enter your email"
                                        name="subscribe"
                                        value={email}
                                        onChange={(e: any) => {
                                            e.preventDefault()
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={subscribeOnSubmit}
                                    className="bg-orange-400 hover:bg-orange-500 text-white px-2 py-1.5 rounded-r-lg z-20 -mt-1 -ml-2"
                                >
                                    {subscribeResult.isLoading ? (
                                        <PuffLoader />
                                    ) : (
                                        'Subscribe'
                                    )}
                                </button>
                            </div>
                        </div>
                        // <div className="border border-dashed rounded-md flex items-center justify-center flex-col p-12 gap-y-4 w-full">
                        //     <p className="text-lg text-slate-300 text-center">
                        //         We are sorry, but there are currently no job
                        //         openings posted by industries on our platform. We
                        //         understand that finding the right opportunity is
                        //         important, and we are actively working to bring you
                        //         new job listings as soon as they become available.
                        //     </p>
                        // </div>
                    )}
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-2 md:gap-y-0">
                    {RecentJobsData.map((job) => (
                        <RelatedJobCard key={job} {...job} />
                    ))}
                </div> */}
                </div>
                <DisplayNotifications />
            </div>
        </>
    )
}
