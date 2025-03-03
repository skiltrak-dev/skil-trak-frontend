import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'

import {
    Accordion,
    LoadingAnimation,
    NoData,
    TechnicalError,
} from '@components'
import { SiteLayout } from '@layouts'
import { HeroSectionBlog } from '@partials/common/Blogs'
import { NextPageWithLayout } from '@types'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
// Accordion Shadcn
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
import dynamic from 'next/dynamic'
// } from '@radix-ui/react-accordion'
import { ellipsisText } from '@utils'
import { CommonApi } from '@queries'

const FacebookShare = dynamic<any>(
    () => import('react-share-kit').then((mod) => mod.FacebookShare),
    { ssr: false }
)
const LinkedinShare = dynamic<any>(
    () => import('react-share-kit').then((mod) => mod.LinkedinShare),
    { ssr: false }
)
const PinterestShare = dynamic<any>(
    () => import('react-share-kit').then((mod) => mod.PinterestShare),
    { ssr: false }
)
const TwitterShare = dynamic<any>(
    () => import('react-share-kit').then((mod) => mod.TwitterShare),
    { ssr: false }
)

const BlogDetail: NextPageWithLayout = ({ blogData }: any) => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

    const router = useRouter()
    const slugUrl = router.query.slug

    // const blogData = CommonApi.Website.useGetSingleBlog(slugUrl, {
    //     skip: !slugUrl,
    // })

    const handleToggle = (index: number) => {
        if (activeAccordion === index) {
            setActiveAccordion(null) // Close the accordion if it's already open
        } else {
            setActiveAccordion(index)
        }
    }

    const shareUrl = `https://www.skiltrak.com.au/blogs/${router.query.slug}`

    const canonicalSlugs = [
        'how-registered-training-organisations-rtos-can-ensure-compliance-durin',
        'student-placement-unveiled-a-blueprint-for-career-excellence-with-skiltrak',
        'how-can-we-find-the-best-work-placement-for-community-services',
        'how-to-find-commercial-cookery-work-placements-in-australia',
        'find-the-best-disability-course-placement-in-australia',
    ]

    const shouldHaveCanonicalTag = canonicalSlugs.includes(
        router?.query?.slug + ''
    )

    return (
        <div className="">
            <Head>
                <title>{ellipsisText(blogData?.title, 11)}</title>
                <meta
                    name="description"
                    content={`${
                        blogData?.metaData ||
                        'Skiltrak, we are specialized in student placement'
                    }`}
                    key="desc"
                />
                {shouldHaveCanonicalTag && (
                    <link rel="canonical" href={shareUrl} key="canonical" />
                )}
            </Head>
            {/* {blogData?.error && <TechnicalError />}
            {blogData.isLoading ? (
                <LoadingAnimation />
            ) : blogData ? ( */}{' '}
            <HeroSectionBlog />
            <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
                <div className="rounded-xl md:px-8 px-4 py-8 md:py-4 bg-white">
                    <div className="relative h-[300px] md:h-[500px] w-full">
                        <Image
                            src={
                                blogData?.featuredImage ||
                                '/images/blogs/blog.jpg'
                            }
                            alt={blogData?.title}
                            fill
                            sizes="100vw"
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="flex items-center space-x-4 my-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">
                                    {blogData?.author?.[0]?.toUpperCase()}
                                </span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                    {blogData?.author}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {moment(blogData?.updatedAt).format(
                                        'MMMM DD, YYYY'
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                        {blogData?.title}
                    </h1>
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="blog-content text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: blogData?.content || '',
                            }}
                        />
                    </div>
                    {/* Social Share */}
                    <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col justify-center items-end">
                        <p className="text-sm text-gray-600 mb-3">
                            Share this article
                        </p>
                        <div className="flex space-x-2">
                            <FacebookShare
                                url={shareUrl}
                                quote={blogData?.title}
                                round
                                size={36}
                            />
                            <LinkedinShare
                                url={shareUrl}
                                // quote={blogData?.title}
                                round
                                size={36}
                            />
                            <PinterestShare
                                url={shareUrl}
                                media={
                                    blogData?.featuredImage ||
                                    '/images/blogs/blog.jpg'
                                }
                                round
                                size={36}
                            />
                            <TwitterShare
                                url={shareUrl}
                                title={blogData?.title}
                                round
                                size={36}
                            />
                        </div>
                    </div>

                    {blogData?.blogQuestions &&
                        blogData?.blogQuestions?.length > 0 && (
                            <div className="md:mt-20 mt-8">
                                <h2 className="font-semibold text-xl md:text-3xl md:leading-10 uppercase my-2 md:my-4">
                                    FAQ's
                                </h2>
                                <div
                                    // type="single"
                                    // collapsible
                                    className="w-full flex flex-col "
                                >
                                    {blogData?.blogQuestions?.map(
                                        (faq: any, index: any) => {
                                            return (
                                                <div key={faq?.id}>
                                                    <Accordion
                                                        question={faq?.question}
                                                        answer={faq?.answer}
                                                        index={index + 1}
                                                        isOpen={
                                                            activeAccordion ===
                                                            index + 1
                                                        }
                                                        onToggle={() =>
                                                            handleToggle(
                                                                index + 1
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                </div>
            </main>
        </div>
    )
}

BlogDetail.getLayout = (page: ReactElement) => {
    return <SiteLayout title={'Blog'}>{page}</SiteLayout>
}

export async function getStaticPaths() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_END_POINT}/blogs/site`
        )
        const blogs = await res.json()

        const paths = blogs.map((blog: any) => ({
            params: { slug: blog.slug },
        }))

        return {
            paths,
            fallback: true, // Change to true instead of 'blocking'
        }
    } catch (error) {
        return {
            paths: [],
            fallback: true,
        }
    }
}

export async function getStaticProps(context: any) {
    const { params } = context

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_END_POINT}/blogs/slug/${params?.slug}`
    )
    const blogData = await res.json()

    if (!blogData) {
        return <NoData text="No Data" />
    }

    return {
        props: {
            blogData,
        },
        revalidate: 60,
    }
}

export default BlogDetail
