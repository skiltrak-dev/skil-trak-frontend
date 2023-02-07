import React, { ReactElement, useState } from 'react'

export const useEditor = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => {
        setModal(null)
    }

    return { modal, setModal, onCancelClicked }
}
