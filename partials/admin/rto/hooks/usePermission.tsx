import { useNotification } from '@hooks'
import { Rto } from '@types'
import { usePermissionQueries } from './usePermissionQueries'

export const usePermission = () => {
    const { notification } = useNotification()

    const { queries, results } = usePermissionQueries()

    const onAllowLogbookClicked = async (item: Rto) => {
        const res: any = await queries.releaseLogbook(item?.id)
        if (res?.data) {
            notification.success({
                title: `Release Logbook Status Changed`,
                description: `Release Logbook Status Changed Successfully`,
            })
        }
    }

    const onAllWpRequest = async (item: Rto) => {
        const res: any = await queries.rtoWpApprovalRequest(item?.id)
        if (res?.data) {
            notification.success({
                title: `Workplace Approval Status Changed`,
                description: `Workplace Approval Status Changed Successfully`,
            })
        }
    }

    const onAllowUpdateClicked = (rto: Rto) => {
        queries.allowUpdation(rto?.id).then((res: any) => {
            if (res?.data) {
                rto?.allowUpdate
                    ? notification.message({
                          title: `Revoked`,
                          description: `Revoked permission to update the timestamp.`,
                      })
                    : notification.success({
                          title: 'Granted',
                          description:
                              'Granted permission to update the timestamp.',
                      })
            }
        })
    }

    const onAllowAutoCompleteClicked = (rto: Rto) => {
        queries.allowAutoUpdate(rto?.id).then((res: any) => {
            if (res?.data) {
                notification?.[rto?.allowAutoComplete ? 'error' : 'success']({
                    title: rto?.allowAutoComplete
                        ? 'Removed Auto Complete'
                        : `Allowed Auto Complete`,
                    description: rto?.allowAutoComplete
                        ? 'Removed Auto Complete'
                        : `Allowed Auto Complete`,
                })
            }
        })
    }

    const onAllowPermissionClicked = (
        rto: Rto,
        allowPartialSubmission: boolean
    ) => {
        queries
            .allowPermissions({
                id: rto?.id,
                allowPartialSubmission,
            })
            .then((res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Partial Submission Accessed Changed',
                        description: 'Partial Submission Accessed Changed',
                    })
                }
            })
    }

    return {
        results,
        Actions: {
            onAllWpRequest,
            onAllowLogbookClicked,
            onAllowUpdateClicked,
            onAllowPermissionClicked,
            onAllowAutoCompleteClicked,
        },
    }
}
