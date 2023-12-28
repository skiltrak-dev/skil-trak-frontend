import { Button, Select, ShowErrorNotifications, TextInput } from '@components'
import { useNotification } from '@hooks'
import { adminApi } from '@queries'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const BlogCategory = ({ addCategories, addCategoriesResult }: any) => {
    const methods = useForm()
    const { notification } = useNotification()

    // useEffect(() => {
    //     if (addCategoriesResult?.isSuccess) {
    //         notification.success({
    //             title: 'New Category Added',
    //             description: 'New Category Added Successfully',
    //         })
    //     }
    // }, [addCategoriesResult])
    const { handleSubmit } = methods
    const onSubmitCategories = (data: any) => {
        addCategories(data)
            .then((res: any) => {
                notification.success({
                    title: 'New Category Added',
                    description: 'New Category Added Successfully',
                })
            })
            .catch((err: any) => {})
        methods.reset()
    }

    return (
        <>
            <ShowErrorNotifications result={addCategoriesResult} />
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitCategories)}>
                    {/* <Select
                        label="Categories"
                        name="title"
                        options={categoriesOptions}
                        multi
                    /> */}

                    <TextInput name="title" label="Category title" />
                    <Button
                        loading={addCategoriesResult?.isLoading}
                        disabled={addCategoriesResult?.isLoading}
                        submit
                    >
                        Add New Category
                    </Button>
                </form>
            </FormProvider>
        </>
    )
}
