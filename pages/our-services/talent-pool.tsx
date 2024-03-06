import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { TalentPool } from '@partials/frontPages'
import React from 'react'

const TalentPoolPage = () => {
    return (
        <div>
            <Navbar2 />
            <TalentPool />
            <Footer4 />
        </div>
    )
}

export default TalentPoolPage
