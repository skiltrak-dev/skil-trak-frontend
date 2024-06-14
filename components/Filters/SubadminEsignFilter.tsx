import { Select, TextInput } from '@components/inputs'
import { SubAdminApi } from '@queries'
import { OptionType, SubadminESignFilterType, UserStatus } from '@types'
import {
    CourseSelectOption,
    EsignDocumentStatus,
    formatOptionLabel,
} from '@utils'
import { useState } from 'react'
import { SetQueryFilters } from './SetQueryFilters'

interface ItemFilterProps {
    filter: SubadminESignFilterType
    onFilterChange: (values: SubadminESignFilterType) => void
}
export const SubadminEsignFilter = ({
    filter,
    onFilterChange,
}: ItemFilterProps) => {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

    // query
    const getCourses = SubAdminApi.SubAdmin.useSubadminCourses()

    const coursesOptions = getCourses?.data?.map((course: any) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))

    const folderOptions = getCourses?.data
        ?.find((course: any) => course?.id === Number(filter?.courseId))
        ?.assessmentEvidence?.map((f: any) => ({
            label: f?.name,
            value: f?.id,
        }))

    const statusOptions = Object.entries(EsignDocumentStatus)
        ?.filter(([key, value]: any) => {
            if (value !== EsignDocumentStatus.ReSign) {
                return [key, value]
            }
        })
        ?.map(([key, value]: any) => {
            if (value !== EsignDocumentStatus.ReSign) {
                return {
                    label: key,
                    value,
                }
            }
        })

    return (
        <>
            <SetQueryFilters<SubadminESignFilterType> filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
                <TextInput
                    name="templateName"
                    label={'Document Name'}
                    placeholder={'Search by Document Name ...'}
                    value={filter?.templateName}
                    onChange={(e: any) => {
                        onFilterChange({
                            ...filter,
                            templateName: e.target.value,
                        })
                    }}
                    showError={false}
                />
                <TextInput
                    name="studentName"
                    label={'Student Name'}
                    placeholder={'Search by Student Name ...'}
                    value={filter?.studentName}
                    onChange={(e: any) => {
                        onFilterChange({
                            ...filter,
                            studentName: e.target.value,
                        })
                    }}
                    showError={false}
                />
                <TextInput
                    name="rtoName"
                    label={'RTO Name'}
                    placeholder={'Search by RTO Name ...'}
                    value={filter?.rtoName}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, rtoName: e.target.value })
                    }}
                    showError={false}
                />
                <TextInput
                    name="industryName"
                    label={'Industry Name'}
                    placeholder={'Search by Industry Name ...'}
                    value={filter?.industryName}
                    onChange={(e: any) => {
                        onFilterChange({
                            ...filter,
                            industryName: e.target.value,
                        })
                    }}
                    showError={false}
                />

                <Select
                    label={'Status'}
                    name={'status'}
                    options={statusOptions}
                    placeholder={'Select Status...'}
                    value={statusOptions.find(
                        (status: any) => status?.value === filter?.status
                    )}
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            status: e?.value as EsignDocumentStatus,
                        })
                    }}
                    showError={false}
                />
                <Select
                    label={'Search by Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    placeholder={'Select Courses...'}
                    value={coursesOptions?.find(
                        (course: OptionType) =>
                            course.value === Number(filter?.courseId)
                    )}
                    onChange={(e: any) => {
                        onFilterChange({
                            ...filter,
                            courseId: e?.value,
                            folderId: null,
                        })
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                    components={{
                        Option: CourseSelectOption,
                    }}
                    formatOptionLabel={formatOptionLabel}
                    showError={false}
                />
                <Select
                    label={'Search by Folder'}
                    name={'folderId'}
                    options={folderOptions}
                    placeholder={'Select Folder...'}
                    value={
                        folderOptions?.find(
                            (folder: OptionType) =>
                                folder?.value === Number(filter?.folderId)
                        ) || null
                    }
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, folderId: e?.value })
                    }}
                    disabled={!folderOptions}
                    showError={false}
                />
            </div>
        </>
    )
}
