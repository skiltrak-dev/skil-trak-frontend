import { SiteLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'
import { adminApi } from '@queries'
import { useRouter } from 'next/router'
import { LoadingAnimation, NoData, TechnicalError } from '@components'
import Image from 'next/image'
import moment from 'moment'
import { HeroSectionBlog } from '@partials/common/Blogs'

const BlogDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const blogId = router.query.slug as string
    const { data, isLoading, isFetching, isError } =
        adminApi.useGetBlogDetailQuery(blogId, {
            skip: !blogId,
        })
    console.log('data', data)
    return (
        <div className="">
            <HeroSectionBlog />
            <div className="md:p-10 p-0 mt-8 md:mt-0 mx-auto max-w-7xl">
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data ? (
                    <div className="bg-[#FFFCF7] rounded-xl shadow-md md:px-8 px-4 py-8 md:py-4">
                        <div className="md:h-[600px] h-[250px] w-full relative overflow-hidden rounded-xl">
                            <Image
                                src={data?.featuredImage}
                                alt="blog-card"
                                fill
                                sizes="100vw"
                                className="object-cover w-full"
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
                            className="break-keep block text-sm md:text-normal mr-0 md:mr-6 text-gray-600 leading-6"
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
