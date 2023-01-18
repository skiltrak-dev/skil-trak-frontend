import { Typography } from 'components'

export const SectorCard = ({ sector, index }: any) => {
    return (
        <div className="py-2 bg-white rounded-lg">
            <div className="px-4 pb-3">
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Sector Name
                </Typography>
                <Typography variant={'label'}>
                    <span className="break-all">{sector?.name}</span>
                </Typography>
            </div>

            <span className="px-4 block">
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Courses
                </Typography>
            </span>

            {sector?.courses?.map((course: any, i: number, courses: any) => (
                <div
                    key={course.id}
                    className={`px-4 py-1.5 ${
                        i !== courses.length - 1 ? 'border-b' : ''
                    }  border-secondary-dark`}
                >
                    <Typography variant={'small'}>
                        <span className="break-all font-semibold">
                            {course?.name}
                        </span>
                    </Typography>
                </div>
            ))}
        </div>
    )
}
