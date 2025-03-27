import { useMemo } from 'react'
import { AdminApi } from '@queries'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import { CircularProgress } from '../Common'
import { Typography } from '@components'

export const SubadminDetailProgress = ({
    startDate,
    endDate,
}: {
    startDate: Moment | null
    endDate: Moment | null
}) => {
    const router = useRouter()

    const searchParams = useMemo(() => {
        if (startDate && endDate) {
            return `startDate:${moment(startDate).format(
                'YYYY-MM-DD'
            )},endDate:${moment(endDate).format('YYYY-MM-DD')}`
        }
        return ''
    }, [startDate, endDate])

    const progress = AdminApi.Kpi.subadminProgress(
        {
            id: Number(router?.query?.id),
            search: searchParams,
        },
        {
            skip: !router?.query?.id,
            pollingInterval: 0,
        }
    )
    return (
        <div className="flex items-center gap-2 ">
            <CircularProgress
                loading={progress?.isLoading}
                value={Math.round(Number(progress?.data?.overAll))}
            />
            <Typography variant="label">Efficiency</Typography>
        </div>
    )
}
