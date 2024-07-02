import { Select, TextInput } from '@components/inputs'
import { AuthApi, CommonApi } from '@queries'
import { SetQueryFilters } from './SetQueryFilters'
import { StatusOptions } from './StatusOptions'
import { SelectOption } from './types'
import { FindWorkplaceFilter } from '@types'
import { useEffect, useState } from 'react'
import { IndustryListingDepartment } from '@partials/common/FindWorkplaces/enum'

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

    const onSectorChanged = (sectors: any) => {
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

    const departmentOptions = [
        {
            label: 'Employment',
            value: IndustryListingDepartment.EMPLOYMENT,
        },
        {
            label: 'Sourcing',
            value: IndustryListingDepartment.SOURCING,
        },
    ]

    console.log({
        filter: departmentOptions?.find((p) => p?.value === filter?.department),
    })

    return (
        <>
            <SetQueryFilters<FindWorkplaceFilter> filter={filter} />
            <div className="grid grid-cols-3 gap-x-3">
                <TextInput
                    name="businessName"
                    label={'Business Name'}
                    placeholder={'Search by Industry Name ...'}
                    value={filter?.businessName}
                    onChange={(e: any) => {
                        onFilterChange({
                            ...filter,
                            businessName: e.target.value,
                        })
                    }}
                    showError={false}
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
                    showError={false}
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
                    showError={false}
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
                    showError={false}
                />

                <Select
                    label={'Sector'}
                    value={sectorOptions?.find((p: any) => {
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
                    showError={false}
                    validationIcons
                    onlyValue
                />
                <Select
                    name={'department'}
                    label={'Select Department'}
                    options={departmentOptions}
                    value={departmentOptions?.find((d: any) => {
                        d?.value == filter?.department
                    })}
                    onChange={(e: SelectOption) => {
                        onFilterChange({ ...filter, department: e?.value })
                    }}
                    showError={false}
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
