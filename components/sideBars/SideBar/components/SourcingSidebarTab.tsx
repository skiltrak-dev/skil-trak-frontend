import { Button } from '@components/buttons'
import { Select, TextInput } from '@components/inputs'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const SourcingSidebarTab = () => {
    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        mode: 'all',
    })
    const sourcingOptions = [
        {
            label: 'Wali Umar',
            value: 1,
        },
        {
            label: 'Saad',
            value: 2,
        },
        {
            label: 'Hammad Khan',
            value: 3,
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

    const onSubmit = (values: any) => {}
    return (
        <div>
            <FormProvider {...methods}>
                <form className="" onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="p-4">
                        <Select
                            name="sourcing"
                            options={sourcingOptions}
                            label={'Sourcing'}
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
                            name="from"
                            type="date"
                            label={'From'}
                            shadow="shadow-lg"
                        />
                        <TextInput
                            name="to"
                            type="date"
                            label={'To'}
                            shadow="shadow-lg"
                        />
                        <Button
                            submit
                            text="Search"
                            variant="primaryNew"
                            fullWidth
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
