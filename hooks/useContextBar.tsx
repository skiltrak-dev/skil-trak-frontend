import React, {
    Dispatch,
    ReactElement,
    ReactNode,
    useContext,
    useState,
    SetStateAction,
} from 'react'

// utils

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
    viewedPendingIndustriesModal: number
    setViewedPendingIndustriesModal: Dispatch<SetStateAction<number>>
    viewAgreementModal: number
    setViewAgreementModal: Dispatch<SetStateAction<number>>
    setViewContext: any
    viewContext: string | null
    bgColor: string | null
    setBgColor: Function
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
    const [bgColor, setBgColor] = useState<string | null>(null)
    const [viewContext, setViewContext] = useState<string | null>(null)
    const [title, setTitle] = useState('')
    const [viewedPendingIndustriesModal, setViewedPendingIndustriesModal] =
        useState<number>(Number())
    const [viewAgreementModal, setViewAgreementModal] = useState<number>(
        Number()
    )

    const value = {
        content,
        setContent,
        show: (fixed: boolean = true) => {
            setVisible(true)
            setFixed(fixed)
        },
        hide: () => {
            setVisible(false)
        },
        isVisible,
        fixed,
        switchOff: (value: boolean) => setOff(value),
        off,
        setTitle,
        title,
        viewedPendingIndustriesModal,
        setViewedPendingIndustriesModal,
        viewAgreementModal,
        setViewAgreementModal,
        setViewContext,
        viewContext,
        setBgColor,
        bgColor,
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
