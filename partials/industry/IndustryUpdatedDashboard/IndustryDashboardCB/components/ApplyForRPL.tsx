import { useRouter } from 'next/router'

// components
import { Button, Card, Typography } from '@components'
import Image from 'next/image'

export const ApplyForRPL = ({ short }: any) => {
    const router = useRouter()

    return (
        <div>
            <Card shadowType="profile">
                <div className="flex flex-col  gap-y-[11px]">
                    <div className="grid grid-cols-5 gap-x-2">
                        <div className="col-span-2">
                            <Image
                                src="/images/content/rpl.jpg"
                                alt={'Rpl Image'}
                                width={104}
                                height={104}
                                className="rounded-[3px]"
                            />
                        </div>
                        <div className="col-span-3">
                            <Typography variant="label" semibold>
                                RPL - Become Qualified Fast.
                            </Typography>
                            <Typography variant="xxs" color="text-[#979797]">
                                Use your work experience to achieve a nationally
                                recognized qualification.
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="xxs" color="text-[#979797]">
                        Get your experience recognized and the qualification you
                        deserve. All qualification you are awarded by our
                        partnered RTO's.
                    </Typography>
                    <div className="flex justify-center">
                        <Button
                            variant={'primary'}
                            onClick={() =>
                                router.push(
                                    '/portals/industry/tasks/apply-for-rpl'
                                )
                            }
                        >
                            Apply For RPL
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )

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
