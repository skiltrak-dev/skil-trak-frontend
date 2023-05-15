import React, { useEffect, useState } from 'react'

// query
// import { useGetSectorsQuery } from '@queries'

export const useSectors = (courses: any) => {
    // const sectorResponse = useGetSectorsQuery()

    const [sectorOptions, setSectorOptions] = useState([])
    const [courseOptions, setCourseOptions] = useState<any[] | null>([])
    const [courseLoading, setCourseLoading] = useState(false)

    useEffect(() => {
        if (courses) {
            setCourseOptions(courses)
        }
    }, [courses])

    const onSectorChanged = (sectors: any) => {
        setCourseLoading(true)
        const filteredCourses = sectors.map((selectedSector: any) => {
            // const sectorExisting = sectorResponse.data?.data?.find(
            //   (sector: any) => sector.id === selectedSector.value
            // )
            // if (sectorExisting && sectorExisting?.courses?.length) {
            //   return sectorExisting.courses
            // }
            return null
        })

        let newCourseOptions: any[] = []
        filteredCourses.map((courseList: any) => {
            if (courseList && courseList.length) {
                return courseList.map((course: any) =>
                    newCourseOptions.push({
                        label: course.title,
                        value: course.id,
                    })
                )
            }
            return null
        })

        setCourseOptions(newCourseOptions)
        setCourseLoading(false)
    }
    return {
        // sectorResponse: sectorResponse?.data?.data,
        // sectorLoading: sectorResponse.isLoading,
        sectorOptions,
        courseOptions,
        courseLoading,
        onSectorChanged,
    }
}
