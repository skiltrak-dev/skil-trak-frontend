import { Course } from '@types'

export const SectorCell = ({ courses }: { courses: Course[] }) => {
    return (
        <div className="flex flex-wrap justify-center gap-1">
            {courses?.map((c: Course) => (
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
    )
}
