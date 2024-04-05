import { SiteLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement, useState } from 'react'
import { adminApi } from '@queries'
import { useRouter } from 'next/router'
import {
    LoadingAnimation,
    NoData,
    TechnicalError,
    Accordion,
} from '@components'
import Image from 'next/image'
import moment from 'moment'
import { HeroSectionBlog } from '@partials/common/Blogs'
// Accordion Shadcn
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from '@radix-ui/react-accordion'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const BlogDetail: NextPageWithLayout = ({ blogData }: any) => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

    const handleToggle = (index: number) => {
        if (activeAccordion === index) {
            setActiveAccordion(null) // Close the accordion if it's already open
        } else {
            setActiveAccordion(index)
        }
    }
    const router = useRouter()
    const blogId = router.query?.slug as string
    const [activeKey, setActiveKey] = useState(null)
    // const { data, isLoading, isFetching, isError } =
    //     adminApi.useGetBlogDetailQuery(blogId, {
    //         skip: !blogId,
    //     })

    return (
        <div className="">
            <HeroSectionBlog />
            <div className="md:p-10 p-0 mt-8 md:mt-0 mx-auto max-w-7xl">
                <div className="rounded-xl md:px-8 px-4 py-8 md:py-4 bg-white">
                    <div className="md:h-[600px] h-[250px] w-full relative overflow-hidden rounded-xl">
                        <Image
                            src={
                                blogData?.featuredImage ||
                                '/images/blogs/blog.jpg'
                            }
                            alt="blog-card"
                            fill
                            sizes="100vw"
                            className="object-contain w-full"
                        />
                    </div>
                    <div className="flex items-center justify-between my-3">
                        <p className="text-slate-400 text-xs font-bold">
                            Published by : {blogData?.author}
                        </p>
                        <p className="text-slate-400 text-xs">
                            {moment(blogData?.createdAt).format('Do MMM YYYY')}
                        </p>
                    </div>
                    <h1 className="font-bold text-xl md:text-[40px] md:leading-10 uppercase my-2 md:my-10">
                        {blogData?.title}
                    </h1>
                    <div
                        className="blog-content block text-sm md:text-normal mr-0 md:mr-6 text-gray-600 leading-6"
                        dangerouslySetInnerHTML={{
                            __html: blogData?.content,
                        }}
                    />
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
                                                // <AccordionItem
                                                //     key={index}
                                                //     className="shadow-md px-5 py-4 w-full "
                                                //     value={faq?.id}
                                                //     onClick={() =>
                                                //         setActiveKey(
                                                //             (prevActiveKey) =>
                                                //                 prevActiveKey ===
                                                //                 faq.id
                                                //                     ? null
                                                //                     : faq.id
                                                //         )
                                                //     }
                                                // >
                                                //     <AccordionTrigger className="mb-2 font-medium text-sm  w-full">
                                                //         <div className="flex items-center justify-between">
                                                //             <h3>
                                                //                 {faq?.question}
                                                //             </h3>
                                                //             <div>
                                                //                 {activeKey ===
                                                //                 faq?.id ? (
                                                //                     <FaChevronUp />
                                                //                 ) : (
                                                //                     <FaChevronDown />
                                                //                 )}
                                                //             </div>
                                                //         </div>
                                                //     </AccordionTrigger>
                                                //     <AccordionContent className="text-sm text-gray-500">
                                                //         {faq?.answer}
                                                //     </AccordionContent>
                                                // </AccordionItem>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

BlogDetail.getLayout = (page: ReactElement) => {
    return <SiteLayout title={'Blog'}>{page}</SiteLayout>
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/blogs/site`)
    const blogs = await res.json()

    const paths = blogs.map((blog: any) => {
        return { params: { slug: `${blog.slug}` } }
    })

    return { paths, fallback: 'blocking' }
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
    }
}

export default BlogDetail
