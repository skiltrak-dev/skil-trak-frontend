import { NoData, Typography } from '@components'
import { useWindowWidth } from '@hooks'
import { SiteLayout } from '@layouts'
import { PaginatedItems } from '@partials/common'
import {
    BlogCard,
    HeroSectionBlog,
    MostRecentBlog,
} from '@partials/common/Blogs'
import { NextPageWithLayout } from '@types'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

const Blogs: NextPageWithLayout = ({ data }: any) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [currentItems, setCurrentItems] = useState([])
    const [page, setPage] = useState(1)
    const [fetchedData, setFetchedData] = useState<any>([])
    const router = useRouter()

    useEffect(() => {
        setFetchedData(data)
    }, [data])

    const filterPublishedBlogs = fetchedData?.filter(
        (item: any) => item?.isPublished === true && !item?.isFeatured
    )
    const filterFeaturedBlogs = fetchedData?.filter(
        (item: any) => item?.isFeatured
    )

    // Mobile screen
    function isMobile(width: any) {
        return width <= 768
    }
    const width = useWindowWidth()
    const mobile = isMobile(width)
    return (
        <>
            <HeroSectionBlog />
            <div className="container !mx-auto mt-24 md:px-20 px-4">
                <div className="flex md:flex-row flex-col gap-y-5 md:gap-x-12 mb-10">
                    <div className="w-full md:w-3/4">
                        <div className="bg-[#FFFCF7] rounded-xl shadow-md px-2 py-1.5 min-h-[720px]">
                            <Link
                                href={`blogs/${filterFeaturedBlogs[0]?.slug}`}
                            >
                                <div className="relative md:h-[600px] h-[250px] rounded-xl overflow-hidden">
                                    <Image
                                        src={`${filterFeaturedBlogs[0]?.featuredImage}`}
                                        alt="blog-card"
                                        fill
                                        sizes="100vw"
                                        className="object-contain"
                                    />
                                </div>
                                <div className="md:px-8 px-2">
                                    <div className="h-[480px]">
                                        <div className="flex items-center justify-between my-3">
                                            <p className="text-[#DADADA] text-xs font-bold">
                                                Published
                                            </p>
                                            <p className="text-[#DADADA] text-xs">
                                                {moment(
                                                    filterFeaturedBlogs?.[0]
                                                        ?.createdAt
                                                ).format('Do MMM YYYY')}
                                            </p>
                                        </div>

                                        <h1 className="font-bold text-2xl uppercase mb-1.5">
                                            {filterFeaturedBlogs?.[0]?.title}
                                        </h1>
                                        <div
                                            className="blog-content block mr-6 text-gray-400 text-sm leading-6"
                                            // dangerouslySetInnerHTML={{
                                            //     __html:
                                            //         filterFeaturedBlogs?.[0]?.content.substr(
                                            //             0,
                                            //             380
                                            //         ) + '...',
                                            // }}
                                        >
                                            {(filterFeaturedBlogs?.[0]
                                                ?.shortDescription &&
                                                filterFeaturedBlogs?.[0]?.shortDescription.substr(
                                                    0,
                                                    mobile ? 500 : 1800
                                                )) ||
                                                ' '}
                                            ...
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="md:w-1/4 w-full">
                        <Typography variant="title" color="text-gray-500">
                            Featured Blogs
                        </Typography>
                        <div className="flex flex-col gap-y-5">
                            {filterFeaturedBlogs &&
                                filterFeaturedBlogs?.length > 0 &&
                                filterFeaturedBlogs
                                    ?.slice(0, 4)
                                    .map((blog: any) => (
                                        <div key={blog?.id}>
                                            <MostRecentBlog
                                                title={blog?.title}
                                                content={blog?.content}
                                                featuredImage={
                                                    blog?.featuredImage
                                                }
                                                date={blog?.createdAt}
                                                id={blog?.id}
                                                author={blog?.author}
                                                slug={blog?.slug}
                                                shortDescription={
                                                    blog?.shortDescription
                                                }
                                            />
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>

                <div className="">
                    <Typography variant="subtitle" color="text-gray-500">
                        Blog posts
                    </Typography>
                    <div
                        className={`grid grid-col-1 md:grid-cols-3 mx-auto  gap-7 `}
                    >
                        {currentItems?.map((blog: any) => (
                            <BlogCard
                                key={blog?.id}
                                title={blog?.title}
                                content={blog?.content}
                                featuredImage={blog?.featuredImage}
                                date={blog?.createdAt}
                                id={blog.id}
                                slug={blog?.slug}
                                author={blog?.author}
                                shortDescription={blog?.shortDescription}
                                metaData={blog?.metaData}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="py-4 px-10">
                {filterPublishedBlogs && filterPublishedBlogs?.length > 0 && (
                    <div className="flex items-center justify-center gap-x-4 h-12 ">
                        <PaginatedItems
                            data={filterPublishedBlogs}
                            itemsPerPage={9}
                            setCurrentItems={setCurrentItems}
                            url="/blogs"
                        />
                    </div>
                )}
            </div>
        </>
    )
}

Blogs.getLayout = (page: ReactElement) => {
    return <SiteLayout title={'Blogs'}>{page}</SiteLayout>
}

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/blogs/site`)
    const data = await res.json()
    if (!data) {
        return <NoData text="No Data" />
    }
    return {
        props: {
            data,
        },
        revalidate: 3600,
    }
}

export default Blogs
