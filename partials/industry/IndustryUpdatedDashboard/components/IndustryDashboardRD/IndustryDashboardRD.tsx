import { useEffect, useMemo, useState } from 'react'
// components
import { NoData, Select, SelectOption, Typography } from '@components'
import { CourseDocuments } from './components'

// redux
import { SectorDocuments } from '@partials/common/IndustryProfileDetail/components/IndustrySectorRequiredDocs/components'
import { IndustryApi, useGetIndustryCoursesQuery } from '@queries'
import { Course, Industry, Sector } from '@types'

export const IndustryDashboardRD = ({ industry }: { industry: Industry }) => {
    const [isViewd, setIsViewd] = useState<boolean>(false)
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const [selectedSector, setSelectedSector] = useState<number | null>(null)
    const { data, isError, isLoading } = useGetIndustryCoursesQuery(null)

    useEffect(() => {
        if (data && data?.length > 0) {
            setSelectedCourse(data[0]?.id)
        }
    }, [data])

    const coursesOptions = data?.map((course: Course) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))

    const filteredCourse = data?.find((c: Course) => c?.id === selectedCourse)

    const industrySectors = IndustryApi.Courses.useGetIndustrySectorsQuery(null)

    const sectorOptions = useMemo(
        () =>
            industrySectors?.data?.map((sector: Sector) => ({
                value: sector?.id,
                label: sector?.name,
            })),
        [industrySectors?.data]
    )

    useEffect(() => {
        if (sectorOptions && sectorOptions?.length > 0) {
            setSelectedSector(sectorOptions?.[0]?.value)
        }
    }, [sectorOptions])

    return (
        <div className="bg-[#E5F4FD] rounded-[10px] h-full overflow-auto custom-scrollbar">
            <div className="px-4 py-3 flex justify-between items-center border-b border-secondary-dark">
                <Typography semibold>
                    <span className="text-[15px]">Required Documents</span>
                </Typography>
            </div>
            <div className="overflow-auto custom-scrollbar px-3.5 py-2.5">
                {isError && <NoData text="There is some technical issue" />}

                <div className=" border-b border-secondary-dark pb-3">
                    <div className="w-full">
                        <Select
                            label={'Select by Sector'}
                            name={'courseId'}
                            showError={false}
                            options={sectorOptions}
                            placeholder={'Select Sector...'}
                            value={sectorOptions?.find(
                                (sector: SelectOption) =>
                                    sector?.value === Number(selectedSector)
                            )}
                            onChange={(e: number) => {
                                setSelectedSector(e)
                            }}
                            loading={isLoading}
                            disabled={isLoading}
                            onlyValue
                        />
                    </div>
                </div>
                <SectorDocuments
                    industry={industry}
                    selectedSector={selectedSector}
                />

                {/* {filteredCourse && (
                    <div className="pt-3.5" key={filteredCourse.id}>
                        <CourseDocuments course={filteredCourse} />
                    </div>
                )} */}
            </div>
        </div>
    )
}
