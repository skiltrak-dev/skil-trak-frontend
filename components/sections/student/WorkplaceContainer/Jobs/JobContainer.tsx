import { JobCard } from './components/JobCard'

// components
import { LoadingAnimation, EmptyData } from '@components'

// query
import { useGetStudentJobsQuery, useSaveJobMutation } from '@queries'
import { StudentJobType } from 'redux/queryTypes'

type Props = {}

export const JobContainer = (props: Props) => {
    const { data, isSuccess, isLoading, isError } = useGetStudentJobsQuery()

    return (
        <div>
            {isError && 'Error '}
            {isLoading ? (
                <LoadingAnimation />
            ) : data?.data.length ? (
                data?.data?.map((job: StudentJobType, index: number) => (
                    <JobCard
                        key={index}
                        id={job.id}
                        title={job.title}
                        avatar={job.avatar}
                        expiry={job.expiry}
                        salaryTo={job.salaryTo}
                        positions={job.vacancies}
                        savedJobs={job?.savedJobs}
                        salaryFrom={job.salaryFrom}
                        description={job.description}
                        contactPerson={job.contactPerson}
                        employmentType={job.employmentType}
                        phoneNumber={job.industry.phoneNumber}
                        companyName={job.industry.businessName}
                        address={job.addressLine1 + job.addressLine2}
                    />
                ))
            ) : (
                !isError && <EmptyData />
            )}
        </div>
    )
}
