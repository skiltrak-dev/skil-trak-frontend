import { Button, Checkbox, Select, TextArea, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Folder } from '@types'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface CourseFolderFormProps {
    initialValues?: Folder
    onSubmit: any
    edit?: boolean
    onCancel?: Function
}

export const CourseFolderForm = ({
    onSubmit,
    edit,
    initialValues,
    onCancel,
}: CourseFolderFormProps) => {
    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        capacity: yup.number().required('Capacity is Required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="">
                    <div className="flex flex-col">
                        <TextInput
                            label={'Name'}
                            name={'name'}
                            placeholder={'Folder Name...'}
                            required
                        />

                        <TextInput
                            label={'Capacity'}
                            name={'capacity'}
                            type={'number'}
                            placeholder={'Folder Capacity...'}
                            required
                        />

                        <Select
                            name="type"
                            label={'Type'}
                            defaultValue={initialValues?.type}
                            options={[
                                { label: 'Documents', value: 'docs' },
                                { label: 'Images', value: 'images' },
                                { label: 'Videos', value: 'videos' },
                            ]}
                        />

                        <TextArea
                            label={'Description'}
                            name={'description'}
                            placeholder={'Folder Description...'}
                            required
                            validationIcons
                        />

                        <Checkbox label={'Required'} name="isRequired" />
                    </div>

                    <div className="mt-2 flex gap-x-2">
                        <Button submit>
                            {edit ? 'Update Folder' : 'Add Folder'}
                        </Button>
                        {onCancel && (
                            <Button
                                variant="secondary"
                                onClick={() => onCancel()}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
