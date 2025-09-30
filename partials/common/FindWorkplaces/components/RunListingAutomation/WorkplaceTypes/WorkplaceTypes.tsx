import { LoadingAnimation, NoData, Typography } from '@components'
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
            formContext.setValue(name, wpTypes?.data?.[0]?.name)
        }
    }, [wpTypes?.data])

    const selectedWorkplaceTypes = formContext.watch(name)

    const toggleWorkplaceType = (type: string) => {
        formContext.setValue(name, type)
    }
    return (
        <div className="w-full flex flex-col space-y-1">
            <Typography variant="label">Workplace Types</Typography>
            <div className="w-full flex flex-wrap gap-1">
                {wpTypes?.isError ? (
                    <NoData
                        simple
                        isError
                        text="There is some technical issue!"
                    />
                ) : (
                    ''
                )}
                {wpTypes?.isLoading ? (
                    <div className="w-60">
                        <LoadingAnimation size={45} height="h-fit" />
                    </div>
                ) : wpTypes?.data && wpTypes?.data?.length > 0 ? (
                    wpTypes?.data?.map((type: WorkplaceType) => (
                        <WorkplaceTypeBadge
                            key={type?.id}
                            type={type}
                            // isSelected={selectedWorkplaceTypes?.includes(
                            //     type?.id
                            // )}
                            isSelected={selectedWorkplaceTypes === type?.name}
                            onToggle={toggleWorkplaceType}
                        />
                    ))
                ) : (
                    <NoData simple text="No Workplace types were found!" />
                )}
            </div>
            <InputErrorMessage name={name} />
        </div>
    )
}
