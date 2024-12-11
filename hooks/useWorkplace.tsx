import { Rto } from '@types'
import React, { createContext, useContext, useState } from 'react'

interface NavbarContextType {
    workplaceData: any
    setWorkplaceData: any
    studentLocation: string
    setStudentLocation: any
    industryLocation: string
    setIndustryLocation: any
    workplaceRto: Rto | null
    setWorkplaceRto: any
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
    const [workplaceRto, setWorkplaceRto] = useState<Rto | null>(null)

    const values = {
        workplaceData,
        setWorkplaceData,
        studentLocation,
        setStudentLocation,
        industryLocation,
        setIndustryLocation,
        workplaceRto,
        setWorkplaceRto,
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
