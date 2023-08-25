import { Select, TextInput } from '@components/inputs'
import { AuthApi, CommonApi } from '@queries'
import { SetQueryFilters } from './SetQueryFilters'
import { statusOptions } from './statusOptions'
import { SelectOption } from './types'
import { FindWorkplaceFilter } from '@types'
import { useEffect, useState } from 'react'

interface ItemFilterProps {
    onFilterChange: (values: any) => void
    filter: any
}

export const FindWorkplaceFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    const sectorResponse = AuthApi.useSectors({})
    const [sectorOptions, setSectorOptions] = useState<any>([])
    const [courseOptions, setCourseOptions] = useState([])
    const [courseLoading, setCourseLoading] = useState(false)

    const onSectorChanged = (sectors: any) => {
        setCourseLoading(true)

        const sectorExisting = sectorResponse?.data?.find((sector: any) => {
            sector.name === sectors?.value
        })
        const newCourseOptions: any = []
        sectorExisting?.courses?.map((course: any) =>
            newCourseOptions.push({
                label: course.title,
                value: course.id,
            })
        )
        setCourseOptions(newCourseOptions)
        setCourseLoading(false)
    }

    useEffect(() => {
        if (sectorResponse.data?.length) {
            const options = sectorResponse.data?.map((sector: any) => ({
                label: sector.name,
                value: sector.name,
            }))
            setSectorOptions(options)
        }
    }, [sectorResponse?.data])
    

    return (
        <>
            <SetQueryFilters<FindWorkplaceFilter> filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
                <TextInput
                    name="businessName"
                    label={'Business Name'}
                    placeholder={'Search by Industry Name ...'}
                    value={filter?.businessName}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, businessName: e.target.value })
                    }}
                />
                <TextInput
                    name="email"
                    label={'Email'}
                    placeholder={'Search by Email ...'}
                    type={'text'}
                    value={filter?.email}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, email: e.target.value })
                    }}
                />
                <TextInput
                    name="phone"
                    label={'Phone'}
                    placeholder={'Search by Phone ...'}
                    type={'text'}
                    value={filter?.phone}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.target.value })
                    }}
                />
                <TextInput
                    name="address"
                    label={'Address'}
                    placeholder={'Search by Address ...'}
                    type={'text'}
                    value={filter?.address}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, address: e.target.value })
                    }}
                />

                <Select
                    label={'Sector'}
                    defaultValue={sectorOptions?.find((p: any) => {
                        p.value === filter?.sector
                    })}
                    name={'sector'}
                    options={sectorOptions}
                    placeholder={'Select Sectors...'}
                    loading={sectorResponse.isLoading}
                    onChange={(e: any) => {
                        onSectorChanged(e)
                        onFilterChange({ ...filter, sector: e })
                    }}
                    validationIcons
                    onlyValue
                />
                {/* <Select
                    label={'Search by is contacted'}
                    name={'isContacted'}
                    options={contactedOptions}
                    placeholder={'Select is contacted or Not...'}
                    defaultValue={contactedOptions?.find(
                        (p: any) => p.value === filter?.isContacted
                    )}
                    onChange={(e: any) => {
                        onFilterChange({
                            ...filter,
                            isContacted: e?.value,
                        })
                    }}
                    // loading={getCourses.isLoading}
                    // disabled={getCourses.isLoading}
                /> */}
            </div>
        </>
    )
}
