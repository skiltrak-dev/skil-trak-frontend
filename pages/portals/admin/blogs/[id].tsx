import React, { ReactElement, useEffect, useRef, useState } from 'react'

import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { Jobs } from '@partials/admin/job'
import { NextPageWithLayout } from '@types'
import {
    Button,
    EmptyData,
    InputContentEditor,
    LoadingAnimation,
    TechnicalError,
    draftToHtmlText,
} from '@components'
import {
    Controller,
    FormProvider,
    useForm,
    useFormContext,
} from 'react-hook-form'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { BlogContextBar } from '@partials/admin/blog'
import { useRouter } from 'next/router'
import { adminApi } from '@queries'
// import { TextEditor } from '@partials'

const EditBlog: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const router = useRouter()
    const blogId = router?.query?.id as string
    const TextEditor = dynamic(
        () => import('../../../../partials/admin/blog/EditTextEditor'),
        { ssr: false }
    )
    const { data, isLoading, isFetching, isError } =
        adminApi.useGetBlogDetailQuery(blogId)
    const navBar = useNavbar()
    useEffect(() => {
        navBar.setTitle('edit blog')
    }, [])

    useEffect(() => {
        contextBar.setContent(<BlogContextBar />)
        contextBar.show(false)
        contextBar.setTitle('Blog')
        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [])

    console.log('blog data', data)
    return (
        <div className="p-6">
            {isError && <TechnicalError />}
            {isLoading || isFetching ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : data && data ? (
                <>
                    <TextEditor blogData={data} />
                </>
            ) : (
                !isError && (
                    <EmptyData
                        title={'No Blog(s)!'}
                        description={'You have no blog(s) yet.'}
                        height={'50vh'}
                    />
                )
            )}
        </div>
    )
}

EditBlog.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditBlog
