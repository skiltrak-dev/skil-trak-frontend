import { useState } from 'react'
import { Button, TextInput, RadioGroup, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import Link from 'next/link'
import * as Yup from 'yup'

// query
import { useAddUnavailabilityMutation } from '@queries'

export const SetUnavailabilityFormCB = () => {
    const [unavailabilityType, setUnavailabilityType] = useState<string | null>(
        null
    )

    const [addUnavailability, addUnavailabilityResult] =
        useAddUnavailabilityMutation()
    const validationSchema = Yup.object({
        date: Yup.string().required('Date is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        addUnavailability(values)
    }

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <Typography variant={'small'} color={'text-gray-500'}>
                    Set unavailability for following day
                </Typography>

                <TextInput
                    label={'Date'}
                    name={'date'}
                    type={'date'}
                    placeholder={'Your Date Here...'}
                    validationIcons
                    required
                />

                <RadioGroup
                    name={'type'}
                    options={[
                        { label: 'Full Day', value: 'fullDay' },
                        { label: 'Partial Day', value: 'partialDay' },
                    ]}
                    onChange={(e: any) => {
                        setUnavailabilityType(e.target.value)
                    }}
                />

                {unavailabilityType === 'partialDay' && (
                    <div className="flex items-center gap-x-2 mt-2">
                        <TextInput
                            label={'From'}
                            name={'from'}
                            type={'time'}
                            placeholder={'Unavailable From...'}
                        />
                        <TextInput
                            label={'To'}
                            name={'to'}
                            type={'time'}
                            placeholder={'Unavailable To...'}
                        />
                    </div>
                )}

                <div className="mt-2">
                    <Button
                        submit
                        text={'Save Date'}
                        loading={addUnavailabilityResult.isLoading}
                        disabled={addUnavailabilityResult.isLoading}
                    />
                </div>
            </form>
        </FormProvider>
    )
}
