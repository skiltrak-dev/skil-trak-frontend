import { RtoLayoutV2 } from '@layouts'
import { RtoDashboardV2 } from '@partials'
import { PanelLeftDashed } from 'lucide-react'
import React, { ReactElement } from 'react'

export const Dashboard = () => {
    return (
        <div className="">
            <RtoDashboardV2 />
        </div>
    )
}

Dashboard.getLayout = (page: ReactElement) => {
    return (
        <RtoLayoutV2
            titleProps={{
                Icon: PanelLeftDashed,
                title: 'Dashboard',
            }}
        >
            {page}
        </RtoLayoutV2>
    )
}

export default Dashboard
