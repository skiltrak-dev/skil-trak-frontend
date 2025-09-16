import React, { useEffect } from 'react'
import { WorkplaceContextType } from './useWorkplace.hook'
import { useNotification } from '@hooks'

export const useShowQueryMessages = ({
    queriesActions,
    setAutoApplyLoader,
}: {
    queriesActions: any
    setAutoApplyLoader: any
}) => {
    const { notification } = useNotification()
    useEffect(() => {
        if (queriesActions?.refreshResult?.isSuccess) {
            setTimeout(() => {
                setAutoApplyLoader(false)
                notification.success({
                    title: `Automation Refreshed`,
                    description: `Automation Refreshed.`,
                })
            }, 10000)
        }
    }, [queriesActions?.refreshResult])

    useEffect(() => {
        if (queriesActions?.skipWorkplaceResult?.isSuccess) {
            setTimeout(() => {
                setAutoApplyLoader(false)
                notification.warning({
                    title: `Workplace Industry Skipped`,
                    description: `Workplace Industry Skipped Successfully!`,
                })
            }, 10000)
        }
    }, [queriesActions?.skipWorkplaceResult])

    useEffect(() => {
        if (queriesActions?.skipWpResult?.isSuccess) {
            setTimeout(() => {
                setAutoApplyLoader(false)
                notification.warning({
                    title: `Workplace Industry Skipped`,
                    description: `Workplace Industry Skipped Successfully!`,
                })
            }, 10000)
        }
    }, [queriesActions?.skipWpResult])
}
