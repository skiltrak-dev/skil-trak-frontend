import { Typography } from '@components'
import React from 'react'

export const EmployeeHeader = ({ header }: { header: string }) => {
    return (
        <Typography variant="xxs" bold whiteSpacePre>
            {header}
        </Typography>
    )
}
