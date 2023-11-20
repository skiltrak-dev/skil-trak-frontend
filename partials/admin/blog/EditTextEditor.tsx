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
import { Button, Checkbox, Select, TextInput, UploadFile } from '@components'
import { FileUpload } from '@hoc'
import { adminApi } from '@queries'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { useRouter } from 'next/router'

interface TextEditorProps {
    tagIds?: any
    blogData: any
    // onSubmit: (values: any) => void
}

export default function EditTextEditor({
    blogData,
    tagIds,
}: // onSubmit,
TextEditorProps) {
    const quillRef = useRef<any>(null)
    const router = useRouter()
    const [isPublish, setIsPublish] = useState<boolean>(true)
    const [coverUrl, setCoverUrl] = useState(null)
    const [isFeatured, setIsFeatured] = useState(blogData?.isFeatured || false)
    const { notification } = useNotification()
    const [selectedCategories, setSelectedCategories] = useState<any>([])
    const [blogPost, setBlogPost] = useState<any>('')
    const blogPostEnum = {
        Save: 'save',
        SaveAndPublish: 'saveAndPublish',
    }

    const [updateBlog, updateBlogResult] = adminApi.useUpdateBlogMutation()
    const { data, isLoading } = adminApi.useGetCategoriesQuery()
    // const handleSave = () => {
    //     // const editorContent = quillRef.current.getEditor().getContents()
    //     const html = quillRef.current.getEditor().root.innerHTML
    //     console.log(html)
    // }
    const preFilledCategoriesOption = blogData?.category?.map(
        (category: any) => category?.id
    )
    console.log({ selectedCategories })
    const handleChecked = () => {
        setIsFeatured(!isFeatured)
    }

    // Validation
    const validationSchema = yup.object({
        featuredImage: yup.mixed().required('Featured Image is required'),
        title: yup.string().required('Title is required'),
        // content: yup
        //     .string()
        //     .test('notEmpty', 'Content is required', (value: any) => {
        //         return value && value.trim() !== ''
        //     }),
    })
    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            featuredImage: blogData?.featuredImage || null,
            title: blogData?.title || '',
            author: blogData?.author || '',
            isFeatured: blogData?.isFeatured || false,
            category: [],
        },
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

    const onFileUpload = ({
        name,
        dragging,
        file,
        handleRemove,
        fileObject,
    }: any) => {
        const onRemove = () => {
            handleRemove()
        }

        if (file) {
            setCoverUrl(null)
        }

        return (
            <UploadFile
                name={name}
                dragging={dragging}
                file={coverUrl || file}
                handleRemove={onRemove}
                fileObject={
                    coverUrl
                        ? {
                              type: 'image',
                          }
                        : fileObject
                }
            />
        )
    }
    useEffect(() => {
        if (blogData && !coverUrl) {
            quillRef.current.getEditor().root.innerHTML = blogData.content || ''
            setCoverUrl(blogData?.featuredImage)
        }
    }, [blogData])
    useEffect(() => {
        const category = formMethods.getValues('category')
        // if (!category){
        if (blogData && blogData?.category && blogData?.category.length > 0) {
            setSelectedCategories(
                blogData?.category?.map((category: any) => category?.id)
            )
            formMethods.setValue(
                'category',
                blogData?.category?.map((category: any) => category?.id)
            )
            // }
        }
    }, [blogData])

    // console.log('Hello', formMethods.getValues('category'))
    const options = data?.map((item: any) => ({
        label: item?.title,
        value: item?.id,
    }))

    console.log('blog post', updateBlogResult)
    // useEffect(() => {
    //     if (updateBlogResult?.isSuccess) {
    //         notification.success({
    //             title: 'Blog updated',
    //             description: 'Blog Updated Successfully',
    //         })
    //         if (blogPost === blogPostEnum.Save) {
    //             router.push('/portals/admin/blogs?tab=draft&page=1&pageSize=50')
    //         } else if (blogPost === blogPostEnum.SaveAndPublish) {
    //             router.push(
    //                 '/portals/admin/blogs?tab=published&page=1&pageSize=50'
    //             )
    //         }
    //     }
    // }, [updateBlogResult?.isSuccess])

    console.log('updateBlogResult', updateBlogResult)

    const onSubmit: any = (data: any, publish: boolean) => {
        const content = quillRef.current.getEditor().root.innerHTML

        const values = {
            featuredImage: data.featuredImage?.[0],
            title: data.title,
            author: data.author,
            content,
            isPublished: publish.toString(),
            isFeatured: isFeatured.toString(),
            category: data?.category,
        }

        if (tagIds) {
            ;(values as any)['tags'] = tagIds
        }

        const formData = new FormData()

        Object.entries(values).forEach(([key, value]: any) => {
            formData.append(key, value)
        })

        // formData.append('featuredImage', data.featuredImage?.[0])
        // formData.append('title', data.title)
        // formData.append('content', content)
        // formData.append('isPublished', publish.toString())
        // formData.append('isFeatured', isFeatured.toString())
        // formData.append('tags', tagIds)
        // formData.append('category', data?.category)

        updateBlog({ id: blogData?.id, body: formData })
            .then((res: any) => {
                notification.success({
                    title: 'Blog Updated',
                    description: 'Blog Updated Successfully',
                })
                // router.push('/portals/admin/blogs?tab=draft&page=1&pageSize=50')
                if (blogPost === blogPostEnum.Save) {
                    router.push(
                        '/portals/admin/blogs?tab=draft&page=1&pageSize=50'
                    )
                } else if (blogPost === blogPostEnum.SaveAndPublish) {
                    router.push(
                        '/portals/admin/blogs?tab=published&page=1&pageSize=50'
                    )
                }
            })
            .catch((err: any) => {
                console.log('err', err)
            })
    }

    return (
        <div>
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
                        component={onFileUpload}
                        acceptTypes={['jpg', 'jpeg', 'png', 'webp']}
                    />
                    <Select
                        label="Categories"
                        name="category"
                        options={options}
                        value={options?.filter((cate: any) =>
                            selectedCategories.includes(cate?.value)
                        )}
                        onChange={(e: any) => {
                            setSelectedCategories(e)
                        }}
                        // loading={isLoading}
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
                            value={isFeatured}
                            defaultChecked={isFeatured}
                        />
                    </div>
                    <div className="flex items-center gap-x-4 mt-5">
                        <Button
                            text="Update & Publish"
                            loading={
                                updateBlogResult?.isLoading &&
                                blogPost === blogPostEnum.SaveAndPublish
                            }
                            disabled={
                                updateBlogResult?.isLoading &&
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
                            onClick={() => {
                                setIsPublish(false)
                                setBlogPost(blogPostEnum.Save)
                                onSubmit(formMethods.getValues(), false)
                            }}
                            loading={
                                updateBlogResult?.isLoading &&
                                blogPost === blogPostEnum.Save
                            }
                            disabled={
                                updateBlogResult?.isLoading &&
                                blogPost === blogPostEnum.Save
                            }
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
