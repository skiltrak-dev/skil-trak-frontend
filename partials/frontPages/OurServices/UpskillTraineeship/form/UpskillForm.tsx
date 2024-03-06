import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextArea, TextInput } from '@components'

export const UpskillForm = ({
    onSubmit,
}: {
    onSubmit: (values: any) => void
}) => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
        password: Yup.string().required('Password is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })
    return (
        <div>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-3">
                            <TextInput
                                label={'Full Name'}
                                name={'name'}
                                placeholder={'Input your full name in here...'}
                                validationIcons
                                required
                            />
                            <TextInput
                                label={'Email Address'}
                                name={'email'}
                                type={'email'}
                                placeholder={'Your Email Here...'}
                                validationIcons
                                required
                            />
                            <TextInput
                                label={'Phone Number'}
                                name={'phone'}
                                placeholder={'Your Phone Number Here...'}
                                validationIcons
                                required
                            />
                            <TextInput
                                label={'Date of birth'}
                                name={'dob'}
                                type={'date'}
                                placeholder={'Your Date of birth here...'}
                                validationIcons
                                required
                            />
                        </div>

                        {/*  */}
                        <div className="flex flex-col gap-y-3">
                            <TextInput
                                label={'Country'}
                                name={'country'}
                                placeholder={'Your Country here...'}
                                validationIcons
                                required
                                showError={false}
                            />

                            <TextArea
                                label={
                                    'Do you have any qualification in Hospitality or Commercial Cookery?'
                                }
                                name={'qualification'}
                                placeholder={'Write your Answer in here...'}
                                validationIcons
                                required
                                showError={false}
                            />
                            <TextArea
                                label={
                                    'How much experience do you have in Hospitality or Commercial Cookery industry?'
                                }
                                name={'hospitality'}
                                placeholder={'Write your Answer in here...'}
                                validationIcons
                                required
                                showError={false}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between w-3/5 mx-auto">
                        <Button fullWidth submit>
                            Submit
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
