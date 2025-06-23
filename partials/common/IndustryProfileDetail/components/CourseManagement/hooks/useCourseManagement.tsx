import { useCallback, useMemo, useState } from 'react'
import { CourseManagementTabType } from '../types'
import { useCourseManagementApi } from './useCourseManagementApi'

export const useCourseManagement = () => {
    const [toggleTab, setToggleTab] =
        useState<CourseManagementTabType>('approved')

    const { approvedCourses, pendingCourses, previousCourses } =
        useCourseManagementApi()

    const computedData = useMemo(() => {
        const allEmpty = previousCourses?.data?.every(
            (item: any) =>
                item.courses.length === 0 &&
                item.industryCourseApprovals.length === 0
        )

        const hasApprovedData =
            approvedCourses.data?.data?.length > 0 || !allEmpty
        const hasPendingData = pendingCourses?.data?.data?.length > 0
        let showTabs = hasApprovedData && hasPendingData

        const isLoading =
            approvedCourses.isLoading ||
            previousCourses.isLoading ||
            pendingCourses.isLoading

        const hasError =
            approvedCourses.isError ||
            previousCourses.isError ||
            pendingCourses.isError

        return {
            allEmpty,
            hasApprovedData,
            hasPendingData,
            showTabs,
            isLoading,
            hasError,
        }
    }, [
        approvedCourses.data,
        approvedCourses.isLoading,
        approvedCourses.isError,
        pendingCourses.data,
        pendingCourses.isLoading,
        pendingCourses.isError,
        previousCourses.data,
        previousCourses.isLoading,
        previousCourses.isError,
    ])

    const toggleTabHandler = useCallback((tab: CourseManagementTabType) => {
        setToggleTab(tab)
    }, [])

    return {
        toggleTab,
        computedData,
        approvedCourses,
        previousCourses,
        pendingCourses,
        toggleTabHandler,
    }
}
