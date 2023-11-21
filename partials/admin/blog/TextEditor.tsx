import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as yup from 'yup'
import * as Quill from 'quill'
import {
    Controller,
    FormProvider,
    useForm,
    useFormContext,
} from 'react-hook-form'
import {
    Button,
    Checkbox,
    Select,
    ShowErrorNotifications,
    TextInput,
    UploadFile,
} from '@components'
import { FileUpload } from '@hoc'
import { adminApi } from '@queries'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useNotification } from '@hooks'

interface TextEditorProps {
    tagIds?: any
}
export default function TextEditor({ tagIds }: TextEditorProps) {
    console.log('tagIds', tagIds)
    const quillRef = useRef<any>(null)
    const { notification } = useNotification()
    const router = useRouter()
    const [isPublish, setIsPublish] = useState<boolean>(true)
    const [isFeatured, setIsFeatured] = useState(false)
    const [blogPost, setBlogPost] = useState<any>('')
    const blogPostEnum = {
        Save: 'save',
        SaveAndPublish: 'saveAndPublish',
    }

    const [createBlog, createBlogResult] = adminApi.useCreateBlogMutation()
    const { data, isLoading } = adminApi.useGetCategoriesQuery()
    console.log('isFeatured', isFeatured)
    // const handleSave = () => {
    //     // const editorContent = quillRef.current.getEditor().getContents()
    //     const html = quillRef.current.getEditor().root.innerHTML
    //     console.log(html)
    // }
    const handleChecked = () => {
        setIsFeatured(!isFeatured)
    }
    // Validation
    const validationSchema = yup.object({
        featuredImage: yup.mixed().required('Featured Image is required'),
        title: yup.string().required('Title is required'),
        author: yup.string().required('Author is required'),
        category: yup.array().min(1, 'Must select at least 1 category').required(),
        // content: yup
        //     .string()
        //     .test('notEmpty', 'Content is required', (value: any) => {
        //         return value && value.trim() !== ''
        //     }),
    })
    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
    }

    const onSubmit: any = (data: any, publish: boolean) => {
        const content = quillRef.current.getEditor().root.innerHTML

        const formData = new FormData()
        formData.append('featuredImage', data.featuredImage?.[0])
        formData.append('title', data.title)
        formData.append('content', content)
        formData.append('isPublished', publish.toString())
        formData.append('isFeatured', data.isFeatured.toString())
        formData.append('tags', tagIds)
        formData.append('category', data?.category)
        formData.append('author', data?.author)

        createBlog(formData)
    }

    const options = data?.map((item: any) => ({
        label: item?.title,
        value: item?.id,
    }))

    useEffect(() => {
        if (createBlogResult.isSuccess) {
            notification.success({
                title: 'Blog Published',
                description: 'Blog Published Successfully',
            })
            // router.push('/portals/admin/blogs?tab=draft&page=1&pageSize=50')
            console.log({ blogPost })
            if (blogPost === blogPostEnum.Save) {
                router.push('/portals/admin/blogs?tab=draft&page=1&pageSize=50')
            } else if (blogPost === blogPostEnum.SaveAndPublish) {
                router.push(
                    '/portals/admin/blogs?tab=published&page=1&pageSize=50'
                )
            }
        }
    }, [createBlogResult.isSuccess])
    return (
        <div>
            <ShowErrorNotifications result={createBlogResult} />
            <FormProvider {...formMethods}>
                <form
                    onSubmit={formMethods.handleSubmit((data) =>
                        onSubmit(data, isPublish)
                    )}
                >
                    <FileUpload
                        required
                        label={'Featured Image'}
                        name={'featuredImage'}
                        component={UploadFile}
                        acceptTypes={['jpg', 'jpeg', 'png', 'webp']}
                    />
                    <Select
                        label="Categories"
                        name="category"
                        options={options}
                        loading={isLoading}
                        multi
                        onlyValue
                    />
                    <TextInput name="author" label="Author" />
                    <TextInput name="title" label="Title" />
                    <ReactQuill theme="snow" ref={quillRef} modules={modules} />
                    <div className="mt-4">
                        <Checkbox
                            onChange={handleChecked}
                            name={'isFeatured'}
                            label={'Featured'}
                        />
                    </div>
                    <div className="flex items-center gap-x-4">
                        <Button
                            text="Save & Publish"
                            // submit
                            loading={
                                createBlogResult?.isLoading &&
                                blogPost === blogPostEnum.SaveAndPublish
                            }
                            disabled={
                                createBlogResult?.isLoading &&
                                blogPost === blogPostEnum.SaveAndPublish
                            }
                            onClick={() => {
                                setIsPublish(true)
                                setBlogPost(blogPostEnum.SaveAndPublish)
                                onSubmit(formMethods.getValues(), true)
                            }}
                        />
                        <Button
                            text="Save"
                            loading={
                                createBlogResult?.isLoading &&
                                blogPost === blogPostEnum.Save
                            }
                            disabled={
                                createBlogResult?.isLoading &&
                                blogPost === blogPostEnum.Save
                            }
                            onClick={() => {
                                setIsPublish(false)
                                setBlogPost(blogPostEnum.Save)
                                onSubmit(formMethods.getValues(), false)
                            }}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
