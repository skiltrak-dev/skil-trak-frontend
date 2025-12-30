import { Search, X } from 'lucide-react'
import { TextInput, Select } from '@components'
import { RtoV2Api } from '@redux'
import { State } from 'country-state-city'
import { Course } from '@types'

interface IndustryFilterBarProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    courseId: string
    onCourseChange: (value: any) => void
    filterStatus: string
    onStatusChange: (value: any) => void
    filterState: string
    onStateChange: (value: any) => void
}

const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'verified', label: 'Verified' },
    { value: 'unverified', label: 'Unverified' },
    { value: 'pending', label: 'Pending' },
    { value: 'inactive', label: 'Inactive' },
]

const stateOptions = [
    { value: 'all', label: 'All States' },
    ...State.getStatesOfCountry('AU').map((state) => ({
        value: state.name,
        label: state.name,
    })),
]

export const IndustryFilterBar = ({
    searchTerm,
    onSearchChange,
    courseId,
    onCourseChange,
    filterStatus,
    onStatusChange,
    filterState,
    onStateChange,
}: IndustryFilterBarProps) => {
    const { data: courses } = RtoV2Api.Courses.rtoCourses()

    const coursesOptions = [
        { value: 'all', label: 'All Courses' },
        ...(courses?.map((course: Course) => ({
            label: course.title,
            value: course.id.toString(),
        })) || []),
    ]
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <TextInput
                        name="search"
                        placeholder="Search industries by name, location, or ABN..."
                        value={searchTerm}
                        onChange={(e: any) => onSearchChange(e.target.value)}
                        className="pl-10"
                        showError={false}
                    />
                </div>
                <div className="flex flex-wrap items-center gap-2 pb-1 sm:pb-0">
                    <div className="w-60">
                        <Select
                            name="course"
                            options={coursesOptions}
                            value={coursesOptions.find(
                                (opt) => opt.value === courseId
                            )}
                            onChange={onCourseChange}
                            placeholder="Course"
                            className="min-w-[160px]"
                            showError={false}
                        />
                    </div>
                    <div className="w-60">
                        <Select
                            name="state"
                            options={stateOptions}
                            value={stateOptions.find(
                                (opt) => opt.value === filterState
                            )}
                            onChange={onStateChange}
                            placeholder="State"
                            showError={false}
                        />
                    </div>

                </div>
            </div>

            {(searchTerm ||
                courseId !== 'all' ||
                filterState !== 'all' ||
                filterStatus !== 'all') && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/10">
                        <span className="text-xs font-medium text-muted-foreground mr-1">
                            Active Filters:
                        </span>
                        {searchTerm && (
                            <FilterTag
                                label={`Search: ${searchTerm}`}
                                onRemove={() => onSearchChange('')}
                            />
                        )}
                        {courseId !== 'all' && (
                            <FilterTag
                                label={`Course: ${coursesOptions.find((c) => c.value === courseId)
                                        ?.label || courseId
                                    }`}
                                onRemove={() => onCourseChange({ value: 'all' })}
                            />
                        )}
                        {filterState !== 'all' && (
                            <FilterTag
                                label={`State: ${filterState}`}
                                onRemove={() => onStateChange({ value: 'all' })}
                            />
                        )}
                        {filterStatus !== 'all' && (
                            <FilterTag
                                label={`Status: ${statusOptions.find(
                                    (s) => s.value === filterStatus
                                )?.label || filterStatus
                                    }`}
                                onRemove={() => onStatusChange({ value: 'all' })}
                            />
                        )}
                        <button
                            onClick={() => {
                                onSearchChange('')
                                onCourseChange({ value: 'all' })
                                onStateChange({ value: 'all' })
                                onStatusChange({ value: 'all' })
                            }}
                            className="text-xs font-medium text-primary hover:underline hover:text-primary/80 transition-colors ml-1"
                        >
                            Clear All
                        </button>
                    </div>
                )}
        </div>
    )
}

const FilterTag = ({
    label,
    onRemove,
}: {
    label: string
    onRemove: () => void
}) => (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/5 border border-primary/10 text-[11px] font-medium text-primary-dark group hover:bg-primary/10 transition-colors">
        {label}
        <button
            onClick={onRemove}
            className="p-0.5 rounded-full hover:bg-primary/20 transition-colors"
        >
            <X className="h-3 w-3" />
        </button>
    </div>
)
