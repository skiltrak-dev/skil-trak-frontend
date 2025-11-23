import { RtoLayoutV2 } from '@layouts'
import { RtoIndustries, RtoUpdatedIndustries } from '@partials'
import { Building2 } from 'lucide-react'
import React, { ReactElement } from 'react'

const IndustriesPage = () => {
    return (
        <div>
            {/* <RtoIndustries /> */}
            <RtoUpdatedIndustries />
        </div>
    )
}

IndustriesPage.getLayout = (page: ReactElement) => {
    return (
        <RtoLayoutV2
            titleProps={{
                Icon: Building2,
                title: 'Industries',
                description: 'Manage all your Industries',
            }}
        >
            {page}
        </RtoLayoutV2>
    )
}

export default IndustriesPage
