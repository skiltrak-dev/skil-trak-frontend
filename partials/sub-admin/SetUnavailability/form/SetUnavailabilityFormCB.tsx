import { useEffect, useState } from 'react'
import {
    Button,
    TextInput,
    RadioGroup,
    Typography,
    ShowErrorNotifications,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import Link from 'next/link'
import * as Yup from 'yup'

// query
import { useAddUnavailabilityMutation } from '@queries'
import { getDate } from '@utils'
import { useNotification } from '@hooks'

const enum UnavailabilityType {
    FullDay = 'fullDay',
    PartialDay = 'partialDay',
}

export const SetUnavailabilityFormCB = () => {
    const [unavailabilityType, setUnavailabilityType] = useState<string | null>(
        null
    )

    const { notification } = useNotification()

    const [addUnavailability, addUnavailabilityResult] =
        useAddUnavailabilityMutation()

    useEffect(() => {
        if (addUnavailabilityResult.isSuccess) {
            notification.success({
                title: 'Set Unavailability Added',
                description: 'Set Unavailability Added Successfully',
            })
            methods.reset()
            setUnavailabilityType(null)
        }
    }, [addUnavailabilityResult])

    const validationSchema = Yup.object({
        date: Yup.string().required('Date is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        addUnavailability({
            ...values,
            fullDay: values.type === UnavailabilityType.FullDay ? true : false,
            partialDay:
                values.type === UnavailabilityType.PartialDay ? true : false,
        })
    }

    return (
        <>
            <ShowErrorNotifications result={addUnavailabilityResult} />
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
                        min={getDate()}
                        placeholder={'Your Date Here...'}
                        validationIcons
                        required
                    />

                    <RadioGroup
                        name={'type'}
                        options={[
                            {
                                label: 'Full Day',
                                value: UnavailabilityType.FullDay,
                            },
                            {
                                label: 'Partial Day',
                                value: UnavailabilityType.PartialDay,
                            },
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
        </>
    )
}
