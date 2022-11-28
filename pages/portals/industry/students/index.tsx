import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { StudentsContainer } from '@partials/industry'

const Students: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    return (
        <div>
            <StudentsContainer />
        </div>
    )
}

Students.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default Students
