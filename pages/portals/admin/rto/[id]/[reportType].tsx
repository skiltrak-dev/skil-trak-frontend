import { RtoProfileSidebar } from '@components'
import { useContextBar } from '@hooks'
import { AdminLayout } from '@layouts'
import { RTOReportType } from '@partials/common/Reports'
import { AdminApi, useGetSubAdminRTODetailQuery } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

const ReportType: NextPageWithLayout = () => {
    const router = useRouter()
    const contextBar = useContextBar()

    const rto = AdminApi.Rtos.useDetailQuery(Number(router?.query?.id), {
        skip: !router?.query?.id,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        if (rto.isSuccess) {
            contextBar.setContent(
                <RtoProfileSidebar
                    rto={rto}
                    loading={rto?.isLoading}
                    data={rto?.data}
                />
            )
            contextBar.show(false)
        }

        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [rto.data])
    return (
        <div className="px-5 py-2">
            <RTOReportType rtoUser={Number(rto?.data?.user?.id)} />
        </div>
    )
}

ReportType.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default ReportType
