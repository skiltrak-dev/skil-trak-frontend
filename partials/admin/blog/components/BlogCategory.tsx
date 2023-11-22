import { Button, Select, TextInput } from '@components'
import { adminApi } from '@queries'
import { FormProvider, useForm } from 'react-hook-form'

export const BlogCategory = ({ addCategories, addCategoriesResult }: any) => {
    const methods = useForm()

    const { handleSubmit } = methods
    const onSubmitCategories = (data: any) => {
        addCategories(data)
    }

  

    return (
        <>
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
