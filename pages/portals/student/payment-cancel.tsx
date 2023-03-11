import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { AuthLayout } from '@layouts'
import { LottieAnimation } from '@components'
import { Animations } from '@animations'

const Page: NextPage = () => {
    const router = useRouter()

    return (
        <AuthLayout type="log-in">
                <div className="h-[50vh] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-y-8">
                        <div>
                            <LottieAnimation
                                height={180}
                                width={180}
                                loop={false}
                                animation={Animations.Common.Actions.Error}
                            />
                        </div>

                        <div className="w-5/6 text-center">
                            <p className="text-lg font-semibold">
                                Your Payment Was Canceled!
                            </p>
                            <p className="text-sm text-gray-400">
                                You will be redirected back in a
                                moment...
                            </p>
                        </div>
                    </div>
                </div>
        </AuthLayout>
    )
}

export default Page
