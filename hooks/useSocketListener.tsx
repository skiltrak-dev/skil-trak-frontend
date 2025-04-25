import { ReactNode, createContext, useContext, useState } from 'react'

export interface SocketContextType {
    eventListener: any
    setEventListener: any
}

const SocketContext = createContext<SocketContextType | null>(null)

export const SocketListenerProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const [eventListener, setEventListener] = useState<{
        eventName: string
        eventListener: any
    } | null>(null)

    const value = { eventListener, setEventListener }

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketListener = () => {
    return useContext(SocketContext) as SocketContextType
}
