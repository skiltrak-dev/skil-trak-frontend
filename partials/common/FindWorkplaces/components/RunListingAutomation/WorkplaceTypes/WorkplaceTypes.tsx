import { Typography } from '@components'
import { InputErrorMessage } from '@components/inputs/components'
import { CommonApi } from '@queries'
import { WorkplaceType } from '@types'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { WorkplaceTypeBadge } from './WorkplaceTypeBadge'

export const WorkplaceTypes = ({
    selectedSector,
    name,
}: {
    name: string
    selectedSector: number
}) => {
    const formContext = useFormContext()

    const wpTypes = CommonApi.Courses.getSectorWPTypes(selectedSector, {
        skip: !selectedSector,
    })

    useEffect(() => {
        if (wpTypes?.data && wpTypes?.data?.length > 0) {
            formContext.setValue(
                name,
                wpTypes?.data?.map((wpType: WorkplaceType) => wpType?.id)
            )
        }
    }, [wpTypes?.data])

    const selectedWorkplaceTypes = formContext.watch(name)

    const toggleWorkplaceType = (type: number) => {
        const updatedFilters = selectedWorkplaceTypes.includes(type)
            ? selectedWorkplaceTypes.filter((t: number) => t !== type)
            : [...selectedWorkplaceTypes, type]

        formContext.setValue(name, updatedFilters)
    }
    return (
        <div className="w-full flex flex-col space-y-1">
            <Typography variant="label">Workplace Types</Typography>
            <div className="w-full flex flex-wrap gap-1">
                {wpTypes?.data?.map((type: WorkplaceType) => (
                    <WorkplaceTypeBadge
                        key={type?.id}
                        type={type}
                        isSelected={selectedWorkplaceTypes?.includes(type?.id)}
                        onToggle={toggleWorkplaceType}
                    />
                ))}
            </div>
            <InputErrorMessage name={name} />
        </div>
    )
}
