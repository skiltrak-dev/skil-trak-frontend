import React, {
    ReactElement,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'

// utils
import { getToken } from '@utils'

interface ContextBarContextType {
    content: ReactElement | ReactNode | undefined
    setContent: Function
    show: Function
    hide: Function
    isVisible: boolean
    fixed: boolean
    switchOff: Function
    off: boolean
    title: string
    setTitle: Function
}

export const ContextBarContext =
    React.createContext<ContextBarContextType | null>(null)

export const ContextBarProvider = ({
    children,
}: {
    children: ReactElement | ReactNode
}) => {
    const [off, setOff] = useState(false)
    const [isVisible, setVisible] = useState(false)
    const [fixed, setFixed] = useState(false)
    const [content, setContent] = useState(null)
    const [title, setTitle] = useState('')

    const token = getToken()

    useEffect(() => {
        if (!token) {
            setContent(null)
            setTitle('')
            setVisible(false)
        }
    }, [token])

    const value = {
        content,
        setContent,
        show: (fixed: boolean = true) => {
            setVisible(true)
            setFixed(fixed)
        },
        hide: () => setVisible(false),
        isVisible,
        fixed,
        switchOff: (value: boolean) => setOff(value),
        off,
        setTitle,
        title,
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
