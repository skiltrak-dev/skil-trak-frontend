import { Select, TextInput } from '@components/inputs'

// queries
import { AdminApi, CommonApi } from '@queries'
import { OptionType, SubadminIndustryFilter } from '@types'
import { SetQueryFilters } from './SetQueryFilters'

interface ItemFilterProps {
    onFilterChange: (values: SubadminIndustryFilter) => void
    filter: SubadminIndustryFilter
}
export const SubAdminIndustryFilter = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    // query
    const getCourses = CommonApi.Filter.useCourses()
    const getPremiumFeaturesList = CommonApi.Industries.usePremiumFeaturesList()

    const coursesOptions = getCourses?.data?.map((course: any) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))
    const isPartnerOptions = [
        {
            label: 'Is Partner',
            value: true,
        },
        {
            label: 'Non Partner',
            value: false,
        },
    ]
    const coordinators = AdminApi.SubAdmins.useSubAdminsFilterList()
    const coordinatorsOptions = coordinators.data?.map((coordinator: any) => ({
        value: coordinator?.id,
        label: coordinator?.user?.name,
    }))

    const isPremiumOptions = getPremiumFeaturesList?.data?.map(
        (premium: any) => ({
            label: premium?.title,
            value: premium?.id,
        })
    )

    return (
        <>
            <SetQueryFilters<SubadminIndustryFilter> filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Industry Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                    showError={false}
                />
                <TextInput
                    name="email"
                    label={'Email'}
                    placeholder={'Search by Industry Email ...'}
                    type={'email'}
                    value={filter?.email}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, email: e.target.value })
                    }}
                    showError={false}
                />

                <TextInput
                    label={'Phone Number'}
                    name={'phone'}
                    value={filter?.phone}
                    placeholder={'Search Industry Phone...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.target.value })
                    }}
                    showError={false}
                />
                <TextInput
                    label={'ABN'}
                    name={'abn'}
                    value={filter?.abn}
                    placeholder={'Search Industry ABN...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, abn: e.target.value })
                    }}
                    showError={false}
                />
                <Select
                    label={'Is Partner'}
                    name={'isPartner'}
                    options={isPartnerOptions}
                    onChange={(e: any) =>
                        onFilterChange({ ...filter, isPartner: e?.value })
                    }
                    showError={false}
                />
                <Select
                    label={'Premium Features'}
                    name={'feature'}
                    options={isPremiumOptions}
                    value={isPremiumOptions?.find(
                        (premium: OptionType) =>
                            premium?.value === Number(filter?.feature)
                    )}
                    onChange={(e: any) => {
                        onFilterChange({
                            ...filter,
                            feature: e?.value,
                        })
                    }}
                    showError={false}
                />
                <Select
                    label={'Is Hiring'}
                    name={'isHiring'}
                    options={[
                        {
                            label: 'Is Hiring',
                            value: true,
                        },
                    ]}
                    onChange={(e: any) =>
                        onFilterChange({ ...filter, isHiring: e?.value })
                    }
                    showError={false}
                />
                <TextInput
                    label={'Address'}
                    name={'address'}
                    value={filter?.address}
                    placeholder={'Search By Address...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, address: e.target.value })
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
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            courseId: Number(e?.value),
                        })
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                    showError={false}
                />
                <Select
                    label={'Filter by Coordinator'}
                    name={'coordinator'}
                    options={coordinatorsOptions}
                    placeholder={'Filter by Coordinator...'}
                    value={coordinatorsOptions?.find(
                        (c: OptionType) =>
                            c?.value === Number(filter?.subAdminId)
                    )}
                    // onlyValue
                    onChange={(e: any) =>
                        onFilterChange({ ...filter, subAdminId: e?.value })
                    }
                />
            </div>
        </>
    )
}
