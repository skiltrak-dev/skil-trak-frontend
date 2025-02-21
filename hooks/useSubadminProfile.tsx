import { UserRoles } from '@constants'
import { SubAdminApi } from '@queries'
import { SubAdmin } from '@types'
import { getUserCredentials } from '@utils'
import { ReactElement, ReactNode, createContext, useContext } from 'react'

// utils

export const SubadminProfileContext = createContext<SubAdmin | undefined>(
    undefined
)

export const SubadminProfileProvider = ({
    children,
}: {
    children: ReactElement | ReactNode
}) => {
    const role = getUserCredentials()?.role

    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
    })

    return (
        <SubadminProfileContext.Provider value={subadmin?.data}>
            {children}
        </SubadminProfileContext.Provider>
    )
}

export const useSubadminProfile = () => {
    return useContext(SubadminProfileContext) as SubAdmin
}
