import { Button, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { signIn, useSession } from 'next-auth/react'
import { isAuthenticated, isBrowser } from '@utils'
import { SiteLayout } from '@layouts'

export default function SignIn() {
    const router = useRouter()
    const data = useSession()

    console.log({ data })

    if (isBrowser()) {
        localStorage.setItem('data', String(data))
    }

    const isSSS = isAuthenticated()

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

    const handleSubmit = async (values: any, event: FormEvent) => {
        event.preventDefault()
        try {
            const result = await signIn('credentials', {
                ...values,
                redirect: false,
            })

            console.log({ result })

            if (result?.error) {
                console.error('Sign in failed:', result.error)
                // Handle error (e.g., show error message to user)
            } else {
                router.push('/portals/admin')
            }
        } catch (error) {
            console.error('Sign in error:', error)
            // Handle error (e.g., show error message to user)
        }
    }

    // if (status === 'loading') {
    //     return <div>Loading...</div>
    // }

    // if (session) {
    //     router.push('/dashboard')
    //     return null
    // }

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={(event) => {
                    methods.handleSubmit((values) =>
                        handleSubmit(values, event)
                    )(event)
                }}
            >
                <div className="">
                    <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Your Email Here..."
                        validationIcons
                        required
                    />

                    <TextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Your Password Here..."
                        validationIcons
                        required
                    />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <Button
                        submit
                        // loading={status == 'loading'}
                        // disabled={
                        //     !methods.formState.isValid ||
                        //     !methods.formState.isDirty
                        // }
                    >
                        Login
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

SignIn.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}
