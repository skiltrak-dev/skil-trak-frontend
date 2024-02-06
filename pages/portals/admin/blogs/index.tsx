import { ReactElement, useEffect } from 'react'

import { Button, TabNavigation, TabProps } from '@components'
import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    BlogCategories,
    DraftBlogs,
    PublishedBlogs,
} from '@partials/admin/blog'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'

const BlogsList: NextPageWithLayout = () => {
    // const { data, isLoading } = adminApi.useGetBlogsQuery({

    // })

    const router = useRouter()
    const navBar = useNavbar()

    useEffect(() => {
        navBar.setTitle('blogs')
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Published',
            href: {
                pathname: 'blogs',
                query: { tab: 'published', page: 1, pageSize: 50 },
            },
            // badge: {
            //     text: "Published",
            //     loading: isLoading,
            // },
            element: <PublishedBlogs />,
        },
        {
            label: 'Draft',
            href: {
                pathname: 'blogs',
                query: { tab: 'draft', page: 1, pageSize: 50 },
            },
            // badge: {
            //     text: "Draft",
            //     loading: isLoading,
            // },
            element: <DraftBlogs />,
        },
        {
            label: 'Categories',
            href: {
                pathname: 'blogs',
                query: { tab: 'categories', page: 1, pageSize: 50 },
            },
            // badge: {
            //     text: "Draft",
            //     loading: isLoading,
            // },
            element: <BlogCategories />,
        },

        // BlogCategories
    ]

    return (
        <div className="p-6">
            <div className="flex justify-end">
                <Button
                    onClick={() => {
                        router.push('/portals/admin/blogs/add-blog')
                    }}
                    text={'Add Blog'}
                />
            </div>

            {/* <div
                className="break-all block mr-6"
                dangerouslySetInnerHTML={{
                    __html: data[3]?.content,
                }}
            /> */}
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div>{header}</div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}

BlogsList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default BlogsList
