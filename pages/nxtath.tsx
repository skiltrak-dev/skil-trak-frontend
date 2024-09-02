import { Button, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { signIn, SignInResponse, useSession } from 'next-auth/react'

export default function SignIn() {
    const router = useRouter()

    const session = useSession()
    console.log({ session })

    useEffect(() => {
        if (session?.data) {
            router.push('/dashboard')
        }
    }, [session, router])

    const handleSubmit = async (values: any, event: any) => {
        event.preventDefault()
        const result = (await signIn('credentials', {
            ...values,
            redirectTo: '/portals/admin',
        })) as SignInResponse

        if (result?.ok) {
            router.push('/dashboard')
        } else {
            console.error('Sign in failed:', result?.error)
        }
    }

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
                onSubmit={(event) =>
                    methods.handleSubmit((values) =>
                        handleSubmit(values, event)
                    )(event)
                }
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

                <div className="mt-4 flex items-center justify-between">
                    <Button
                        submit
                        // disabled={!(isValid && dirty)}
                        // loading={result.isLoading}
                        // disabled={result.isLoading}
                    >
                        Login
                    </Button>

                    <Link legacyBehavior href="/auth/forgot-password">
                        <a
                            className={
                                'text-sm font-semibold underline text-red-500 text-muted hover:text-link transition-all duration-300'
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
