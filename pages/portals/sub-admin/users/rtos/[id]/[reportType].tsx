import { RtoProfileSidebar } from '@components'
import { useContextBar } from '@hooks'
import { AdminLayout, SubAdminLayout } from '@layouts'
import { RTOReportType } from '@partials/common/Reports'
import { useGetSubAdminRTODetailQuery } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

const ReportType: NextPageWithLayout = () => {
    const { setContent, show, hide } = useContextBar()
    const router = useRouter()

    const rtoDetail = useGetSubAdminRTODetailQuery(Number(router?.query?.id), {
        skip: !router?.query?.id,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        if (rtoDetail?.isSuccess) {
            setContent(
                <>
                    <RtoProfileSidebar
                        rto={rtoDetail}
                        loading={rtoDetail?.isLoading}
                        data={rtoDetail?.data}
                    />
                </>
            )
            show(false)
        }
        return () => {
            setContent(null)
            hide()
        }
    }, [rtoDetail, setContent])
    return (
        <div className="px-5 py-2">
            <RTOReportType rtoUser={Number(rtoDetail?.data?.user?.id)} />
        </div>
    )
}

ReportType.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default ReportType
