import { ReactNode } from 'react'

export const ProductionDataRestriction = ({
    children,
    condition = true,
    localData,
}: {
    localData?: any
    children: ReactNode
    condition?: boolean
}) => {
    return (
        <>
            {process.env.NEXT_PUBLIC_NODE_ENV === 'local'
                ? localData || children
                : condition
                ? children
                : null}
        </>
    )
}
