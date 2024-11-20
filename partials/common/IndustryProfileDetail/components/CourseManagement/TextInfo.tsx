import { Typography } from '@components'
import React from 'react'

export const TextInfo = ({ title, text }: any) => {
    return (
        <div>
            <Typography variant="muted" color="text-gray-500">
                {title ?? 'N/A'}
            </Typography>
            <Typography variant="muted" semibold>
                {text ?? 'N/A'}
            </Typography>
        </div>
    )
}
