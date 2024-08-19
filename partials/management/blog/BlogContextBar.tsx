import {
    Controller,
    FormProvider,
    useForm,
    useFormContext,
} from 'react-hook-form'
import { Button, Select, TextInput } from '@components'
import { useState } from 'react'
import { BlogCategory } from './components'

export const BlogContextBar = ({
    data,
    addTags,
    addCategories,
    addCategoriesResult,
}: {
    data?: any
    addTags?: any
    addCategories?: any
    addCategoriesResult?: any
}) => {
    const [tags, setTags] = useState<any>([])
    const methods = useForm()
    const { handleSubmit, control } = methods

    const handleTagEnter = (e: any) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            const newTag = e.target.value.trim()
            setTags((prevTags: any) => [...prevTags, newTag])
        }
    }

    const handleRemoveTag = (tagToRemove: any) => {
        setTags((prevTags: any) =>
            prevTags.filter((tag: any) => tag !== tagToRemove)
        )

        // Send a delete request here to remove the tag
    }

    const onSubmit = (data: any) => {
        addTags(data)
        methods.setValue('title', '')
    }

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <Controller
                            name="title"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Enter tags and press Enter"
                                    onKeyDown={handleTagEnter}
                                    className="border px-2 text-sm py-1 focus:outline-none w-full"
                                />
                            )}
                        />
                    </div>

                    <div className="flex flex-wrap gap-x-2 gap-y-2 mt-3">
                        {tags?.map((tag: any, index: any) => (
                            <div
                                key={index}
                                className="tag text-xs font-medium bg-gray-100 px-2 py-1 rounded-sm"
                            >
                                {tag}
                                <span
                                    className="p-1 ml-2 cursor-pointer"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    &times;
                                </span>
                            </div>
                        ))}
                    </div>
                </form>
            </FormProvider>
            <BlogCategory
                addCategories={addCategories}
                addCategoriesResult={addCategoriesResult}
            />
        </>
    )
}
