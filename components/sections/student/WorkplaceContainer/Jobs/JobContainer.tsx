import { JobCard } from './components/JobCard'

type Props = {}

export const JobContainer = (props: Props) => {
    const jobCardData = [
        {
            jobTitle: 'Disability Support Worker',
            companyName: 'Km Health Services',
            companyLogo: '/url',
            companyLocation: 'Level 10, 440, Collins Street, Melbourne, 3000',
            positions: 25,
            jobType: 'Part-Time',
            contactTo: 'Divya',
            contactNumber: '042 2077 469',
            salary: 'AUD 50 - AUD 80',
            jobDescription:
                'An exciting opportunity has become available to join a forward thinking established company. Working with People with disabilities you will proactively assist and help provide clients with a fulfilled and independent lifestyle. You will ...',
            days: 10,
            timeAgo: 'days ago',
        },
        {
            jobTitle: 'Paid Placement position',
            companyName: 'Carosello',
            companyLogo: '/url',
            companyLocation: 'Level 10, 440, Collins Street, Melbourne, 3000',
            positions: 25,
            jobType: 'Temporary and casual',
            contactTo: 'Elvis',
            contactNumber: '040 5660 022',
            salary: 'AUD 130 - AUD 145',
            jobDescription:
                'Carosello one of best Italian restaurant is now seeking Full time & Casual Kitchen Staff (Placement Students) to join our growing team ...',
            days: 2,
            timeAgo: 'Months Ago',
        },
    ]
    return (
        <div>
            {jobCardData.map((data, index) => (
                <JobCard
                    key={index}
                    jobTitle={data.jobTitle}
                    companyName={data.companyName}
                    companyLogo={data.companyLogo}
                    companyLocation={data.companyLocation}
                    positions={data.positions}
                    jobType={data.jobType}
                    contactTo={data.contactTo}
                    contactNumber={data.contactNumber}
                    salary={data.salary}
                    jobDescription={data.jobDescription}
                    days={data.days}
                    timeAgo={data.timeAgo}
                />
            ))}
        </div>
    )
}
