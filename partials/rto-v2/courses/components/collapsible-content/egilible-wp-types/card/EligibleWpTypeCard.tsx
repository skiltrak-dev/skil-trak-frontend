import { Badge, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { WorkplaceTypes } from '@types'
import { LoaderPinwheel, X } from 'lucide-react'

export const EligibleWpTypeCard = ({
    type,
    courseId,
}: {
    courseId: number
    type: WorkplaceTypes
}) => {
    const [remove, removeResult] = CommonApi.Rtos.removeRtoWpType()

    const { notification } = useNotification()

    const onRemove = async () => {
        const res: any = await remove({
            courseId,
            wpTypeId: type?.workplaceType?.id,
        })

        if (res?.data) {
            notification.error({
                title: 'Workplace type Removed',
                description: 'Workplace type removed successfully',
            })
        }
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <div className="flex items-center gap-x-1 rounded-full border border-success px-2">
                <Badge
                    text={type?.workplaceType?.name}
                    variant="success"
                    className="!bg-transparent"
                />

                <button
                    onClick={onRemove}
                    className="hover:bg-success/20 rounded-full p-0.5 transition-colors"
                >
                    {removeResult?.isLoading ? (
                        <LoaderPinwheel className="h-3.5 w-3.5 text-error-dark animate-spin" />
                    ) : (
                        <X className="h-3.5 w-3.5 text-error-dark" />
                    )}
                </button>
            </div>
        </>
    )
}
