import { useEffect, useState } from 'react'
import { Select, TextInput } from '@components/inputs'

// query
import { CommonApi } from '@queries'

import { statusOptions } from './statusOptions'
import { Rto, SubAdmin } from '@types'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const AdminWorkplaceFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    const [industryOptions, setIndustryOptions] = useState<any>([])
    const [coursesOptions, setCoursesOptions] = useState<any>([])

    // query
    const getIndustries = CommonApi.Filter.useIndustries()
    const getCourses = CommonApi.Filter.useCourses()
    const getCoordinators = CommonApi.Appointments.allCoordinators()
    const getRtos = CommonApi.Filter.useRtos()

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
        if (getCourses.isSuccess) {
            setCoursesOptions(
                getCourses?.data?.map((course: any) => ({
                    value: course?.id,
                    label: course?.title,
                }))
            )
        }
    }, [getCourses])

    const coordinatorOptions = getCoordinators?.data?.map(
        (coordinator: SubAdmin) => ({
            value: coordinator?.id,
            label: coordinator?.user?.name,
        })
    )

    const rtoOptions =
        getRtos?.data && getRtos?.data?.length > 0
            ? getRtos?.data?.map((rto: any) => ({
                  value: rto?.id,
                  label: rto?.user?.name,
              }))
            : []

    return (
        <div className="grid grid-cols-4 gap-x-3">
            <TextInput
                name="studentId"
                label={'Student Id'}
                placeholder={'Search by Student Id Email ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, studentId: e.target.value })
                }}
            />
            <TextInput
                name="name"
                label={'Student Name'}
                placeholder={'Search by Student Name ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, name: e.target.value })
                }}
            />
            <TextInput
                name="email"
                label={'Student Email'}
                placeholder={'Search by Student Email ...'}
                type={'email'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, email: e.target.value })
                }}
            />

            <TextInput
                name="location"
                label={'Location'}
                placeholder={'Search by Location ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, location: e.target.value })
                }}
            />

            <Select
                label={'Status'}
                name={'status'}
                options={statusOptions}
                placeholder={'Select Sectors...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, status: e?.value })
                }}
            />

            <Select
                label={'Coordinator'}
                name={'coordinator'}
                options={coordinatorOptions}
                placeholder={'Search by Coordinator...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, subAdminId: e?.value })
                }}
                loading={getCoordinators.isLoading}
                disabled={getCoordinators.isLoading}
            />

            <Select
                label={'Search by Rto'}
                name={'rtoId'}
                options={rtoOptions}
                placeholder={'Select Rto...'}
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
                onChange={(e: any) => {
                    onFilterChange({ ...filter, industryId: e?.value })
                }}
                loading={getIndustries.isLoading}
                disabled={getIndustries.isLoading}
            />

            <Select
                label={'Search by Courses'}
                name={'courseId'}
                options={coursesOptions}
                placeholder={'Select Courses...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, courseId: e?.value })
                }}
                loading={getCourses.isLoading}
                disabled={getCourses.isLoading}
            />
        </div>
    )
}
