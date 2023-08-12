import { IndustryLayout } from '@layouts'
import { BranchesContainer } from '@partials/industry/Branches'
import React, { ReactElement } from 'react'

const Branches = () => {
    return (
        <div>
            <BranchesContainer />
        </div>
    )
}

Branches.getLayout = (page: ReactElement) => {
    return (
        <IndustryLayout pageTitle={{ title: 'Branches' }}>
            {page}
        </IndustryLayout>
    )
}

export default Branches
