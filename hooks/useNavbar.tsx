import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface NavbarContextType {
    title: string
    setTitle: Function
    subTitle: string
    setSubTitle: Function
}

const NavbarContext = createContext<NavbarContextType | null>(null)

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')

    useEffect(() => {
        setSubTitle('')
    }, [router])

    const values = {
        title,
        setTitle: (title: string) => setTitle(title),
        subTitle,
        setSubTitle: (subTitle: string) => setSubTitle(subTitle),
    }

    return (
        <NavbarContext.Provider value={values}>
            {children}
        </NavbarContext.Provider>
    )
}

export const useNavbar = () => {
    return useContext(NavbarContext) as NavbarContextType
}
