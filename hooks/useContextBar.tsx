import React, { ReactElement, ReactNode, useContext, useState } from 'react'

interface ContextBarContextType {
    content: ReactElement | ReactNode | undefined
    setContent: Function
    show: Function
    hide: Function
    isVisible: boolean
    fixed: boolean
}

export const ContextBarContext =
    React.createContext<ContextBarContextType | null>(null)

export const ContextBarProvider = ({
    children,
}: {
    children: ReactElement | ReactNode
}) => {
    const [isVisible, setVisible] = useState(true)
    const [fixed, setFixed] = useState(false)
    const [content, setContent] = useState(null)

    const value = {
        content,
        setContent,
        show: () => setVisible(true),
        hide: () => setVisible(false),
        isVisible,
        fixed,
    }

    return (
        <ContextBarContext.Provider value={value}>
            {children}
        </ContextBarContext.Provider>
    )
}

export const useContextBar = () => {
    return useContext(ContextBarContext) as ContextBarContextType
}
