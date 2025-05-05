import { Button, Checkbox, Select } from '@components'
import React, { useState } from 'react'
import { Under3WeeksNeedWorkplace } from './Under3WeeksNeedWorkplace'
import { Over3WeeksNeedWorkplace } from './Over3WeeksNeedWorkplace'
import { Over2MonthsNeedWorkplace } from './Over2MonthsNeedWorkplace'
import { AdminApi } from '@queries'
import { removeEmptyValues } from '@utils'

export enum NeedWorkplaceEnum {
    Under3Weeks = 'UNDER_3_WEEKS',
    Over3Weeks = 'BETWEEN_3WEEKS_2MONTHS',
    Over2Months = 'BEYOND_2_MONTHS',
}

export const NeedAdminWorkplaces = () => {
    const [weeksData, setWeeksData] = useState(NeedWorkplaceEnum.Under3Weeks)
    const [selectedDept, setSelectedDept] = useState(null)

    const [filterData, setFilterData] = useState<
        ('snoozed' | 'nonContactable' | 'flagged')[]
    >([])

    const arrayToObject2 = Object.fromEntries(
        filterData.map((item) => [item, true])
    )

    const counts = AdminApi.Workplace.needWpCount(
        removeEmptyValues({
            depId: selectedDept,
            ...arrayToObject2,
        })
    )
    const departments = AdminApi.Department.getDepartmentFilterList()

    const data = [
        {
            text: `Under 3 Weeks (${counts?.data?.UNDER_3_WEEKS})`,
            value: NeedWorkplaceEnum.Under3Weeks,
            component: Under3WeeksNeedWorkplace,
        },
        {
            text: `Over 3 Weeks (${counts?.data?.BETWEEN_3WEEKS_2MONTHS})`,
            value: NeedWorkplaceEnum.Over3Weeks,
            component: Over3WeeksNeedWorkplace,
        },
        {
            text: `Over 2 Months (${counts?.data?.BEYOND_2_MONTHS})`,
            value: NeedWorkplaceEnum.Over2Months,
            component: Over2MonthsNeedWorkplace,
        },
    ]

    const Component = data?.find((week) => week?.value === weeksData)?.component

    const departmentsOptions = departments?.data?.map((department: any) => ({
        value: department?.id,
        label: department?.name,
    }))

    const filters = [
        { id: 'flagged', label: 'Remove Flagged' },
        { id: 'snoozed', label: 'Remove Snoozed' },
        {
            id: 'nonContactable',
            label: 'Remove Non Contactable',
        },
    ] as const

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                    {data?.map((d) => (
                        <div className="w-48 h-10">
                            <Button
                                text={d?.text}
                                fullWidth
                                fullHeight
                                variant="info"
                                outline={weeksData !== d?.value}
                                onClick={() => {
                                    setWeeksData(d?.value)
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 items-center gap-3">
                    {filters.map((filter) => (
                        <Checkbox
                            key={filter.id}
                            name={filter?.id}
                            id={filter?.id}
                            defaultChecked={filterData?.includes(filter?.id)}
                            onChange={(e: any) => {
                                const data = filterData?.includes(filter?.id)
                                setFilterData(
                                    data
                                        ? filterData?.filter(
                                              (t) => t !== filter?.id
                                          )
                                        : [...filterData, filter?.id]
                                )
                            }}
                            label={filter?.label}
                            showError={false}
                        />
                    ))}
                    <div className="w-64">
                        <Select
                            name={'depId'}
                            options={departmentsOptions}
                            placeholder={'Select Department...'}
                            onChange={(e: any) => {
                                setSelectedDept(e)
                            }}
                            onlyValue
                            showError={false}
                            loading={departments.isLoading}
                            disabled={departments.isLoading}
                        />
                    </div>
                </div>
            </div>
            <div>
                {Component && (
                    <Component
                        selectedDept={selectedDept}
                        filterData={arrayToObject2}
                    />
                )}
            </div>
        </div>
    )
}
