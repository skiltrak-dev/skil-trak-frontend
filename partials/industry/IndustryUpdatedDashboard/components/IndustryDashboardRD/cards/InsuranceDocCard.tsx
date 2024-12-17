import { ShowErrorNotifications, Switch, Typography } from '@components'
import { useNotification } from '@hooks'
import { IndustryApi } from '@queries'

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
                        disabled={requiredResult?.isLoading}
                        defaultChecked={isDocRequired}
                    />
                </div>
            </div>
        </>
    )
}
