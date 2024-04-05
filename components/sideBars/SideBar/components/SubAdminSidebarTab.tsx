import { Button } from '@components/buttons'
import { Select, TextInput } from '@components/inputs'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
export const SubAdminSidebarTab = () => {
    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        mode: 'all',
    })
    const subAdminOptions = [
        {
            label: 'Haroon Aziz',
            value: 1,
        },
        {
            label: 'Asfand',
            value: 2,
        },
        {
            label: 'Adeel',
            value: 3,
        },
        {
            label: 'Harris',
            value: 4,
        },
    ]

    const rangeOptions = [
        {
            label: 'Weekly',
            value: 1,
        },
        {
            label: 'Monthly',
            value: 2,
        },
        {
            label: 'Yearly',
            value: 3,
        },
    ]
    const onSubmit = async (values: any) => {
        console.log('values', values)
    }
    return (
        <div>
            <FormProvider {...methods}>
                <form
                    className=""
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="p-4">
                        <Select
                            name="subadmin"
                            options={subAdminOptions}
                            label={'Sub-Admin'}
                            shadow="shadow-lg"
                        />
                        <Select
                            name="range"
                            options={rangeOptions}
                            label={'Result'}
                            shadow="shadow-lg"
                        />
                    </div>
                    <div className="bg-white p-4 w-full">
                        <TextInput
                            shadow="shadow-lg"
                            name="from"
                            type="date"
                            label={'From'}
                        />
                        <TextInput
                            shadow="shadow-lg"
                            name="to"
                            type="date"
                            label={'To'}
                        />
                        <Button submit text="Search" variant="primaryNew" fullWidth />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
