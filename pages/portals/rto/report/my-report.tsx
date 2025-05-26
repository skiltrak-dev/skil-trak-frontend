import { Button, Card, Typography } from '@components'
import { RtoLayout } from '@layouts'
import { DownloadRtoMyReportModal } from '@partials/rto/myReports'
import React, { ReactElement, useState } from 'react'
import { IoMdDownload } from 'react-icons/io'

const MyReports = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onClose = () => setModal(null)

    const onViewClicked = () => {
        setModal(<DownloadRtoMyReportModal onClose={() => onClose()} />)
    }

    return (
        <div>
            {modal}
            <Card>
                <div className="flex flex-col gap-y-2">
                    <Typography variant="title">
                        Download Monthly Report
                    </Typography>
                    
                    <div>
                        <Button
                            onClick={() => {
                                onViewClicked()
                            }}
                            variant="info"
                            Icon={IoMdDownload}
                            text={'Monthly Report Download'}
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}

MyReports.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'My Reports',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default MyReports
