import {
    Button,
    Card,
    Checkbox,
    Select,
    ShowErrorNotifications,
    TextArea,
    TextInput,
    Typography,
    UploadFile,
} from '@components'
import { FileUpload } from '@hoc'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { InputErrorMessage } from '@components/inputs/components'
import { adminApi } from '@queries'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as yup from 'yup'

interface TextEditorProps {
    tagIds?: any
}

export const imageSizeErrorMessage = (file: File) => {
    if (file && file.size && file.size > 2 * 1024 * 1024) {
        return 'Image size must be less than 2MB'
    }
    return true
}

export default function TextEditor({ tagIds }: TextEditorProps) {
    const quillRef = useRef<any>(null)
    const { notification } = useNotification()
    const router = useRouter()
    const [isPublish, setIsPublish] = useState<boolean>(true)
    const [isFeatured, setIsFeatured] = useState(false)
    const [blogPost, setBlogPost] = useState<any>('')
    const [faqList, setFaqList] = useState<
        Array<{ question: string; answer: string }>
    >([{ question: '', answer: '' }])
    const blogPostEnum = {
        Save: 'save',
        SaveAndPublish: 'saveAndPublish',
    }

    const [createBlog, createBlogResult] = adminApi.useCreateBlogMutation()
    const { data, isLoading } = adminApi.useGetCategoriesQuery(undefined)
    // const handleSave = () => {
    //     // const editorContent = quillRef.current.getEditor().getContents()
    //     const html = quillRef.current.getEditor().root.innerHTML
    // }

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
            .matches(
                /^[a-zA-Z\s']+$/,
                'Author name cannot contain special characters'
            )
            .min(3, 'Author must be at least 3 characters')
            .max(20, 'Author cannot exceed 20 characters'),
        category: yup
            .array()
            .min(1, 'Must select at least 1 category')
            .required(),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })
    const { append, remove, fields } = useFieldArray({
        control: formMethods.control,
        name: 'blogQuestions',
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
        if (!data.featuredImage || !data.featuredImage[0]) {
            formMethods.setError('featuredImage', {
                type: 'emptyImage',
                message: 'Image must not be empty',
            })
            return
        }

        if (imageSizeErrorMessage(data.featuredImage[0]) !== true) {
            formMethods.setError('featuredImage', {
                type: 'imageSizeError',
                message: 'Image size must be less than 2MB',
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
        const wordCount = content.trim().split(/\s+/).length
        if (wordCount > 3000) {
            formMethods.setError('content', {
                type: 'exceedsWordLimit',
                message: 'Content should not exceed 3000 words',
            })
            return
        }
        // FAQ's validation
        // if (data?.faq && data?.faq?.length > 0) {
        let isAnyFaqInvalid = false

        data?.faq &&
            data?.faq?.forEach((faq: any, index: number) => {
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

        // data?.faq &&
        //     data?.faq?.forEach((faq: any) => {
        //         if (faq?.question === '' || faq?.answer === '') {
        //             isAnyFaqInvalid = true
        //         }
        //     })

        // if (isAnyFaqInvalid) {
        //     formMethods.setError('blogQuestions', {
        //         type: 'FAQs',
        //         message: 'FAQs Fields Should not be Empty',
        //     })

        //     return
        // }
        // }

        // if (data?.faq.length > 0) {
        //     formMethods.setError('answer', {
        //         type: 'answer',
        //         message: 'Answer Should Not be Empty',
        //     })
        //     return
        // }

        validationSchema
            .validate(data)
            .then(() => {
                // If the validation passes, proceed with form submission
                const formData = new FormData()
                formData.append('featuredImage', data.featuredImage?.[0])
                formData.append('title', data.title)
                formData.append('content', content)
                formData.append('isPublished', publish.toString())
                formData.append('isFeatured', data.isFeatured.toString())
                formData.append('tags', tagIds)
                formData.append('category', data?.category)
                formData.append('author', data?.author)
                formData.append(
                    'blogQuestions',
                    JSON.stringify(data?.faq) || ''
                )

                //POST Api Req
                createBlog(formData)
            })
            .catch((validationError) => {
                notification.error({
                    title: 'Validation Error',
                    description: 'Category is required',
                })
            })
    }

    const options = data?.data?.map((item: any) => ({
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
            if (blogPost === blogPostEnum.Save) {
                router.push('/portals/admin/blogs?tab=draft&page=1&pageSize=50')
            } else if (blogPost === blogPostEnum.SaveAndPublish) {
                router.push(
                    '/portals/admin/blogs?tab=published&page=1&pageSize=50'
                )
            }
        }
    }, [createBlogResult.isSuccess])

    // dynamic fields
    const handleRemoveFAQ = (index: number) => {
        remove(index)
    }

    const handleAddFAQ = () => {
        append({ question: '', answer: '' })
    }
    // const handleAddFAQ = () => {
    //     setFaqList((prevFaqList: any) => [
    //         ...prevFaqList,
    //         { question: '', answer: '' },
    //     ])
    // }

    // const handleRemoveFAQ = (index: number) => {
    //     setFaqList((prevFaqList) => {
    //         const updatedList = [...prevFaqList]
    //         updatedList.splice(index, 1)
    //         return updatedList
    //     })
    // }
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
                    <InputErrorMessage name={'content'} />
                    <div className="mt-4">
                        <Checkbox
                            onChange={handleChecked}
                            name={'isFeatured'}
                            label={'Featured'}
                        />
                    </div>

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
                                            name={`faq[${index}].question`}
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
                                            name={`faq[${index}].answer`}
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
                            {fields.map((faq: any, index: number) => (
                                <div
                                    key={faq.id}
                                    className="flex items-start gap-x-4"
                                >
                                    <div className="flex flex-col w-3/4">
                                        <TextInput
                                            // {...formMethods.register(
                                            //     `faq.${index}.question`
                                            // )}
                                            name={`faq.${index}.question`}
                                            label={`FAQ ${index + 1} Question`}
                                            placeholder="Enter Question"
                                            defaultValue={faq.question}
                                            required
                                        />
                                        <InputErrorMessage
                                            name={'blogQuestions'}
                                        />
                                        <TextArea
                                            // {...formMethods.register(
                                            //     `faq.${index}.answer`
                                            // )}
                                            name={`faq.${index}.answer`}
                                            label={`FAQ ${index + 1} Answer`}
                                            placeholder="Enter Answer"
                                            required
                                        />
                                        <InputErrorMessage
                                            name={'blogQuestions'}
                                        />
                                    </div>
                                    <div className="mt-7">
                                        <Button
                                            text="Remove"
                                            onClick={() => {
                                                handleRemoveFAQ(index)
                                            }}
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

                    <div className="flex items-center gap-x-4">
                        <Button
                            text="Save & Publish"
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
            <InputErrorMessage name={'quill editor'} />
        </div>
    )
}
