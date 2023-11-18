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
import { Button, Select, TextInput, UploadFile } from '@components'
import { FileUpload } from '@hoc'
import { adminApi } from '@queries'
import { yupResolver } from '@hookform/resolvers/yup'

interface TextEditorProps {
    tagIds?: any
    blogData: any
}
export default function EditTextEditor({ blogData, tagIds }: TextEditorProps) {
    const quillRef = useRef<any>(null)
    const [isPublish, setIsPublish] = useState<boolean>(true)
    const [coverUrl, setCoverUrl] = useState(null)

    const [updateBlog, updateBlogResult] = adminApi.useUpdateBlogMutation()
    const { data, isLoading } = adminApi.useGetCategoriesQuery()
    // const handleSave = () => {
    //     // const editorContent = quillRef.current.getEditor().getContents()
    //     const html = quillRef.current.getEditor().root.innerHTML
    //     console.log(html)
    // }

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

    const onSubmit: any = (data: any, publish: boolean) => {
        const content = quillRef.current.getEditor().root.innerHTML

        const formData = new FormData()
        formData.append('featuredImage', data.featuredImage?.[0])
        formData.append('title', data.title)
        formData.append('content', content)
        formData.append('isPublished', publish.toString())
        formData.append('tags', tagIds)
        formData.append('category', data?.category)

        updateBlog({ id: blogData?.id, body: formData })
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
        if (blogData) {
            quillRef.current.getEditor().root.innerHTML = blogData.content || ''
            setCoverUrl(blogData?.featuredImage)
        }
    }, [blogData])

    const options = data?.map((item: any) => ({
        label: item?.title,
        value: item?.id,
    }))
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
                        loading={isLoading}
                        multi
                        onlyValue
                    />
                    <TextInput name="title" label="Title" />
                    <ReactQuill theme="snow" ref={quillRef} modules={modules} />
                    <div className="flex items-center gap-x-4 mt-5">
                        <Button
                            text="Update & Publish"
                            submit
                            loading={updateBlogResult?.isLoading}
                            disabled={updateBlogResult?.isLoading}
                            onClick={() => {
                                setIsPublish(true)
                                onSubmit(formMethods.getValues(), true)
                            }}
                        />
                        <Button
                            text="Save"
                            onClick={() => {
                                setIsPublish(false)
                                onSubmit(formMethods.getValues(), false)
                            }}
                            loading={updateBlogResult?.isLoading}
                            disabled={updateBlogResult?.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
