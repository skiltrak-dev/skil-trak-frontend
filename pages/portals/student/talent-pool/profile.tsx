import { NextPageWithLayout } from '@types'
import { StudentLayout } from '@layouts'
import { TalentPoolStudentProfile } from '@partials/student/talentPool'
import { ReactElement, useEffect } from 'react'
import {
    Card,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { StudentApi } from '@queries'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { isBrowser } from '@utils'

const Profile: NextPageWithLayout = () => {
    const { data, isError, isLoading } =
        StudentApi.TalentPool.useAppliedTalentPoolStudentProfile()
    const router = useRouter()
    

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Link
                    href={'/portals/student/talent-pool/industry-request'}
                    className="inline-block bg-[#6971DD] px-4 py-1.5 rounded-md text-sm font-medium text-white"
                >
                    View Industry Request
                </Link>
            </div>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : data && Object.keys(data).length > 0 ? (
                <TalentPoolStudentProfile data={data} />
            ) : (
                <EmptyData title={'No Data'} description="No Data" />
            )}
        </div>
    )
}

Profile.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Profile Details' }}>
            {page}
        </StudentLayout>
    )
}

export default Profile
