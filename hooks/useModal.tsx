import { useState, ReactNode } from 'react'

export const useModal = () => {
    const [modal, setModal] = useState<ReactNode>(null)

    const openModal = (ModalComponent: ReactNode) => {
        setModal(ModalComponent)
    }

    const closeModal = () => {
        setModal(null)
    }

    return { modal, openModal, closeModal }
}
