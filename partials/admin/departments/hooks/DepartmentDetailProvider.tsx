import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AdminApi } from '@queries'
import { AdminSubadminFilter } from '@types'
import { checkFilteredDataLength } from '@utils'

// Define the shape of our context
interface DepartmentDetailContextType {
    departmentDetail: ReturnType<
        typeof AdminApi.Department.useDepartmentDetails
    >
    coordinatorsList: ReturnType<
        typeof AdminApi.Department.useDeptCoordinatorsList
    >
    deptCourses: ReturnType<typeof AdminApi.Department.useDepartmentCourses>
    hodDetails: any
    sectorsOptions: { label: string; value: number }[]
    groupedCourses: Record<string, any[]>
    filter: AdminSubadminFilter
    setFilter: React.Dispatch<React.SetStateAction<AdminSubadminFilter>>
    filterAction: any
    setFilterAction: React.Dispatch<React.SetStateAction<any>>
    itemPerPage: number
    setItemPerPage: React.Dispatch<React.SetStateAction<number>>
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    filteredDataLength: boolean
}

const DepartmentDetailContext = createContext<
    DepartmentDetailContextType | undefined
>(undefined)

export const useDepartmentDetailContext = () => {
    const context = useContext(DepartmentDetailContext)
    if (context === undefined) {
        throw new Error(
            'useDepartmentDetailContext must be used within a DepartmentDetailProvider'
        )
    }
    return context
}

export const DepartmentDetailProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState<AdminSubadminFilter>(
        {} as AdminSubadminFilter
    )
    const router = useRouter()

    useEffect(() => {
        setPage(Number(router.query?.page || 1))
        setItemPerPage(Number(router.query?.pageSize || 50))
    }, [router])

    const departmentId = Number(router.query.id)

    const departmentDetail = AdminApi.Department.useDepartmentDetails(
        departmentId,
        {
            skip: !departmentId,
        }
    )

    const coordinatorsList = AdminApi.Department.useDeptCoordinatorsList(
        {
            id: departmentId,
            params: {
                search: `${JSON.stringify(filter)
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .trim()}`,
                skip: !departmentId ? 0 : itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
        },
        {
            skip: !departmentId,
            refetchOnMountOrArgChange: true,
        }
    )

    const deptCourses = AdminApi.Department.useDepartmentCourses(departmentId, {
        skip: !departmentId,
    })

    const hodDetails =
        departmentDetail?.data?.departmentMembers?.length &&
        departmentDetail?.data?.departmentMembers[0]?.subadmin

    const sectors = [
        ...new Map(
            deptCourses.data?.map((item: any) => [
                item?.sector?.id,
                item?.sector,
            ])
        ).values(),
    ]

    const sectorsOptions = sectors?.map((sector: any) => ({
        label: sector?.name,
        value: sector?.id,
    }))

    const groupedCourses = deptCourses?.data?.reduce(
        (acc: any, course: any) => {
            const sectorName = course?.sector?.name
            if (!acc[sectorName]) {
                acc[sectorName] = []
            }
            acc[sectorName].push(course)
            return acc
        },
        {}
    )

    const filteredDataLength = checkFilteredDataLength(filter)

    const contextValue: DepartmentDetailContextType = {
        departmentDetail,
        coordinatorsList,
        deptCourses,
        hodDetails,
        sectorsOptions,
        groupedCourses,
        filter,
        setFilter,
        filterAction,
        setFilterAction,
        itemPerPage,
        setItemPerPage,
        page,
        setPage,
        filteredDataLength,
    }

    return (
        <DepartmentDetailContext.Provider value={contextValue}>
            {children}
        </DepartmentDetailContext.Provider>
    )
}
