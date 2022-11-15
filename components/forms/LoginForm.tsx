import { Button, Checkbox, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const LoginForm = ({ onSubmit }: { onSubmit: any }) => {
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
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="">
                    <TextInput
                        label={'Email'}
                        name={'email'}
                        type={'email'}
                        placeholder={'Your Email Here...'}
                        validationIcons
                        required
                    />

                    <TextInput
                        label={'Password'}
                        name={'password'}
                        type={'password'}
                        placeholder={'Your Password Here...'}
                        validationIcons
                        required
                    />
                </div>

                <div className="mb-6">
                    <Checkbox name={'rememberMe'} label={'Remember Me'} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <Button
                        submit
                        // disabled={!(isValid && dirty)}
                        // loading={loginResult.isLoading}
                    >
                        Login
                    </Button>

                    <Link href="/auth/forgot-password">
                        <a
                            className={
                                'text-sm font-semibold text-muted hover:text-link transition-all duration-300'
                            }
                        >
                            Forgot Password?
                        </a>
                    </Link>
                </div>
            </form>
        </FormProvider>
    )
}
