import { RtoLayoutV2 } from '@layouts'
import { RtoDashboardV2 } from '@partials'
import { PanelLeftDashed } from 'lucide-react'
import React, { ReactElement } from 'react'

export const Dashboard = () => {
    return <RtoDashboardV2 />
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
