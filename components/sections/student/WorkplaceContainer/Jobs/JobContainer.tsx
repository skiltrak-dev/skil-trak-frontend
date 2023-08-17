import { JobCard } from './components/JobCard'

// components
import { LoadingAnimation, EmptyData, TechnicalError } from '@components'

// query
import { useGetStudentJobsQuery, useSaveJobMutation } from '@queries'
import { StudentJobType } from 'redux/queryTypes'

type Props = {}

export const JobContainer = (props: Props) => {
    const { data, isSuccess, isLoading, isError } = useGetStudentJobsQuery()

    return (
        <div>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : data?.data && data?.data?.length > 0 && isSuccess ? (
                data?.data?.map((job: StudentJobType, index: number) => (
                    <JobCard key={index} job={job} savedJobs={job?.savedJobs} />
                ))
            ) : (
                !isError &&
                isSuccess && (
                    <EmptyData
                        title={'No Jobs were found'}
                        description={'No Active jobs were found'}
                    />
                )
            )}
        </div>
    )
}
