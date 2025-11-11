import { StudentAiSearchDetail } from '@components'
import { AdminLayout } from '@layouts'
import { ReactElement } from 'react'

const StudentAiSearchDetailPage = () => {
    return <StudentAiSearchDetail />
}

StudentAiSearchDetailPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default StudentAiSearchDetailPage
