import { ActionButton } from '@components'
import { useContextBar } from '@hooks'
import { Course, Rto } from '@types'
import { ViewSectorsCB } from '../contextBar'

export const SectorCell = ({ rto }: { rto: Rto }) => {
    const contextBar = useContextBar()

    const onViewSectorClicked = (rto: Rto) => {
        contextBar.setTitle('Sectors & Courses')
        contextBar.setContent(<ViewSectorsCB rto={rto} />)
        contextBar.show()
    }

    return (
        <div className="w-fit">
            <div className="flex flex-col items-center">
                <ActionButton
                    variant="link"
                    onClick={() => onViewSectorClicked(rto)}
                    simple
                >
                    <span className="whitespace-pre">View / Edit</span>
                </ActionButton>
                <div className="flex gap-x-1">
                    {rto.courses.map((c: Course) => (
                        <div className="relative group" key={c.id}>
                            <div className="w-[9px] h-[9px] rounded-full bg-gray-400 cursor-pointer"></div>
                            <div className="bg-white p-2 rounded-xl shadow-xl z-20 absolute whitespace-nowrap hidden group-hover:block">
                                <p className="text-xs font-medium text-gray-400">
                                    {c.sector.name}
                                </p>
                                <p>{c.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
