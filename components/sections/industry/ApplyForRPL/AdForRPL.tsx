import { useRouter } from 'next/router'
import { useEffect } from 'react'

// components
import { Button } from '@components'
import { useJoyRide } from '@hooks'
import { getUserCredentials } from '@utils'

export const AdForRPL = ({ short }: any) => {
    const router = useRouter()
    const status = getUserCredentials()?.status

    // ADD STUDENT JOY RIDE - START
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [])
    // ADD STUDENT JOY RIDE - END
    return (
        <div
            className={`flex ${
                short ? 'flex-col' : 'flex-col lg:flex-row'
            } items-center gap-x-8`}
        >
            {short ? (
                <img
                    className="h-36 rounded-lg w-full object-cover"
                    src="/images/content/rpl.jpg"
                    alt="Other"
                />
            ) : (
                <img
                    className="h-full rounded-lg"
                    src="/images/content/rpl.jpg"
                    alt="Other"
                    width={180}
                    height={180}
                />
            )}

            <div className={`w-full h-full flex flex-col items-start gap-y-5`}>
                {!short && (
                    <div className="flex flex-col gap-y-2.5">
                        <h2 className="text-2xl font-bold">
                            RPL - Become Qualified Fast.
                        </h2>
                        <p className="text-gray-500">
                            Use your work experience to achieve a nationally
                            recognized qualification.
                        </p>

                        <p className="text-gray-500">
                            Get your experience recognized and the qualification
                            you deserve. All qualification you are awarded by
                            our partnered RTO&apos;s.
                        </p>
                    </div>
                )}

                {/*  */}
                <div id="apply-for-rpl" className={`${short && 'mt-2'}`}>
                    <Button
                        variant={'primary'}
                        onClick={() =>
                            router.push('/portals/industry/tasks/apply-for-rpl')
                        }
                    >
                        Apply For RPL
                    </Button>
                </div>
            </div>
        </div>
    )
}
