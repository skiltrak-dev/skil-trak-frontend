import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

import { Select, Button } from '@components'
import { useGetIndustrySectorsQuery } from '@queries'
import { useEffect, useState } from 'react'
import { CourseSelectOption, SignUpUtils } from '@utils'
export const BrowseCandidateForm = ({ setCourseId }: any) => {
    const sectorResponse = useGetIndustrySectorsQuery()
    const [sectorOptions, setSectorOptions] = useState([])
    const [courseOptions, setCourseOptions] = useState([])
    const [storedData, setStoredData] = useState<any>(null)
    const [courseLoading, setCourseLoading] = useState(false)
    const onSectorChanged = (sectors: any) => {
        setCourseLoading(true)
        const filteredCourses = sectors.map((selectedSector: any) => {
            const sectorExisting = sectorResponse.data.find(
                (sector: any) => sector.id === selectedSector.value
            )
            if (sectorExisting && sectorExisting?.courses?.length) {
                return sectorExisting.courses
            }
        })

        const newCourseOptions: any = []
        filteredCourses.map((courseList: any) => {
            if (courseList && courseList.length) {
                return courseList.map((course: any) =>
                    newCourseOptions.push({
                        item: course,
                        value: course.id,
                        label: course.title,
                    })
                )
            }
        })

        setCourseOptions(newCourseOptions)
        setCourseLoading(false)
    }
    useEffect(() => {
        if (sectorResponse.data?.length) {
            const options = sectorResponse.data?.map((sector: any) => ({
                label: sector.name,
                value: sector.id,
            }))
            setSectorOptions(options)
        }
    }, [sectorResponse?.data])
    useEffect(() => {
        if (SignUpUtils.getEditingMode()) {
            const values = SignUpUtils.getValuesFromStorage()
            setStoredData(values)
            setCourseOptions(values.courses)
        }
    }, [])

    const methods = useForm({
        mode: 'all',
    })

    return (
        <div>
            <FormProvider {...methods}>
                <form className="mt-2 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 my-4">
                        <Select
                            label={'Sector'}
                            {...(storedData
                                ? {
                                      defaultValue: storedData.sectors,
                                  }
                                : {})}
                            name={'sectors'}
                            multi
                            options={sectorOptions}
                            placeholder={'Select Sectors...'}
                            loading={sectorResponse?.isLoading}
                            onChange={onSectorChanged}
                            validationIcons
                        />

                        <Select
                            label={'Courses'}
                            name={'courses'}
                            defaultValue={courseOptions}
                            options={courseOptions}
                            loading={courseLoading}
                            disabled={
                                storedData
                                    ? storedData?.courses?.length === 0
                                    : courseOptions?.length === 0
                            }
                            validationIcons
                            onChange={(values: any) => {
                                setCourseId(values?.value)
                            }}
                            components={{
                                Option: CourseSelectOption,
                            }}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
