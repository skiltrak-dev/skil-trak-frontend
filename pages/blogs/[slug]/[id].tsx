import { SiteLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'
import { adminApi } from '@queries'
import { useRouter } from 'next/router'
import { LoadingAnimation, NoData } from '@components'
import Image from 'next/image'
import moment from 'moment'
import { HeroSectionBlog } from '@partials/common/Blogs'

const BlogDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const blogId = router.query.id as string
    const { data, isLoading, isFetching, isError } =
        adminApi.useGetBlogDetailQuery(blogId, {
            skip: !blogId,
        })
    console.log(router.asPath)
    return (
        <div className="">
            <HeroSectionBlog />
            <div className="p-10 mx-auto max-w-7xl">
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data ? (
                    <div className="bg-[#FFFCF7] rounded-xl shadow-md px-8 py-4">
                        <div className="h-[650px] relative overflow-hidden rounded-xl">
                            <Image
                                src={data?.featuredImage}
                                alt="blog-card"
                                fill
                                sizes="100vw"
                                className=""
                            />
                        </div>
                        <div className="flex items-center justify-between my-3">
                            <p className="text-[#DADADA] text-xs font-bold">
                                Published
                            </p>
                            <p className="text-[#DADADA] text-xs">
                                {moment(data?.createdAt).format('Do MMM YYYY')}
                            </p>
                        </div>

                        <h1 className="font-bold text-[40px] uppercase mb-1.5">
                            {data?.title}
                        </h1>
                        <div
                            className="break-all block mr-6 text-gray-400 text-sm leading-6"
                            dangerouslySetInnerHTML={{
                                __html: data?.content,
                            }}
                        />
                    </div>
                ) : (
                    !isError && <NoData text="No Data Found" />
                )}
            </div>
        </div>
    )
}

BlogDetail.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default BlogDetail
