import { ReactElement, useEffect } from 'react'

import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { Jobs } from '@partials/admin/job'
import { NextPageWithLayout } from '@types'
import { Button, Typography } from '@components'
import {
    DocumentTypeCard,
    IndustryInsuarabceDocuments,
    RtoInsuranceDocuments,
} from '@partials'

const InsuranceDocuments: NextPageWithLayout = () => {
    const navBar = useNavbar()

    useEffect(() => {
        navBar.setTitle('Insurance Documents')
    }, [])

    return (
        <div className="">
            <div className="flex justify-end gap-x-1.5 items-center px-6 py-3">
                <Button text="Add Type" variant="dark" />
                <Button text="Upload Document" />
            </div>

            {/*  */}
            <div className="flex items-center gap-x-5 px-6 mt-8">
                {[...Array(4)].map((_, i) => (
                    <DocumentTypeCard
                        key={i}
                        index={i}
                        active={false}
                        onClick={() => {}}
                        label="Worker compensation insurance"
                    />
                ))}
            </div>

            {/*  */}
            <div className="grid grid-cols-2 gap-x-5 px-6 mt-5">
                <RtoInsuranceDocuments />
                <IndustryInsuarabceDocuments />
            </div>
        </div>
    )
}

InsuranceDocuments.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default InsuranceDocuments
