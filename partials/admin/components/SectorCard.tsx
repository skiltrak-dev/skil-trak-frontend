import { CourseList } from '@partials/common'
import { Course } from '@types'
import { Typography } from '@components'

export const SectorCard = ({ sector, index }: any) => {
    return (
        <div className="py-2 px-4 bg-white rounded-lg shadow-md">
            <div className=" pb-3">
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Sector Name
                </Typography>
                <Typography variant={'label'}>
                    <span className="break-all">{sector?.name}</span>
                </Typography>
            </div>

            <span className="block">
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Courses
                </Typography>
            </span>

            <CourseList courses={sector?.courses} />
        </div>
    )
}
