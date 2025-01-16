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
    workplaceRes: any
    setWorkplaceRes: any
}

const WorkplaceContext = createContext<NavbarContextType | null>(null)

export const WorkplaceProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [workplaceRes, setWorkplaceRes] = useState([])
    const [workplaceData, setWorkplaceData] = useState({})
    const [studentLocation, setStudentLocation] = useState('')
    const [industryLocation, setIndustryLocation] = useState('')
    const [workplaceRto, setWorkplaceRto] = useState<Rto | null>(null)

    const values = {
        workplaceRes,
        setWorkplaceRes,
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
