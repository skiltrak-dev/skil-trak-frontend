import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Animations, ANIM_ERROR } from '@animations'
import { LottieAnimation } from '@components'
import { AuthLayout } from '@layouts'
import { useActivateUserMutation } from '@queries'
import { useEffect } from 'react'

const Page: NextPage = () => {
    const router = useRouter()
    const { session_id } = router.query

    const [activateUser, activateUserResult] = useActivateUserMutation()

    useEffect(() => {
        if (session_id && activateUserResult.isUninitialized) {
            activateUser({ session_id })
        }
    }, [session_id])

    useEffect(() => {
        if (activateUserResult.isSuccess) {
            router.push('/portals/student')
        }
    }, [activateUserResult])

    return (
        <AuthLayout type="log-in">
            <div className="h-[50vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-y-8">
                    {activateUserResult.error ? (
                        <>
                            <div>
                                <LottieAnimation
                                    height={180}
                                    width={180}
                                    loop={false}
                                    animation={ANIM_ERROR}
                                />
                            </div>

                            <div className="w-5/6 text-center">
                                <p className="text-lg font-semibold">
                                    Payment Verification Failed!
                                </p>
                                <p className="text-sm text-gray-400">
                                    There was some problem in processing your
                                    payment.
                                </p>
                            </div>
                        </>
                    ) : activateUserResult.isLoading ||
                      activateUserResult.isUninitialized ? (
                        <>
                            <div>
                                <LottieAnimation
                                    height={180}
                                    width={180}
                                    animation={Animations.Common.Loading}
                                />
                            </div>

                            <div className="w-5/6 text-center">
                                <p className="text-lg font-semibold">
                                    Confirming Payment!
                                </p>
                                <p className="text-sm text-gray-400">
                                    Please don&amp;t refresh or close this
                                    page...
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <LottieAnimation
                                    height={180}
                                    width={180}
                                    loop={false}
                                    animation={
                                        Animations.Common.Actions.Success
                                    }
                                />
                            </div>

                            <div className="w-5/6 text-center">
                                <p className="text-lg font-semibold">
                                    Your Payment Was Successful!
                                </p>
                                <p className="text-sm text-gray-400">
                                    You will be redirected to your dashboard in
                                    a moment...
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthLayout>
    )
}

export default Page
