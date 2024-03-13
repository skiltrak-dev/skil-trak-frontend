import {
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { StudentLayout } from '@layouts'
import { TalentPoolStudentProfile } from '@partials/student/talentPool'
import { StudentApi } from '@queries'
import { NextPageWithLayout } from '@types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const Profile: NextPageWithLayout = () => {
    const { data, isError, isLoading } =
        StudentApi.TalentPool.useAppliedTalentPoolStudentProfile()
    const router = useRouter()

    const requestCount = StudentApi.TalentPool.useIndustryRequestCount()

    return (
        <div>
            <div className="flex justify-end mb-4">
                <div className="relative">
                    <Link
                        href={'/portals/student/talent-pool/industry-request'}
                        className="inline-block bg-[#6971DD] px-4 py-1.5 rounded-md text-sm font-medium text-white"
                    >
                        View Industry Request
                    </Link>
                    {requestCount?.data > 0 ? (
                        <div className="flex justify-center items-center absolute -top-4 -right-3 min-w-6 min-h-6 rounded-full bg-success shadow-md">
                            <Typography variant="small" color={'text-white'} semibold>
                                {requestCount?.data}
                            </Typography>
                        </div>
                    ) : null}
                </div>
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
