import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader'

import { RtoApi } from '@queries'
import { ActionButton, NoData, Typography } from '@components'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import moment from 'moment'

export const WeeklyReport = () => {
    const weeklyReport = RtoApi.Report.useRtoWeelyReport()

    return (
        <div>
            {weeklyReport.isError && (
                <NoData text="There is some technical issue!" />
            )}
            {weeklyReport?.isLoading ? (
                <BeatLoader />
            ) : weeklyReport?.data && weeklyReport?.data?.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 items-center">
                        <div className="grid grid-cols-2 items-center gap-x-2">
                            <Typography variant="small" semibold>
                                Start Data
                            </Typography>
                            <Typography variant="small" semibold>
                                End Data
                            </Typography>
                        </div>
                        <div>
                            {' '}
                            <Typography variant="small" semibold>
                                Report
                            </Typography>
                        </div>
                    </div>
                    <div>
                        {weeklyReport?.data?.map((report: any) => (
                            <div className="grid grid-cols-2 items-center">
                                <div className="grid grid-cols-2  items-center gap-x-2">
                                    <Typography variant="small">
                                        {moment(report?.startData).format(
                                            'DD MMM YYYY'
                                        )}
                                    </Typography>
                                    <Typography variant="small">
                                        {moment(report?.endDate).format(
                                            'DD MMM YYYY'
                                        )}
                                    </Typography>
                                </div>
                                <div>
                                    <a href={report?.file}>
                                        <ActionButton
                                            simple
                                            variant="link"
                                            Icon={FaCloudDownloadAlt}
                                        >
                                            Download
                                        </ActionButton>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                weeklyReport.isSuccess && (
                    <NoData text="No Weekly Report were found" />
                )
            )}
        </div>
    )
}
