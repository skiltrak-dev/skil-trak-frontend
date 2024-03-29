import {
    Button,
    Checkbox,
    LoadingAnimation,
    TextInput,
    Typography,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginCredentials } from '@types'
import Link from 'next/link'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const ManagementLoginForm = ({
    onSubmit,
    result,
}: {
    onSubmit: SubmitHandler<LoginCredentials>
    result: any
}) => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
        password: Yup.string().required('Password is required'),
    })

    const methods = useForm<LoginCredentials>({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    return result.isLoading || result.isSuccess ? (
        <div className="min-h-[268px] flex flex-col items-center justify-center">
            <LoadingAnimation />
            <div className="text-center">
                <p className="font-semibold text-blue-500">Logging You In...</p>
                <p className="text-sm text-gray-500">Please wait...</p>
            </div>
        </div>
    ) : (
        <FormProvider {...methods}>
            <form className="" onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="">
                    <TextInput
                        label={'Email'}
                        name={'email'}
                        type={'email'}
                        placeholder={'Your Email Here...'}
                        shadow="shadow-md"
                        validationIcons
                        required
                    />

                    <div className="">
                        <TextInput
                            label={'Password'}
                            name={'password'}
                            type={'password'}
                            placeholder={'Your Password Here...'}
                            shadow="shadow-md"
                            validationIcons
                            required
                        />
                    </div>

                    {/* <Checkbox name={'remember'} label={'Remember Me'} /> */}
                    <div className="mt-4 w-full text-center">
                        <Button
                            submit
                            // disabled={!(isValid && dirty)}
                            loading={result.isLoading}
                            disabled={result.isLoading}
                            variant={'primaryNew'}
                            text="Login"
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
