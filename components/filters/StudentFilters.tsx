import { Select, TextInput } from '@components/inputs'
import { useEffect, useState } from 'react'

// query
import { CommonApi } from '@queries'

import { AuthUtils } from '@utils'
import { statusOptions } from './statusOptions'
import { SelectOption } from './types'
import { SetQueryFilters } from './SetQueryFilters'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const StudentFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
    const [rtoOptions, setRtoOptions] = useState<any>([])
    const [industryOptions, setIndustryOptions] = useState<any>([])
    const [coursesOptions, setCoursesOptions] = useState<any>([])

    // query
    const getIndustries = CommonApi.Filter.useIndustries()
    const getRtos = CommonApi.Filter.useRtos()
    const getCourses = CommonApi.Filter.useCourses()
    const getUserRole = AuthUtils.getUserCredentials()

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
            <div className="grid grid-cols-3 gap-x-3">
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Student Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        // router.push({
                        //     pathname: '/portals/admin/student',
                        //     query: {
                        //         tab: 'active',
                        //         page: 1,
                        //         pageSize: 50,
                        //         name: e.target.value,
                        //     },
                        // })
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
                    value={filter?.phone}
                    placeholder={'Search by Student Phone ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.target.value })
                    }}
                />
                <TextInput
                    name="studentId"
                    label={'Student Id'}
                    value={filter?.studentId}
                    placeholder={'Search by Student Id Email ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, studentId: e.target.value })
                    }}
                />
                <Select
                    label={'Status'}
                    name={'status'}
                    defaultValue={statusOptions.find(
                        (status) => status.value === filter?.status
                    )}
                    options={statusOptions}
                    placeholder={'Select Sectors...'}
                    onChange={(e: SelectOption) => {
                        onFilterChange({ ...filter, status: e?.value })
                    }}
                />
                {getUserRole?.role !== 'rto' && (
                    <Select
                        label={'Search By Rto'}
                        name={'rtoId'}
                        defaultValue={rtoOptions?.find(
                            (rto: SelectOption) => rto.value === filter?.rtoId
                        )}
                        options={rtoOptions}
                        placeholder={'Select Search By Rto...'}
                        onChange={(e: SelectOption) => {
                            onFilterChange({ ...filter, rtoId: e?.value })
                        }}
                        loading={getRtos.isLoading}
                        disabled={getRtos.isLoading}
                    />
                )}
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
                options={[]}
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
