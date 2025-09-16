import { useShowErrorNotification } from '@components'
import { useNotification } from '@hooks'
import { useEffect } from 'react'

export const useShowQueryMessages = ({
    queriesActions,
    setAutoApplyLoader,
}: {
    queriesActions: any
    setAutoApplyLoader: any
}) => {
    const { notification } = useNotification()

    const showErrorNotifications = useShowErrorNotification()
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
        if (queriesActions?.refreshResult?.isError) {
            setAutoApplyLoader(false)
            showErrorNotifications({
                result: queriesActions?.refreshResult,
            })
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
        if (queriesActions?.skipWorkplaceResult?.isError) {
            setAutoApplyLoader(false)
            showErrorNotifications({
                result: queriesActions?.skipWorkplaceResult,
            })
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
        if (queriesActions?.skipWpResult?.isError) {
            setAutoApplyLoader(false)
            showErrorNotifications({
                result: queriesActions?.skipWpResult,
            })
        }
    }, [queriesActions?.skipWpResult])
}
