import { ReactElement, useEffect, useState } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { useGetWorkplaceIndustriesQuery } from '@queries'
import Link from 'next/link'

type Props = {}

const MyWorkPlaces: NextPageWithLayout = (props: Props) => {
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <div className="px-4 py-1 bg-[#F7910F] rounded text-center w-64">
                <Link href="/portals/student/workplace/my-workplace/dont-have-workplace">
                    <a className="text-lg text-white">
                        I don&apos;t have a workplace
                    </a>
                </Link>
            </div>
            <div className="px-4 py-1 bg-[#F7910F] rounded w-52">
                <Link href="/portals/student/workplace/my-workplace/have-workplace">
                    <a className="text-lg text-white text-center">
                        I have a workplace
                    </a>
                </Link>
            </div>
        </div>
    )
}
MyWorkPlaces.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Workplace">{page}</StudentLayout>
}

export default MyWorkPlaces
