import ProfileCompletionProgress from './ProfileCompletionProgress'

export const IndustryProfileProgressWithPopover = ({
    completedItems,
    totalItems,
    incompleteItems,
}: any) => {
    // TODO: to be deleted if not in use
    return (
        <div className="relative inline-block group !z-10">
            {/* Progress Bar */}
            <ProfileCompletionProgress
                completedItems={completedItems}
                totalItems={totalItems}
            />

            {/* Animated Popover */}
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-64 !z-30 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out">
                <p className="font-semibold mb-2 text-gray-800 text-sm">
                    🚩 Incomplete Profile Items
                </p>
                {incompleteItems.length ? (
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        {incompleteItems.map((item: any) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-green-600 text-sm">
                        All profile items completed 🎉
                    </p>
                )}
            </div>
        </div>
    )
}
