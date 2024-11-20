import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthApi } from '@queries'
import {
    courseOptionsWhenSectorChange,
    getRemovedCoursesFromList,
    getSectors,
    sectorsCoursesOptions,
} from '@utils'
import { OptionType, Sector } from '@types'

export const useSectorsAndCoursesOptions = () => {
    const [selectedSector, setSelectedSector] = useState<any>(null)
    const [courseOptions, setCourseOptions] = useState([])
    const [courseLoading, setCourseLoading] = useState(false)
    const [selectedCourses, setSelectedCourses] = useState<number[] | null>(
        null
    )
    const [removedCourses, setRemovedCourses] = useState<number[] | null>(null)

    const sectorResponse = AuthApi.useSectors({})

    const sectorOptions = useMemo(
        () =>
            sectorResponse.data?.map((sector: any) => ({
                label: sector?.name,
                value: sector?.id,
            })),
        [sectorResponse]
    )

    const removeAddedSectors = (sectorsWithCourses: any) => {
        const addedCourses = getSectors(sectorsWithCourses)
        return sectorResponse?.data?.filter(
            (f: Sector) => f?.courses?.length !== addedCourses[f?.name]?.length
        )
    }

    const updatedSectorsOptions = (sectors: Sector[]) =>
        sectors?.map((sector: any) => ({
            label: sector?.name,
            value: sector?.id,
        }))

    useEffect(() => {
        if (selectedSector?.length === 0) {
            setRemovedCourses(null)
        }
    }, [selectedSector])

    const onSectorChanged = (sectors: any, sectorsWithCourses: any) => {
        setSelectedSector(sectors)
        setCourseLoading(true)

        const newCourseOptions = sectorsCoursesOptions(
            sectors,
            sectorResponse?.data
        )

        const addedCourses = getSectors(sectorsWithCourses)

        const getAssignedCourses = sectorsWithCourses
            ? Object.values(addedCourses)
                  ?.flat()
                  ?.map((c: any) => `${c?.code}${c?.id}`)
            : []

        const uCourses = newCourseOptions?.filter(
            (f: any) =>
                !getAssignedCourses?.includes(`${f?.item?.code}${f?.value}`)
        )

        setCourseOptions(sectorsWithCourses ? uCourses : newCourseOptions)
        // setCourseOptions(newCourseOptions)
        const newSelectedCoursesOptions = courseOptionsWhenSectorChange(
            sectorsWithCourses ? uCourses : newCourseOptions,
            removedCourses as number[]
        )

        setSelectedCourses(newSelectedCoursesOptions)
        setCourseLoading(false)
    }

    const onCourseChange = useCallback(
        (e: number[]) => {
            setSelectedCourses(e)
            const removedValue = getRemovedCoursesFromList(courseOptions, e)
            setRemovedCourses(removedValue)
        },
        [courseOptions]
    )

    const courseValues = useMemo(
        () =>
            courseOptions?.filter((course: OptionType) =>
                selectedCourses?.includes(course?.value as number)
            ),
        [courseOptions, selectedCourses]
    )

    return {
        courseLoading,
        courseOptions,
        courseValues,
        sectorOptions,
        removedCourses,
        selectedSector,
        onCourseChange,
        selectedCourses,
        onSectorChanged,
        setCourseOptions,
        setSelectedSector,
        setSelectedCourses,
        sectorLoading: sectorResponse?.isLoading,
        removeAddedSectors,
        updatedSectorsOptions,
    } as {
        courseLoading: any
        courseOptions: any
        courseValues: any
        sectorOptions: any
        removedCourses: any
        selectedSector: any
        onCourseChange: any
        selectedCourses: any
        onSectorChanged: any
        setCourseOptions: any
        setSelectedSector: any
        setSelectedCourses: any
        sectorLoading: any
        removeAddedSectors: any
        updatedSectorsOptions: (sectos: Sector[]) => OptionType[]
    }
}
