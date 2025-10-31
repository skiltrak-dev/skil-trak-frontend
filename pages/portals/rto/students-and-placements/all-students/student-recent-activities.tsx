import { RtoLayoutV2 } from '@layouts'
import { StudentRecentActivities } from '@partials'
import { Activity } from 'lucide-react'
import React, { ReactElement } from 'react'

const StudentRecentActivitiesPage = () => {
    return (
        <div>
            <StudentRecentActivities />
        </div>
    )
}

StudentRecentActivitiesPage.getLayout = (page: ReactElement) => {
    return (
        <RtoLayoutV2
            titleProps={{
                Icon: Activity,
                title: 'Student Recent Activities',
                description: 'All Student Recent Activities',
            }}
        >
            {page}
        </RtoLayoutV2>
    )
}

export default StudentRecentActivitiesPage
