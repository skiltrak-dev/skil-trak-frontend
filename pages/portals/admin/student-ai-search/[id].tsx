import { AdminLayout, RtoLayoutV2 } from '@layouts'
import { ReactElement } from 'react'
import { StudentAiSearchDetail } from '@components'

const StudentAiSearchDetailPage = () => {
    return (
        <div className="p-4">
            <StudentAiSearchDetail />
        </div>
    )
}

StudentAiSearchDetailPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default StudentAiSearchDetailPage
