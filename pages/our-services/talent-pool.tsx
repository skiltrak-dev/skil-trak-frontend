import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { useHeaderWrapperTitle } from '@hooks'
import { TalentPool } from '@partials/frontPages'
import React, { useEffect } from 'react'

const TalentPoolPage = () => {
    const { setTitle } = useHeaderWrapperTitle()

    useEffect(() => {
        setTitle('Talent Pool')
        return () => setTitle('')
    }, [])

    return (
        <div>
            <Navbar2 />
            <TalentPool />
            <Footer4 />
        </div>
    )
}

export default TalentPoolPage
