import { useEffect, useState } from 'react'
import { Select, TextInput } from '@components/inputs'

// query
import { CommonApi } from '@queries'

import { statusOptions } from './statusOptions'
import { SelectOption } from './types'
import { SetQueryFilters } from './SetQueryFilters'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const SubAdminStudentFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    const [rtoOptions, setRtoOptions] = useState<any>([])
    const [industryOptions, setIndustryOptions] = useState<any>([])
    const [coursesOptions, setCoursesOptions] = useState<any>([])

    // query
    const getIndustries = CommonApi.Filter.useIndustries()
    const getRtos = CommonApi.Filter.useSubAdminRtos()
    const getCourses = CommonApi.Filter.useCourses()

    useEffect(() => {
        if (getIndustries.isSuccess) {
            setIndustryOptions(
                getIndustries?.data?.map((industry: any) => ({
                    value: industry?.id,
                    label: industry?.user?.name,
                }))
            )
        }
    }, [getIndustries])

    useEffect(() => {
        if (getRtos.isSuccess) {
            setRtoOptions(
                getRtos?.data?.map((rto: any) => ({
                    value: rto?.id,
                    label: rto?.user?.name,
                }))
            )
        }
    }, [getRtos])

    useEffect(() => {
        if (getCourses.isSuccess) {
            setCoursesOptions(
                getCourses?.data?.map((course: any) => ({
                    value: course?.id,
                    label: course?.title,
                }))
            )
        }
    }, [getCourses])

    return (
        <>
            <SetQueryFilters filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Student Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />
                <TextInput
                    name="email"
                    label={'Email'}
                    placeholder={'Search by Student Email ...'}
                    type={'email'}
                    value={filter?.email}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, email: e.target.value })
                    }}
                />
                <TextInput
                    name="phone"
                    label={'Phone'}
                    placeholder={'Search by Student Phone ...'}
                    value={filter?.phone}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.target.value })
                    }}
                />
                <TextInput
                    name="studentId"
                    label={'Student Id'}
                    placeholder={'Search by Student Id Email ...'}
                    value={filter?.studentId}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, studentId: e.target.value })
                    }}
                />
                <Select
                    label={'Status'}
                    name={'status'}
                    value={statusOptions.find(
                        (status) => status.value === filter?.status
                    )}
                    options={statusOptions}
                    placeholder={'Select Sectors...'}
                    onChange={(e: SelectOption) => {
                        onFilterChange({ ...filter, status: e?.value })
                    }}
                />
                <Select
                    label={'Search By Rto'}
                    name={'rtoId'}
                    options={rtoOptions}
                    placeholder={'Select Search By Rto...'}
                    value={rtoOptions?.find(
                        (rto: SelectOption) =>
                            rto.value === Number(filter?.rtoId)
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, rtoId: e?.value })
                    }}
                    loading={getRtos.isLoading}
                    disabled={getRtos.isLoading}
                />
                <Select
                    label={'Search by Industry'}
                    name={'industryId'}
                    options={industryOptions}
                    placeholder={'Select Industry...'}
                    defaultValue={industryOptions?.find(
                        (industry: SelectOption) =>
                            industry.value === filter?.industryId
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, industryId: e?.value })
                    }}
                    loading={getIndustries.isLoading}
                    disabled={getIndustries.isLoading}
                />
                {/* <Select
                label={'Search by Batch/Class'}
                name={'batchId'}
                options={[{ value: '', label: '' }]}
                placeholder={'Select Batch/Class...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, batchId: e?.value })
                }}
            /> */}
                <Select
                    label={'Search by Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    placeholder={'Select Courses...'}
                    defaultValue={coursesOptions?.find(
                        (course: SelectOption) =>
                            course.value === filter?.courseId
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, courseId: e?.value })
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                />
            </div>
        </>
    )
}
