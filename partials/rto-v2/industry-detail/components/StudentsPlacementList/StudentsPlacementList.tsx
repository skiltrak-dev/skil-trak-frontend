import {
    ListHeader,
    CategoryFilters,
    StatsOverview,
    StudentsList,
} from './components'

export function StudentsPlacementList() {
    return (
        <div className="space-y-4 px-4">
            {/* Header */}
            <ListHeader />

            {/* Category Filter Buttons - Right to Left */}
            <CategoryFilters />

            {/* Stats Overview */}
            <StatsOverview />

            {/* Students List */}
            <StudentsList />
        </div>
    )
}
