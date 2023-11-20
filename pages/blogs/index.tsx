import { SiteLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement, useState } from 'react'
import { adminApi } from '@queries'
import {
    BlogCard,
    MostRecentBlog,
    HeroSectionBlog,
} from '@partials/common/Blogs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import moment from 'moment'
import { LoadingAnimation, NoData, Paginate, Typography } from '@components'
import Link from 'next/link'

const Blogs: NextPageWithLayout = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [currentItems, setCurrentItems] = useState([])
    const router = useRouter()
    const [page, setPage] = useState(1)
    const { data, isLoading, isError, isFetching } = adminApi.useGetBlogsQuery({
        isPublished: `${true}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    console.log('currentItems', currentItems)
    return (
        <>
            <HeroSectionBlog />
            <div className="container mx-auto mt-24 md:px-0 px-4">
                {/* Featured blog */}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data?.data && data?.data?.length ? (
                    <>
                        <div className="flex md:flex-row flex-col gap-y-5 md:gap-x-12 mb-10">
                            <div className="w-full md:w-3/4">
                                <div className="bg-[#FFFCF7] rounded-xl shadow-md px-2 py-1.5 min-h-[720px]">
                                    <Link href={`blogs/${data?.data[0]?.id}`}>
                                        <div className="relative h-[200px] rounded-xl overflow-hidden">
                                            <Image
                                                src={
                                                    data?.data[0]?.featuredImage
                                                }
                                                alt="blog-card"
                                                fill
                                                sizes="100vw"
                                            />
                                        </div>
                                        <div className="px-8">
                                            <div className="h-[480px]">
                                                <div className="flex items-center justify-between my-3">
                                                    <p className="text-[#DADADA] text-xs font-bold">
                                                        Published
                                                    </p>
                                                    <p className="text-[#DADADA] text-xs">
                                                        {moment(
                                                            data?.data[0]
                                                                ?.createdAt
                                                        ).format('Do MMM YYYY')}
                                                    </p>
                                                </div>

                                                <h1 className="font-bold text-2xl uppercase mb-1.5">
                                                    {data?.data[0]?.title}
                                                </h1>
                                                <div
                                                    className="break-all block mr-6 text-gray-400 text-sm"
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            data?.data[0]?.content.substr(
                                                                0,
                                                                460
                                                            ) + '...',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="md:w-1/4 w-full">
                                <Typography
                                    variant="subtitle"
                                    color="text-gray-500"
                                >
                                    Featured Blogs
                                </Typography>
                                <div className="flex flex-col gap-y-5">
                                    {data?.data
                                        ?.slice(1, 4)
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
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <Typography
                                variant="subtitle"
                                color="text-gray-500"
                            >
                                Blog posts
                            </Typography>
                            <div
                                className={`grid grid-col-1 md:grid-cols-3 mx-auto  gap-7 `}
                            >
                                {currentItems?.map((blog: any) => (
                                    <div key={blog?.id}>
                                        <BlogCard
                                            title={blog?.title}
                                            content={blog?.content}
                                            featuredImage={blog?.featuredImage}
                                            date={blog?.createdAt}
                                            id={blog.id}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    !isError && <NoData text="No Data Found" />
                )}
            </div>
            <div className="py-4 px-10">
                {data?.data && data.data.length > 0 && (
                    <div className="flex items-center justify-end gap-x-4">
                        <span className="text-gray-600 text-sm">
                            results({data?.data?.length})
                        </span>
                        <Paginate
                            data={data?.data}
                            itemsPerPage={6}
                            setCurrentItems={setCurrentItems}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

Blogs.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default Blogs
