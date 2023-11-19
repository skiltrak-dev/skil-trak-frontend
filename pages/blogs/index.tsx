import { SiteLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement, useState } from 'react'
import { adminApi } from '@queries'
import { BlogCard, MostRecentBlog, HeroSectionBlog } from '@partials/common/Blogs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import moment from 'moment'
import { LoadingAnimation, NoData } from '@components'

const Blogs: NextPageWithLayout = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const router = useRouter()
    const [page, setPage] = useState(1)
    const { data, isLoading, isError, isFetching } = adminApi.useGetBlogsQuery({
        isPublished: `${true}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    // useGetBlogDetailQuery
    console.log('Lg::::', data?.data[0])
    return (
        <>
        <HeroSectionBlog />
            <div className="p-8">
                {/* Featured blog */}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data.data && data?.data?.length ? (
                    <>
                        <div className="flex gap-x-12 mb-10">
                            <div className="w-3/4">
                                <div className="bg-[#FFFCF7] rounded-xl shadow-md px-2 py-1.5 h-[390px]">
                                    <Image
                                        src={data?.data[0]?.featuredImage}
                                        alt="blog-card"
                                        width={150}
                                        height={150}
                                        sizes="100vw"
                                        className="rounded-xl w-full h-[200px]"
                                    />
                                    <div className="flex items-center justify-between my-3">
                                        <p className="text-[#DADADA] text-xs font-bold">
                                            Published
                                        </p>
                                        <p className="text-[#DADADA] text-xs">
                                            {moment(
                                                data?.data[0]?.createdAt
                                            ).format('Do MMM YYYY')}
                                        </p>
                                    </div>

                                    <h1 className="font-bold uppercase mb-1.5">
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
                                    <div
                                        onClick={() => {
                                            router.push(
                                                `blogs/${data?.data[0]?.id}`
                                            )
                                        }}
                                        className="cursor-pointer flex items-center justify-end text-blue-500"
                                    >
                                        view
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/4 flex flex-col gap-y-5">
                                {data?.data?.slice(1, 4).map((blog: any) => (
                                    <div key={blog?.id}>
                                        <MostRecentBlog
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

                        <div
                            className={`grid grid-col-1 md:grid-cols-3 mx-auto max-w-7xl gap-7 `}
                        >
                            {data?.data
                                ?.slice(4, data?.data?.length - 1)
                                .map((blog: any) => (
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
                    </>
                ) : (
                    !isError && <NoData text="No Data Found" />
                )}
            </div>
        </>
    )
}

Blogs.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default Blogs
