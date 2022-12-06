import { useContextBar } from '@hooks'
import React, { useEffect } from 'react'

export const AddIndustryCB = () => {
    const { setTitle } = useContextBar()

    useEffect(() => {
        setTitle('Add Industry')
    }, [])

    return <div>AddIndustryCB</div>
}
