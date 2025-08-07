import { ActionButton } from '@components'
import { useContextBar } from '@hooks'
import { Course, SubAdmin } from '@types'
import { ViewSectorsCB } from '../contextBar'

export const SectorCell = ({ subAdmin }: { subAdmin: SubAdmin }) => {
    const contextBar = useContextBar()

    const onViewSectorClicked = (subAdmin: SubAdmin) => {
        contextBar.setTitle('Sectors & Courses')
        contextBar.setContent(<ViewSectorsCB subAdmin={subAdmin} />)
        contextBar.show()
    }

    return (
        <div className="w-fit">
            <div className="flex flex-col items-center">
                <ActionButton
                    variant="link"
                    onClick={() => onViewSectorClicked(subAdmin)}
                    simple
                >
                    <span className="whitespace-pre">View / Edit</span>
                </ActionButton>
                {subAdmin?.courses && subAdmin?.courses?.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1">
                        {subAdmin?.courses?.map((c: Course) => (
                            <div className="relative group" key={c?.id}>
                                <div className="w-[9px] h-[9px] rounded-full bg-gray-400 cursor-pointer"></div>
                                <div className="bg-white p-2 rounded-xl shadow-xl z-20 absolute whitespace-nowrap hidden group-hover:block">
                                    <p className="text-xs font-medium text-gray-400">
                                        {c?.sector?.name}
                                    </p>
                                    <p>{c?.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
