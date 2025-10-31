import { RtoLayoutV2 } from '@layouts'
import { RtoAllStudents } from '@partials'
import React, { ReactElement } from 'react'

const AllStudentsPage = () => {
    return (
        <div>
            <RtoAllStudents />
        </div>
    )
}

AllStudentsPage.getLayout = (page: ReactElement) => {
    return <RtoLayoutV2>{page}</RtoLayoutV2>
}

export default AllStudentsPage
