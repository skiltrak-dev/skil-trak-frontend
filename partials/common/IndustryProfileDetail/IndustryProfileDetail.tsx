import { useContextBar } from '@hooks'
import React, { useEffect } from 'react'
import { IndustryProfileCB } from './IndustryProfileCB'
import { Industry } from '@types'

export const IndustryProfileDetail = ({ industry }: { industry: Industry }) => {
    const contextBar = useContextBar()

    useEffect(() => {
        contextBar.setContent(<IndustryProfileCB industry={industry} />)
    }, [])

    return <div>IndustryProfileDetail</div>
}
