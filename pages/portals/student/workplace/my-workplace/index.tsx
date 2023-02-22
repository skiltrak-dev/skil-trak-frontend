import { ReactElement, useEffect, useState } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { useGetWorkplaceIndustriesQuery } from '@queries'
import Link from 'next/link'
import { Card, Button, LoadingAnimation } from '@components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useJoyRide } from '@hooks'

type Props = {}

const MyWorkPlaces: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const workplace = useGetWorkplaceIndustriesQuery()

    useEffect(() => {
        if (workplace.isSuccess && workplace.data?.length) {
            const currentRequest = workplace.data[0]
            if (
                currentRequest.studentProvidedWorkplace ||
                currentRequest.byExistingAbn
            ) {
                router.push(
                    '/portals/student/workplace/my-workplace/have-workplace'
                )
            } else {
                router.push(
                    '/portals/student/workplace/my-workplace/dont-have-workplace'
                )
            }
        }
    }, [workplace])
    // WORKPLACE JOY RIDE - END
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 2 })
            }, 1200)
        }
    }, [])
    // WORKPLACE JOY RIDE - END

    return workplace.isLoading ||
        (workplace.isSuccess && workplace.data?.length) ? (
        <div className="flex items-center flex-col">
            <LoadingAnimation />
            <p>Checking for existing workplace request...</p>
        </div>
    ) : (
        <div className="flex flex-col gap-y-2 w-full">
            <Card>
                <p className="text-sm">
                    You can create your workplace request by using either of
                    option
                </p>

                <div className="flex flex-col md:flex-row gap-y-3 gap-x-6 mt-4">
                    <div
                        id="i-have-workplace"
                        className="border rounded-md p-4 flex flex-col items-center"
                    >
                        <Image
                            src="/images/icons/working.png"
                            width={120}
                            height={120}
                            alt=""
                        />

                        <div>
                            <p className="font-semibold mt-4 mb-2">
                                Already have a Workplace?
                            </p>
                            <p className="text-sm text-gray-500 w-full md:w-64 mb-2">
                                I already have workplace, and willing to provide
                                information about that workplace
                            </p>
                            <Button
                                text="Proceed With Workplace"
                                onClick={() => {
                                    router.push(
                                        '/portals/student/workplace/my-workplace/have-workplace'
                                    )
                                }}
                            />
                        </div>
                    </div>

                    <div
                        id="i-dont-have-workplace"
                        className="border rounded-md p-4 flex flex-col items-center"
                    >
                        <Image
                            src="/images/icons/bad-work.png"
                            width={120}
                            alt=""
                            height={120}
                        />
                        <div>
                            <p className="font-semibold mt-4 mb-2">
                                Don&apos;t have a Workplace?
                            </p>
                            <p className="text-sm text-gray-500 w-full md:w-64 mb-2">
                                I don&apos;t have any workplace, So I&apos;ll
                                want to request one.
                            </p>
                            <Button
                                text="Proceed With No Workplace"
                                onClick={() => {
                                    router.push(
                                        '/portals/student/workplace/my-workplace/dont-have-workplace'
                                    )
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
MyWorkPlaces.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout
            pageTitle={{ title: 'My Workplace', backTitle: 'Workplace' }}
        >
            {page}
        </StudentLayout>
    )
}

export default MyWorkPlaces
