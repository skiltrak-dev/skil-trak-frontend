import React, { ReactElement, useEffect, useRef, useState } from 'react'
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
import { FaqDeleteModal } from './components'

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
    const [removeFaq, removeFaqResult] = adminApi.useRemoveFaqMutation()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [shortDescriptionWordCount, setShortDescriptionWordCount] =
        useState(0)

    const blogPostEnum = {
        Save: 'save',
        SaveAndPublish: 'saveAndPublish',
    }

    const [updateBlog, updateBlogResult] = adminApi.useUpdateBlogMutation()
    const { data, isLoading } = adminApi.useGetCategoriesQuery(undefined)

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
    const onModalCancelClicked = () => {
        setModal(null)
    }
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
        // shortDescription: yup
        //     .string()
        //     .required('Short description is required')
        //     .test(
        //         'max-words',
        //         'Short description must be at most 385 words',
        //         (value) => {
        //             if (!value) {
        //                 return true // Allow empty string (required validation will handle it)
        //             }
        //             const wordCount = value
        //                 .split(/\s+/)
        //                 .filter((word) => word !== '').length
        //             return wordCount <= 385
        //         }
        //     ),
        // content: yup.string().required('Content is required'),
        // blogQuestions: yup.object().shape({
        //     question: yup.string().required('FAQ question should not be empty'),
        //     answer: yup.string().required('FAQ answer should not be empty'),
        // }).required(),
    })
    const formMethods: any = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            featuredImage: blogData?.featuredImage || null,
            title: blogData?.title || '',
            metaData: blogData?.metaData,
            shortDescription: blogData?.shortDescription || '',
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

    // useEffect(() => {
    //     formMethods.reset({
    //         ...formMethods.defaultValues,
    //         blogQuestions: blogData?.blogQuestions || [
    //             { question: '', answer: '' },
    //         ],
    //     })
    // }, [blogData])

    const handleAddFAQ = () => {
        append({ question: '', answer: '' })
    }

    const handleRemoveFAQ = (index: number) => {
        const isExist = blogData?.blogQuestions[index]
        if (isExist) {
            // remove(index)
            // removeFaq(isExist?.id)
            setModal(
                <FaqDeleteModal
                    onCancel={onModalCancelClicked}
                    faq={isExist}
                    removeField={remove}
                    index={index}
                />
            )
        }
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
    }, [blogData])

    const options = data?.data?.map((item: any) => ({
        label: item?.title,
        value: item?.id,
    }))

    const initialFaqList = fields?.map((question: any) => ({
        question: question.question || '',
        answer: question.answer || '',
    }))
    const onSubmit: any = (data: any, publish: boolean) => {
        const content = quillRef.current.getEditor().root.innerHTML
        if (
            !data.featuredImage ||
            (typeof data.featuredImage === 'string' &&
                data.featuredImage.trim() === '')
        ) {
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
        if (
            shortDescriptionWordCount < 385 ||
            shortDescriptionWordCount > 385
        ) {
            formMethods.setError('shortDescription', {
                type: 'shortDescription',
                message: 'Must provide 385 words',
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

        let isAnyFaqInvalid = false

        data?.blogQuestions &&
            data?.blogQuestions?.forEach((faq: any, index: number) => {
                if (faq?.question === '' || faq?.answer === '') {
                    formMethods.setError(`faq.${index}.question`, {
                        type: 'FAQs',
                        message: 'FAQ question should not be empty',
                    })

                    formMethods.setError(`faq.${index}.answer`, {
                        type: 'FAQs',
                        message: 'FAQ answer should not be empty',
                    })

                    isAnyFaqInvalid = true
                }
            })

        if (isAnyFaqInvalid) {
            return
        }

        const values = {
            featuredImage: Array.isArray(data?.featuredImage)
                ? data?.featuredImage?.[0]
                : blogData?.featuredImage,
            title: data?.title,
            author: data?.author,
            metaData: data?.metaData,
            content: content,
            isPublished: publish.toString(),
            isFeatured: isFeatured.toString(),
            category: data?.category,
            shortDescription: data?.shortDescription,
            blogQuestions: JSON.stringify(data?.blogQuestions),
        }

        if (tagIds) {
            ;(values as any)['tags'] = tagIds
        }

        const formData = new FormData()

        Object.entries(values).forEach(([key, value]: any) => {
            formData.append(key, value)
        })

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
    const handleShortDescriptionChange = () => {
        const shortDescription = formMethods.getValues('shortDescription')
        const wordCount = shortDescription
            .split(/\s+/)
            .filter((word: any) => word !== '').length

        setShortDescriptionWordCount(wordCount)
    }

    return (
        <>
            {modal && modal}
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
                        <TextArea
                            label={'Meta Data'}
                            name={'metaData'}
                            placeholder="Add meta tags...."
                        />
                        <TextArea
                            label={'Short Description'}
                            name={'shortDescription'}
                            validationIcons
                            required
                            onChange={handleShortDescriptionChange}
                        />
                        <div
                            className={`${
                                shortDescriptionWordCount > 385
                                    ? 'text-red-500'
                                    : ' text-slate-500'
                            } text-sm mb-5`}
                        >
                            {`${shortDescriptionWordCount} / 385 words`}
                        </div>
                        <ReactQuill
                            theme="snow"
                            ref={quillRef}
                            modules={modules}
                        />
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
                                {fields.map((faq: any, index: any) => {
                                    return (
                                        <div
                                            key={faq.id}
                                            className="flex items-start gap-x-4"
                                        >
                                            <div className="flex flex-col w-3/4">
                                                <TextInput
                                                    name={`blogQuestions.${index}.question`}
                                                    label={`FAQ ${
                                                        index + 1
                                                    } Question`}
                                                    placeholder="Enter Question"
                                                    defaultValue={faq.question}
                                                    required
                                                />
                                                <InputErrorMessage
                                                    name={'blogQuestions'}
                                                />
                                                <TextArea
                                                    name={`blogQuestions.${index}.answer`}
                                                    label={`FAQ ${
                                                        index + 1
                                                    } Answer`}
                                                    placeholder="Enter Answer"
                                                    // defaultValue={faq.answer}
                                                    required
                                                />
                                                <InputErrorMessage
                                                    name={'blogQuestions'}
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
                                    )
                                })}
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
        </>
    )
}
