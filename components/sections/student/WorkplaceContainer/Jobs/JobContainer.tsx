import { JobCard } from './components/JobCard'

// components
import { LoadingAnimation } from '@components/LoadingAnimation'

// query
import { useGetStudentJobsQuery, useSaveJobMutation } from '@queries'

type Props = {}

export const JobContainer = (props: Props) => {
    const { data, isSuccess, isLoading, isError } = useGetStudentJobsQuery()

    return (
        <div>
            {isError && 'Error '}
            {isLoading ? (
                <LoadingAnimation />
            ) : data?.data?.length > 0 ? (
                data?.data?.map((job: any, index: any) => (
                    <JobCard
                        key={index}
                        id={job.id}
                        title={job.title}
                        companyName={job.industry.businessName}
                        companyLogo={job.companyLogo}
                        address={job.addressLine1 + job.addressLine2}
                        positions={job.vacancies}
                        employmentType={job.employmentType}
                        contactPerson={job.contactPerson}
                        phoneNumber={job.industry.phoneNumber}
                        salaryFrom={job.salaryFrom}
                        salaryTo={job.salaryTo}
                        description={job.description}
                        days={job.days}
                        expiry={job.expiry}
                        savedJobs={data?.savedJobs}
                    />
                ))
            ) : (
                !isError && 'Empty Data'
            )}
        </div>
    )
}
