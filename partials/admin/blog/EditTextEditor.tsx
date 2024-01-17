import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as yup from 'yup'
import * as Quill from 'quill'
import {
    Controller,
    FormProvider,
    useFieldArray,
    useForm,
    useFormContext,
} from 'react-hook-form'
import {
    Button,
    Card,
    Checkbox,
    Select,
    TextArea,
    TextInput,
    Typography,
    UploadFile,
} from '@components'
import { FileUpload } from '@hoc'
import { adminApi } from '@queries'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { useRouter } from 'next/router'

import { InputErrorMessage } from '@components/inputs/components'

const imageSizeErrorMessage = (file: File) => {
    if (file && file.size && file.size > 2 * 1024 * 1024) {
        return 'Image size must be less than 2MB'
    }
    return true
}

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

    // const initialFaqList = blogData?.blogQuestions.map(
    //     (question: any, index: any) => ({
    //         question: question.question,
    //         answer: question.answer,
    //     })
    // )
    // const [faqList, setFaqList] = useState(initialFaqList)
    // const handleSave = () => {
    //     // const editorContent = quillRef.current.getEditor().getContents()
    //     const html = quillRef.current.getEditor().root.innerHTML
    // }
    const preFilledCategoriesOption = blogData?.category?.map(
        (category: any) => category?.id
    )
    const handleChecked = () => {
        setIsFeatured(!isFeatured)
    }

    // Validation
    const validationSchema = yup.object({
        title: yup
            .string()
            .required('Title is required')
            .matches(/^[\w\s!@#$%^&*()\-+=_{}|:"<>?,./;'[\]]{5,160}$/, {
                message:
                    'Title must be between 5 and 160 characters and only contain special characters',
                excludeEmptyString: true,
            }),

        author: yup
            .string()
            .required('Author is required')
            .matches(/^[^\d]+$/, 'Author name cannot contain numbers')
            .min(3, 'Author must be at least 3 characters')
            .max(20, 'Author cannot exceed 20 characters'),
        category: yup
            .array()
            .min(1, 'Must select at least 1 category')
            .required(),
        // content: yup.string().required('Content is required'),
    })
    const formMethods: any = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            featuredImage: blogData?.featuredImage || null,
            title: blogData?.title || '',
            author: blogData?.author || '',
            isFeatured: blogData?.isFeatured || false,
            category: [],
            content: '',
            blogQuestions: blogData?.blogQuestions || [
                { question: '', answer: '' },
            ],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: formMethods.control,
        name: 'blogQuestions',
    })
    // FAQ's
    // useEffect(() => {
    //     const initialFaqList = blogData?.blogQuestions.map((question: any) => ({
    //         question: question.question,
    //         answer: question.answer,
    //     })) || [{ question: '', answer: '' }]

    //     setFaqList(initialFaqList)
    // }, [blogData])

    const handleAddFAQ = () => {
        append({ question: '', answer: '' })
    }

    const handleRemoveFAQ = (index: number) => {
        remove(index)
    }
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

    // Quill Editor
    useEffect(() => {
        if (blogData && !coverUrl) {
            quillRef.current.getEditor().root.innerHTML = blogData.content || ''
            setCoverUrl(blogData?.featuredImage)
        }
    }, [blogData])

    // category
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

    // FAQ's
    useEffect(() => {
        if (blogData?.blogQuestions) {
            blogData.blogQuestions.forEach((faq: any, index: any) => {
                formMethods.setValue(
                    `blogQuestions[${index}].question`,
                    faq.question
                )
                formMethods.setValue(
                    `blogQuestions[${index}].answer`,
                    faq.answer
                )
            })
        }
    }, [formMethods.setValue, blogData])

    const options = data?.map((item: any) => ({
        label: item?.title,
        value: item?.id,
    }))

    // dynamic fields
    // const handleAddFAQ = () => {
    //     setFaqList((prevFaqList: any) => [
    //         ...prevFaqList,
    //         { question: '', answer: '' },
    //     ])
    // }

    // const handleRemoveFAQ = (index: number) => {
    //     setFaqList((prevFaqList: any) => {
    //         const updatedList = [...prevFaqList]
    //         updatedList.splice(index, 1)
    //         return updatedList
    //     })
    // }

    const initialFaqList = fields?.map((question: any) => ({
        question: question.question,
        answer: question.answer,
    })) || [{ question: '', answer: '' }]
    console.log('JSON.stringify(fields)', initialFaqList)

    const onSubmit: any = (data: any, publish: boolean) => {
        const content = quillRef.current.getEditor().root.innerHTML
        if (!data.featuredImage || !data.featuredImage[0]) {
            formMethods.setError('featuredImage', {
                type: 'emptyImage',
                message: 'Image must not be empty',
            })
            return
        }

        const imageSizeError = imageSizeErrorMessage(data.featuredImage[0])
        if (imageSizeError !== true) {
            formMethods.setError('featuredImage', {
                type: 'imageSizeError',
                message: imageSizeError,
            })
            return
        }

        if (content === '<p><br></p>' || content.trim() === '<p><br></p>') {
            formMethods.setError('content', {
                type: 'emptyContent',
                message: 'Content is required',
            })
            return
        }

        const values = {
            featuredImage: data.featuredImage?.[0],
            title: data.title,
            author: data.author,
            content: content,
            isPublished: publish.toString(),
            isFeatured: isFeatured.toString(),
            category: data?.category,
            // blogQuestions: JSON.stringify(data?.blogQuestions),
            blogQuestions: JSON.stringify(initialFaqList),
            // formData.append('blogQuestions', JSON.stringify(data?.faq))
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
                notification.error({
                    title: 'Blog Update Failed',
                    description: 'There was an error updating the blog.',
                })
            })
    }

    return (
        <div>
            <FormProvider {...formMethods}>
                <form
                    onSubmit={formMethods.handleSubmit((data: any) =>
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
                    <InputErrorMessage name={'content'} />
                    <div className="mt-4">
                        <Checkbox
                            onChange={handleChecked}
                            name={'isFeatured'}
                            label={'Featured'}
                            value={isFeatured}
                            defaultChecked={isFeatured}
                        />
                    </div>
                    {/* FAQ's */}

                    <div className="py-4 border-t">
                        <Typography variant="subtitle">
                            Add FAQ's here
                        </Typography>
                        <Card>
                            {/* {faqList.map((faq: any, index: any) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-x-4"
                                >
                                    <div className="flex flex-col w-3/4">
                                        <TextInput
                                            name={`blogQuestions[${index}].question`}
                                            label={`FAQ ${index + 1} Question`}
                                            placeholder="Enter Question"
                                            value={faq.question}
                                            onChange={(e: any) => {
                                                const updatedFaqList = [
                                                    ...faqList,
                                                ]
                                                updatedFaqList[index].question =
                                                    e.target.value
                                                setFaqList(updatedFaqList)
                                            }}
                                        />
                                        <TextArea
                                            name={`blogQuestions[${index}].answer`}
                                            label={`FAQ ${index + 1} Answer`}
                                            placeholder="Enter Answer"
                                            value={faq.answer}
                                            onChange={(e: any) => {
                                                const updatedFaqList = [
                                                    ...faqList,
                                                ]
                                                updatedFaqList[index].answer =
                                                    e.target.value
                                                setFaqList(updatedFaqList)
                                            }}
                                        />
                                    </div>
                                    <div className="mt-7">
                                        <Button
                                            text="Remove"
                                            onClick={() =>
                                                handleRemoveFAQ(index)
                                            }
                                            variant="error"
                                        />
                                    </div>
                                </div>
                            ))} */}
                            {fields.map((faq: any, index: any) => (
                                <div
                                    key={faq.id}
                                    className="flex items-start gap-x-4"
                                >
                                    <div className="flex flex-col w-3/4">
                                        <TextInput
                                            name={`blogQuestions[${index}].question`}
                                            label={`FAQ ${index + 1} Question`}
                                            placeholder="Enter Question"
                                            defaultValue={faq.question}
                                        />
                                        <TextArea
                                            name={`blogQuestions[${index}].answer`}
                                            label={`FAQ ${index + 1} Answer`}
                                            placeholder="Enter Answer"
                                            // defaultValue={faq.answer}
                                        />
                                    </div>
                                    <div className="mt-7">
                                        <Button
                                            text="Remove"
                                            onClick={() =>
                                                handleRemoveFAQ(index)
                                            }
                                            variant="error"
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="mb-4">
                                <Button
                                    variant="success"
                                    text="Add FAQ"
                                    onClick={handleAddFAQ}
                                />
                            </div>
                        </Card>
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
