import { Checkbox } from '@components/inputs'
import React from 'react'

type FilterType = 'flagged' | 'snoozed' | 'nonContactable'

interface MyStudentQuickFiltersProps {
    setSnoozed: (value: boolean) => void
    setFlagged: (value: boolean) => void
    setNonContactable: (value: boolean) => void
    snoozed: boolean
    flagged: boolean
    nonContactable: boolean
}

export const MyStudentQuickFilters = ({
    setSnoozed,
    setFlagged,
    setNonContactable,
    snoozed,
    flagged,
    nonContactable,
}: MyStudentQuickFiltersProps) => {
    
    const handleCheckboxChange = (selectedFilter: FilterType) => {
        // Create an object to store all the setter functions
        const setters = {
            flagged: setFlagged,
            snoozed: setSnoozed,
            nonContactable: setNonContactable,
        }

        // Get current state of the selected filter
        const currentValue = {
            flagged,
            snoozed,
            nonContactable,
        }[selectedFilter]

        // If the checkbox was already checked, just uncheck it
        if (currentValue) {
            setters[selectedFilter](false)
            return
        }

        // Reset all filters
        Object.keys(setters).forEach((key) => {
            setters[key as FilterType](false)
        })

        // Set the selected filter to true
        setters[selectedFilter](true)
    }

    const filters = [
        { id: 'flagged', label: 'Flagged', value: flagged },
        { id: 'snoozed', label: 'Snoozed', value: snoozed },
        {
            id: 'nonContactable',
            label: 'Non Contactable',
            value: nonContactable,
        },
    ] as const

    return (
        <div className="flex items-center gap-4">
            {filters.map((filter) => (
                <div key={filter.id} className="flex items-center space-x-2">
                    <Checkbox
                        name={filter?.id}
                        id={filter?.id}
                        defaultChecked={filter?.value}
                        onChange={() =>
                            handleCheckboxChange(filter?.id as FilterType)
                        }
                        label={filter?.label}
                    />
                </div>
            ))}
        </div>
    )
}
