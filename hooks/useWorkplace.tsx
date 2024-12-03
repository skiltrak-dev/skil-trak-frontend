import React, { createContext, useContext, useState } from 'react'

interface NavbarContextType {
    workplaceData: any
    setWorkplaceData: any
    studentLocation: string
    setStudentLocation: any
    industryLocation: string
    setIndustryLocation: any
}

const WorkplaceContext = createContext<NavbarContextType | null>(null)

export const WorkplaceProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [workplaceData, setWorkplaceData] = useState({})
    const [studentLocation, setStudentLocation] = useState('')
    const [industryLocation, setIndustryLocation] = useState('')

    const values = {
        workplaceData,
        setWorkplaceData,
        studentLocation,
        setStudentLocation,
        industryLocation,
        setIndustryLocation,
    }

    return (
        <WorkplaceContext.Provider value={values}>
            {children}
        </WorkplaceContext.Provider>
    )
}

export const useWorkplace = () => {
    return useContext(WorkplaceContext) as NavbarContextType
}
