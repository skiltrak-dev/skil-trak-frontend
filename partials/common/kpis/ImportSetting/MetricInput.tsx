import { MetricField } from '@partials/common/kpis'
import { IoMdRemoveCircle } from 'react-icons/io'
import { AdminApi } from '@queries'
import { LoadingAnimation, ShowErrorNotifications } from '@components'

export const MetricInput = ({
    metric,
    onValueChange,
    onRemove,
}: {
    metric: MetricField
    onValueChange: (id: string, value: string) => void
    onRemove: (id: string) => void
}) => {
    const [remove, removeResult] = AdminApi.Kpi.removeTarget()

    const onRemoveTarget = () => {
        if (metric?.targetId) {
            remove(metric?.targetId)
        }
        onRemove(metric.id)
    }
    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <div className="flex items-center gap-4">
                <div className="w-12 h-10 flex items-center justify-center bg-white">
                    <input
                        type="number"
                        className="w-full h-full text-center outline-none border rounded-lg border-[#0790F6]"
                        value={metric.value}
                        onChange={(e) =>
                            onValueChange(metric.id, e.target.value)
                        }
                        min={0}
                    />
                </div>
                <span className={metric.color}>{metric.name}</span>
                <div className="ml-auto mr-9">
                    {removeResult?.isLoading ? (
                        <div className="bg-red-400 rounded-full">
                            <LoadingAnimation size={25} />
                        </div>
                    ) : (
                        <IoMdRemoveCircle
                            className="text-[#FF0303] text-3xl cursor-pointer"
                            onClick={() => onRemoveTarget()}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
