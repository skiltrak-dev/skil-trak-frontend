import { RtoLayoutV2 } from '@layouts'
import { Submissions } from '@partials'
import React, { ReactElement } from 'react'

const SubmissionsPage = () => {
    return (
        <div>
            <Submissions />
        </div>
    )
}
SubmissionsPage.getLayout = (page: ReactElement) => {
    return <RtoLayoutV2>{page}</RtoLayoutV2>
}

export default SubmissionsPage
