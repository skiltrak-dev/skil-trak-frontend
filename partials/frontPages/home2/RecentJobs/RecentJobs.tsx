import { Typography } from '@components'
import { MediaQueries } from '@constants'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { JobsSlider } from './components'

const RecentJobs = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    return (
        <div className="relative py-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-y-">
                <div className="flex flex-col md:flex-row gap-y-1 justify-center md:justify-between items-center">
                    <Typography
                        variant={isMobile ? 'title' : 'h2'}
                        {...(isMobile
                            ? {
                                  center: true,
                              }
                            : {})}
                        bold
                    >
                        Recent Jobs From Our Partners
                    </Typography>
                    <div className="flex justify-end">
                        <Link href={'/jobs'} legacyBehavior>
                            <a className="underline text-primary text-[15px] font-bold">
                                View All Job
                            </a>
                        </Link>
                    </div>
                </div>

                {/* Jobs */}
                <div className="pt-6">
                    <JobsSlider />
                </div>
            </div>
        </div>
    )
}

export default RecentJobs
