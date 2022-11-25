import { Typography } from 'components'

export const SectorCard = ({ sector, index }: any) => {
    return (
        <div className="py-2 bg-white rounded-lg">
            <div className="px-4 pb-3">
                <Typography variant={'muted'} color={'gray'}>
                    Sector Name
                </Typography>
                <Typography variant={'body'}>
                    <span className="break-all">{sector?.name}</span>
                </Typography>
            </div>

            <span className="px-4 block">
                <Typography variant={'muted'} color={'gray'}>
                    Courses
                </Typography>
            </span>

            {sector?.courses?.map((course, i, courses) => (
                <div
                    key={i}
                    className={`p-4 ${
                        i !== courses.length - 1 ? 'border-b' : ''
                    }  border-secondary-dark`}
                >
                    <Typography variant={'label'}>
                        <span className="break-all">{course?.name}</span>
                    </Typography>
                </div>
            ))}
        </div>
    )
}
