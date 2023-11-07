import { RequiredDocumentsContainer } from '@components/sections'
import { Industry } from '@types'
import React from 'react'

export const RequiredDocs = ({ industry }: { industry: Industry }) => {
    return (
        <div>
            <RequiredDocumentsContainer industry={industry} />
        </div>
    )
}
