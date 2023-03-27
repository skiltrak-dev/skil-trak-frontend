import { Button, Card, TextInput } from '@components'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type Props = {
    initialValues: any
    onColumnsChange: (columns: any) => void
}

export const SpecifyColumns = ({ initialValues, onColumnsChange }: Props) => {
    const onSubmit = (data: any) => {
        onColumnsChange(data)
    }
    const formMethods = useForm({
        defaultValues: initialValues,
        mode: 'all',
    })

    return (
        <Card>
            <p className="text-sm font-medium text-gray-500">
                Specify Column Names
            </p>
            <FormProvider {...formMethods}>
                <form
                    className="flex flex-col gap-y-4"
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <TextInput label={'ID'} name="id" placeholder="id" />
                        <TextInput
                            label={'Name'}
                            name="name"
                            placeholder="name"
                        />
                        <TextInput
                            label={'Email'}
                            name="email"
                            placeholder="email"
                        />
                        <TextInput
                            label={'Contact'}
                            name="contact"
                            placeholder="contact"
                        />
                        <TextInput
                            label={'Address'}
                            name="address"
                            placeholder="address"
                        />
                        <TextInput
                            label={'State'}
                            name="state"
                            placeholder="state"
                        />
                        <TextInput
                            label={'Zip Code'}
                            name="zipcode"
                            placeholder="zipcode"
                        />
                    </div>
                    <div>
                        <Button text={'Update Columns'} submit />
                    </div>
                </form>
            </FormProvider>
        </Card>
    )
}
