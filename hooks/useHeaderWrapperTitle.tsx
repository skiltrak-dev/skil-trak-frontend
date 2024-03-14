import React, {
    Dispatch,
    ReactElement,
    ReactNode,
    useContext,
    useState,
    SetStateAction,
} from 'react'

// utils

interface HeaderWrapperContextType {
    title: string
    setTitle: Function
}

export const HeaderWrapperContext =
    React.createContext<HeaderWrapperContextType | null>(null)

export const HeaderWrapperProvider = ({
    children,
}: {
    children: ReactElement | ReactNode
}) => {
    const [title, setTitle] = useState('')

    const value = {
        setTitle,
        title,
    }

    return (
        <HeaderWrapperContext.Provider value={value}>
            {children}
        </HeaderWrapperContext.Provider>
    )
}

export const useHeaderWrapperTitle = () => {
    return useContext(HeaderWrapperContext) as HeaderWrapperContextType
}
