import { ActionButton } from '@components'
import { useContextBar } from '@hooks'
import { Course, Industry, Rto, Student } from '@types'
import { ViewSectorsCB } from '../contextBar'
import { CourseDot } from './CourseDot'

export const SectorCell = ({ industry }: { industry: Industry }) => {
    const contextBar = useContextBar()

    const onViewSectorClicked = (industry: Industry) => {
        contextBar.setTitle('Sectors & Courses')
        contextBar.setContent(<ViewSectorsCB industry={industry} />)
        contextBar.show()
    }

    return (
        <div className="w-fit">
            <div className="flex flex-col items-center">
                <ActionButton
                    variant="link"
                    onClick={() => onViewSectorClicked(industry)}
                    simple
                >
                    <span className="whitespace-pre">View / Edit</span>
                </ActionButton>

                <div className="flex gap-x-1">
                    {industry?.courses.map((c: Course) => (
                        <CourseDot key={c?.id} course={c} />
                    ))}
                </div>
            </div>
        </div>
    )
}
