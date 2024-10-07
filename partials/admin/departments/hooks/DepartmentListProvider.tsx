import { useContextBar } from '@hooks'
import { AdminApi } from '@queries'
import { createContext, useContext, useState } from 'react'

// Define the user structure
interface User {
    name: string
    email: string
}

// Define the subadmin structure
interface Subadmin {
    id: number
    user: User
}

// Define the department member structure
interface DepartmentMember {
    id: number
    isHod: boolean
    subadmin: Subadmin
}

// Define the pagination structure
interface Pagination {
    currentPage: number
    totalResult: number
    totalPage: number
    itemPerPage: number
    hasNext: boolean
    hasPrevious: boolean
}

// Define the main department data structure
interface DepartmentData {
    id: number
    name: string
    code: string
    courseCount: number
    departmentMembers: DepartmentMember[]
    membersCount: number
}

// Define the final structure containing the data array
interface DepartmentListResponse {
    data: {
        data: DepartmentData[]
        pagination: Pagination
    }
    setPage: (value: number) => void
    setItemPerPage: (value: number) => void
    setAddDepartment: (value: boolean) => void
    addDepartment: boolean
    itemPerPage: number
    isLoading: boolean
    isError: boolean
}

const DepartmentListContext = createContext<DepartmentListResponse | null>(null)

export const useDepartmentList = () => {
    const context = useContext(DepartmentListContext)
    if (context === null || context === undefined) {
        throw new Error(
            'useDepartmentList must be used within a DepartmentListProvider'
        )
    }
    return context
}

export const DepartmentListProvider = ({ children }: any) => {
    const [addDepartment, setAddDepartment] = useState<boolean>(false)
    const [itemPerPage, setItemPerPage] = useState<any>(50)
    const [page, setPage] = useState(1)

    const contextBar = useContextBar()

    const { data, isLoading, isError } = AdminApi.Department.useDepartments(
        {
            search: ``,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )
    // useEffect(() => {
    //     if (addDepartment) {
    //         contextBar.setContent(
    //             <AddDepartmentCB
    //                 setAddDepartment={setAddDepartment}
    //                 addDepartment={addDepartment}
    //             />
    //         )
    //         contextBar.show(false)
    //         return () => {
    //             contextBar.setContent(null)
    //             contextBar.hide()
    //         }
    //     }
    // }, [addDepartment])

    const contextValue = {
        data,
        setItemPerPage,
        itemPerPage,
        setPage,
        addDepartment,
        setAddDepartment,
        isLoading,
        isError,
    }
    return (
        <DepartmentListContext.Provider value={contextValue}>
            {children}
        </DepartmentListContext.Provider>
    )
}
