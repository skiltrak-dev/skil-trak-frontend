import { Button } from '@components'
import { MetricField } from '@partials/common/kpis'

export const MetricSelector = ({
    removedMetrics,
    selectedMetric,
    onMetricSelect,
    onAddMetric,
}: {
    removedMetrics: MetricField[]
    selectedMetric: string
    onMetricSelect: (id: string) => void
    onAddMetric: () => void
}) => (
    <div className="flex items-center gap-4">
        <div className="w-64 h-10">
            <select
                className="w-full h-full px-2 rounded-lg border border-[#0790F6] focus:outline-none"
                value={selectedMetric}
                onChange={(e) => onMetricSelect(e.target.value)}
                disabled={removedMetrics.length === 0}
            >
                <option value="">Add more</option>
                {removedMetrics.map((metric) => (
                    <option key={metric.id} value={metric.id}>
                        {metric.name}
                    </option>
                ))}
            </select>
        </div>
        {selectedMetric && (
            <Button onClick={onAddMetric} variant="info">
                Add
            </Button>
        )}
    </div>
)
