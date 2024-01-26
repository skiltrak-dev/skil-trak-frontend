import { SiteLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement, useState } from 'react'
import { adminApi } from '@queries'
import { useRouter } from 'next/router'
import { LoadingAnimation, NoData, TechnicalError } from '@components'
import Image from 'next/image'
import moment from 'moment'
import { HeroSectionBlog } from '@partials/common/Blogs'
// Accordion Shadcn
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@radix-ui/react-accordion'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const BlogDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const blogId = router.query.slug as string
    const [activeKey, setActiveKey] = useState(null)
    const { data, isLoading, isFetching, isError } =
        adminApi.useGetBlogDetailQuery(blogId, {
            skip: !blogId,
        })

    return (
        <div className="">
            <HeroSectionBlog />
            <div className="md:p-10 p-0 mt-8 md:mt-0 mx-auto max-w-7xl">
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data ? (
                    <div className="rounded-xl shadow-md md:px-8 px-4 py-8 md:py-4">
                        <div className="md:h-[600px] h-[250px] w-full relative overflow-hidden rounded-xl">
                            <Image
                                src={data?.featuredImage}
                                alt="blog-card"
                                fill
                                sizes="100vw"
                                className="object-contain w-full"
                            />
                        </div>
                        <div className="flex items-center justify-between my-3">
                            <p className="text-slate-400 text-xs font-bold">
                                Published by : {data?.author}
                            </p>
                            <p className="text-slate-400 text-xs">
                                {moment(data?.createdAt).format('Do MMM YYYY')}
                            </p>
                        </div>
                        <h1 className="font-bold text-xl md:text-[40px] md:leading-10 uppercase my-2 md:my-10">
                            {data?.title}
                        </h1>
                        <div
                            className="blog-content block text-sm md:text-normal mr-0 md:mr-6 text-gray-600 leading-6"
                            dangerouslySetInnerHTML={{
                                __html: data?.content,
                            }}
                        />
                        {/* FAQ's */}
                        {data?.blogQuestions &&
                            data?.blogQuestions?.length > 0 && (
                                <div className="md:mt-20 mt-8">
                                    <h2 className="font-semibold text-xl md:text-3xl md:leading-10 uppercase my-2 md:my-4">
                                        FAQ's
                                    </h2>
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full flex flex-col gap-y-1 "
                                    >
                                        {data?.blogQuestions?.map(
                                            (faq: any, index: any) => {
                                                return (
                                                    <AccordionItem
                                                        key={index}
                                                        className="shadow-md px-5 py-4 w-full "
                                                        value={faq?.id}
                                                        onClick={() =>
                                                            setActiveKey(
                                                                (
                                                                    prevActiveKey
                                                                ) =>
                                                                    prevActiveKey ===
                                                                    faq.id
                                                                        ? null
                                                                        : faq.id
                                                            )
                                                        }
                                                    >
                                                        <AccordionTrigger className="mb-2 font-medium text-sm flex items-center justify-between w-full">
                                                            {faq?.question}
                                                            {activeKey ===
                                                            faq?.id ? (
                                                                <FaChevronUp />
                                                            ) : (
                                                                <FaChevronDown />
                                                            )}
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-sm text-gray-500">
                                                            {faq?.answer}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                )
                                            }
                                        )}
                                    </Accordion>
                                </div>
                            )}
                    </div>
                ) : (
                    !isError && <NoData text="No Data Found" />
                )}
            </div>
        </div>
    )
}

BlogDetail.getLayout = (page: ReactElement) => {
    return <SiteLayout title={'Blog'}>{page}</SiteLayout>
}

export default BlogDetail
