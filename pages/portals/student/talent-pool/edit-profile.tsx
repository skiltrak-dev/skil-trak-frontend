import { NextPageWithLayout } from '@types'
import { StudentLayout } from '@layouts'
import { RegisterNowForm, StudentInfoCard } from '@partials/student/talentPool'
import { ReactElement, useMemo, useState } from 'react'
import { Card, NoData, Typography } from '@components'
import { StudentApi } from '@queries'
import { getUserCredentials } from '@utils'
import { PulseLoader } from 'react-spinners'

const EditProfile: NextPageWithLayout = () => {
    const { data, isLoading, isError, isFetching } =
        StudentApi.TalentPool.useAppliedTalentPoolStudentProfile()
    const [tags, setTags] = useState<any>({
        links: data?.socialLinks || [],
        skills: data?.skills || [],
        areaOfInterest: data?.interest || [],
    })
    const profileId = data?.id
    const [updateTalentPool, updateTalentPoolResult] =
        StudentApi.TalentPool.useUpdateTalentPoolProfile()
    const getUserId = getUserCredentials()?.id
    //  {
    //     refetchOnMountOrArgChange: true,
    // }
    const getSectors = useMemo(() => {
        return data?.student?.courses?.map((course: any) => course?.sector)
    }, [data])
    let sectorId: any = null

    if (getSectors && getSectors.length > 0) {
        sectorId = getSectors[0]?.id
    }
    const onSubmit = (data: any) => {
        updateTalentPool({id: profileId, body: {
            ...data,
            // student: getUserId,
            sector: sectorId,
            socialLinks: tags.links,
            interest: tags.areaOfInterest,
            skills: tags.skills,
        }})
    }
    return (
        <Card noPadding>
            <div className="py-5 px-4">
                <Typography variant={'title'}>
                    Please fill all these fields to Register in Talent Pool
                </Typography>
            </div>
            <div className="flex flex-col md:flex-row">
                {isError && <>Something is not right on Server try again</>}
                <div className="md:w-1/3 md:border-r md:border-t pl-6 pr-8 py-4">
                    {isLoading || isFetching ? (
                        <PulseLoader size={3} color={'#ffffff'} />
                    ) : data && Object.keys(data)?.length > 0 ? (
                        <StudentInfoCard
                            profile={data}
                            getSectors={getSectors}
                        />
                    ) : (
                        !isError && <NoData text="No Profile Info" />
                    )}
                </div>
                <div className="md:w-2/3 md:border-t p-4">
                    <RegisterNowForm
                        tags={tags}
                        setTags={setTags}
                        onSubmit={onSubmit}
                        applyForTalentPoolResult={updateTalentPoolResult}
                        data={data}
                    />
                </div>
            </div>
        </Card>
    )
}

EditProfile.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Register Now' }}>
            {page}
        </StudentLayout>
    )
}

export default EditProfile
