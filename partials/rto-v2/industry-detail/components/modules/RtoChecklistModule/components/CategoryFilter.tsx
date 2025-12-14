interface CategoryFilterProps {
    categories: string[]
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

export function CategoryFilter({
    categories,
    selectedCategory,
    onCategoryChange,
}: CategoryFilterProps) {
    return (
        <div className="flex gap-1.5 overflow-x-auto pb-2">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                        selectedCategory === category
                            ? 'bg-gradient-to-br from-[#044866] to-[#0D5468] text-white shadow-md'
                            : 'bg-[#F8FAFB] text-[#64748B] hover:bg-[#E8F4F8] border border-[#E2E8F0]'
                    }`}
                >
                    {category === 'all' ? 'All Items' : category}
                </button>
            ))}
        </div>
    )
}
