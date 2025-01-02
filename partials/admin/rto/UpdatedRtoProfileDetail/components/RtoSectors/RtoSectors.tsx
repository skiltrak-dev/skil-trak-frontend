import { Card, NoData, Typography } from '@components'
import { Course } from '@types'
import { getSectors } from '@utils'
import { RtoCourses } from './RtoCourses'

export const RtoSectors = ({
    userId,
    courses,
}: {
    userId: number
    courses: Course[]
}) => {
    const sectors = getSectors(courses)
    return (
        <Card shadowType="profile" noPadding fullHeight>
            <div className="h-full pb-4">
                <div className="px-4 py-3.5 border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">Sector</span>
                    </Typography>
                </div>

                {/*  */}
                <div className="px-4 pt-4 flex flex-col gap-y-5 h-[calc(506px-72px)] overflow-auto custom-scrollbar">
                    {sectors ? (
                        Object.entries(sectors).map(([sector, courses]) => {
                            return (
                                <div key={sector}>
                                    <Typography
                                        variant={'label'}
                                        color={'text-black'}
                                    >
                                        Sector
                                    </Typography>

                                    <RtoCourses
                                        userId={userId}
                                        sector={sector}
                                        courses={courses}
                                    />
                                </div>
                            )
                        })
                    ) : (
                        <NoData text={'No Sectors Assigned'} />
                    )}
                </div>
            </div>
        </Card>
    )
}
