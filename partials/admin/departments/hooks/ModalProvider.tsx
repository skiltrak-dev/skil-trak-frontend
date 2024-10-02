import React, { createContext, useContext, useState, useCallback } from 'react'

const ModalContext = createContext<any>(null)

export const ModalProvider = ({ children }: any) => {
    const [modalConfig, setModalConfig] = useState(null)

    const openModal = useCallback((config: any) => {
        setModalConfig(config)
    }, [])

    const closeModal = useCallback(() => {
        setModalConfig(null)
    }, [])

    return (
        <ModalContext.Provider value={{ modalConfig, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}
