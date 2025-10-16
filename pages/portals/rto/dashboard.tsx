import { RtoLayoutV2 } from '@layouts'
import React, { ReactElement } from 'react'

export const Dashboard = () => {
    return <div className=''>Here is the new dashboard</div>
}

Dashboard.getLayout = (page: ReactElement) => {
    return <RtoLayoutV2>{page}</RtoLayoutV2>
}

export default Dashboard
