import { ReactElement, useEffect } from 'react'

import { StudentLayout } from '@layouts'
import { Industry, NextPageWithLayout } from '@types'

// query
import { Button, Card, LoadingAnimation } from '@components'
import { useJoyRide } from '@hooks'
import { IndustryCard, StudentMyWorkplace } from '@partials/student'
import {
    useGetStudentIndustriesQuery,
    useGetWorkplaceIndustriesQuery,
} from '@queries'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IoBriefcase } from 'react-icons/io5'

type Props = {}

const MyWorkPlaces: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const workplace = useGetWorkplaceIndustriesQuery()
    const industries = useGetStudentIndustriesQuery()

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

    return <StudentMyWorkplace />

    return (
        <>
            {industries.isLoading ? (
                <div className="flex items-center flex-col">
                    <LoadingAnimation />
                    <p>Checking for existing workplace request...</p>
                </div>
            ) : industries?.data && industries?.data?.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-5">
                        {/* Icon Title */}
                        <div className="flex items-center gap-x-2">
                            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex justify-center items-center">
                                <IoBriefcase size={16} />
                            </div>
                            <p className="text-sm font-semibold">Industries</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
                        {industries?.data?.map((industry: Industry) => (
                            <IndustryCard
                                key={industry?.id}
                                industry={industry}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-y-2 w-full">
                    <Card>
                        <p className="text-sm">
                            You can create your workplace request by using
                            either of option
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
                                        I already have workplace, and willing to
                                        provide information about that workplace
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
                                        I don&apos;t have any workplace, So
                                        I&apos;ll want to request one.
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
            )}
        </>
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
