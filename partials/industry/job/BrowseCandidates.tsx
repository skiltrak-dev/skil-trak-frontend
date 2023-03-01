import { useEffect, useState } from 'react'

// components
import {
    Card,
    Button,
    EmptyData,
    LoadingAnimation,
    Typography,
    BackButton,
    Select,
    TechnicalError,
} from '@components'
// import { RightSidebarData } from './components'

// hooks
import { useContextBar } from '@hooks'

// query
import { useGetBrowseCandidatesQuery } from '@queries'
import { BrowseCandidateForm } from './form'
import { FutureCandidateCard } from '@components/sections/industry/components'
import { JobsCB } from './contextBar'

export const BrowseCandidatesContainer = () => {
    const { setContent } = useContextBar()
    const [courseId, setCourseId] = useState<any>(null)

    // TODO Check the course ID "KEY" on the backend
    const browseCandidates = useGetBrowseCandidatesQuery(courseId)

    useEffect(() => {
        setContent(
            <>
                <JobsCB />
            </>
        )
    }, [setContent])

    // TODO Error in filters
    return (
        <div className="flex flex-col gap-y-4">
            <BackButton link={'/portals/industry/jobs'} text={'Back To Jobs'} />

            {/*  */}
            <Card>
                <Typography variant={'subtitle'}>
                    Candidate Matching Criteria
                </Typography>

                {/*  */}
                <BrowseCandidateForm setCourseId={setCourseId} />
            </Card>

            {/*  */}
            <Card>
                {/*  */}
                {browseCandidates.isError && <TechnicalError />}

                <div className="mt-4">
                    {browseCandidates.isLoading ? (
                        <LoadingAnimation />
                    ) : browseCandidates.data?.data?.length > 0 ? (
                        <>
                            <Typography variant={'subtitle'}>
                                {browseCandidates?.data?.data?.length}{' '}
                                Candidates Found
                            </Typography>
                            <Typography variant={'muted'} color={'gray'}>
                                These candidates are being shown based on your
                                company preferences
                            </Typography>
                            {browseCandidates?.data?.data?.map(
                                (browseCandidate: any) => (
                                    <FutureCandidateCard
                                        key={browseCandidate.id}
                                        data={browseCandidate}
                                    />
                                )
                            )}
                        </>
                    ) : (
                        !browseCandidates.isError && (
                            <EmptyData
                                title={'No Candidate yet'}
                                description={'No Candidate were found'}
                            />
                        )
                    )}
                </div>
            </Card>
        </div>
    )
}
