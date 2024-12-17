import { ShowErrorNotifications, Switch, Typography } from '@components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { IndustryApi } from '@queries'
import { getUserCredentials } from '@utils'

export const InsuranceDocCard = ({
    docs,
    industryUserId,
}: {
    docs: any
    industryUserId?: number
}) => {
    const [required, requiredResult] =
        IndustryApi.Insurance.requiredInduranceDoc()

    const { notification } = useNotification()

    const isDocRequired = docs?.industryRequiredDocuments?.[0]?.isRequired

    const onRequiredDocType = async () => {
        const res: any = await required({
            docId: docs?.id,
            userId: industryUserId,
        })

        if (res?.data) {
            notification?.[isDocRequired ? 'error' : 'success']({
                title: `Doc ${isDocRequired ? 'Remove from' : ''} Required`,
                description: `Doc ${
                    isDocRequired ? 'Remove from' : ''
                } Required Successfully`,
            })
        }
    }

    const { role } = getUserCredentials()
    const checkRto = role === UserRoles.RTO

    return (
        <>
            <ShowErrorNotifications result={requiredResult} />
            <div className="border border-gray-100 rounded-md bg-gray-200 p-2">
                <div>
                    <Typography variant="xs" medium color="text-gray-500">
                        Title
                    </Typography>
                    <Typography variant="small">{docs?.title}</Typography>
                </div>
                <div>
                    <Typography variant="xs" medium color="text-gray-500">
                        Required
                    </Typography>
                    <Switch
                        name="required"
                        customStyleClass="profileSwitch"
                        onChange={(e: any) => onRequiredDocType()}
                        loading={requiredResult?.isLoading}
                        disabled={requiredResult?.isLoading || checkRto}
                        defaultChecked={isDocRequired}
                    />
                </div>
            </div>
        </>
    )
}
