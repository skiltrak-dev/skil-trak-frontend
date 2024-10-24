import { ReactElement, useEffect, useState } from 'react'
import { RTOList } from './components'
import { ApiAccessModal, AuthenticateUserModal } from './modal'
import { EmptyData } from '@components'

export const RtoListWithKey = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const onCancel = () => setModal(null)

    useEffect(() => {
        setModal(
            <AuthenticateUserModal
                onCancel={() => {
                    setIsAuthenticated(true)
                    onCancel()
                }}
            />
        )
    }, [])

    return (
        <div className="px-4 py-6">
            {modal}
            {isAuthenticated ? <RTOList /> : <EmptyData />}
        </div>
    )
}
