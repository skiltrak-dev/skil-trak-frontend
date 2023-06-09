import { createContext, useContext, useState } from 'react'

const SocketContext = createContext<any | null>(null)

export const SocketListenerProvider = ({ children }: { children: any }) => {
    const [eventListener, seteventListener] = useState<{
        eventName: string
        eventListener: any
    } | null>(null)

    const value = { eventListener, seteventListener }

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketListener = () => {
    return useContext(SocketContext)
}
