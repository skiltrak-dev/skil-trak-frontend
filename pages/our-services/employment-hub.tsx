import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { EmploymentHub } from '@partials/frontPages'
import { EmploymentHubCard } from '@partials/frontPages/OurServices/EmploymentHub/Card'
import React from 'react'

const EmploymentHubPage = () => {
    return (
        <div>
            <Navbar2 />
            <EmploymentHub />
            <Footer4 />
        </div>
    )
}

export default EmploymentHubPage
