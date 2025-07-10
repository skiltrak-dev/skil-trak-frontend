import moment from 'moment'

export const JobSlide = ({ job }: any) => {
    return (
        <a
            href={job.link}
            className="
        bg-white
        shadow-md
        border-amber-500 border-t-8
        px-3
        py-2
        block
        transition-all
        hover:bg-amber-500
        hover:text-white
        duration-300
        group

        "
        >
            <h4 className="job-title text-xl font-semibold">{job.title}</h4>
            <h5 className="job-provider font-medium">
                {job.industry.business_name}
            </h5>
            <p className="job-salary group-hover:text-white text-theme-secondary text-sm">
                AUD {job.salary.to ? job.salary.to : 0}{' '}
                {job.salary.from &&
                    `- AUD ${job.salary.from ? job.salary.from : 0}`}
            </p>
            <p className="job-posted mt-3.5 text-xs text-amber-500">
                {moment(new Date(job.posted_date)).fromNow()}
            </p>
        </a>
    )
}
