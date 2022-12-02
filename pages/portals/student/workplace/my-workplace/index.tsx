import { ReactElement, useEffect, useState } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { useGetWorkplaceIndustriesQuery } from '@queries'
import Link from 'next/link'
import { Card, Button } from '@components'
import Image from 'next/image'
import { useRouter } from 'next/router'

type Props = {}

const MyWorkPlaces: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    return (
        <div className="flex flex-col gap-y-2 w-full">
            <Card>
                <p className="text-sm">
                    You can create your workplace request by using either of
                    option
                </p>

                <div className="flex gap-x-6 mt-4">
                    <div className="border rounded-md p-4 flex flex-col items-center">
                        <Image
                            src="/images/icons/working.png"
                            width={120}
                            height={120}
                        />

                        <div>
                            <p className="font-semibold mt-4 mb-2">
                                Already have a Workplace?
                            </p>
                            <p className="text-sm text-gray-500 w-64 mb-2">
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

                    <div className="border rounded-md p-4 flex flex-col items-center">
                        <Image
                            src="/images/icons/bad-work.png"
                            width={120}
                            height={120}
                        />
                        <div>
                            <p className="font-semibold mt-4 mb-2">
                                Don't have a Workplace?
                            </p>
                            <p className="text-sm text-gray-500 w-64 mb-2">
                                I don't have any workplace, already! So I'll
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
    return <StudentLayout title="Workplace">{page}</StudentLayout>
}

export default MyWorkPlaces
