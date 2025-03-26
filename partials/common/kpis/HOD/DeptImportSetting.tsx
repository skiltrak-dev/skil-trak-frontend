import {
    Card,
    LoadingAnimation,
    NoData,
    ShowErrorNotifications,
} from '@components'
import React, { useEffect, useState } from 'react'
import { MetricInput, MetricSelector, SaveButton } from '../ImportSetting'
import { AdminApi, SubAdminApi } from '@queries'
import { MetricField } from '../types'
import { useNotification } from '@hooks'

export const DeptImportSetting = () => {
    const [editedMetrics, setEditedMetrics] = useState<MetricField[]>([])
    const [hasChanges, setHasChanges] = useState(false)
    const [selectedMetric, setSelectedMetric] = useState('')

    const { notification } = useNotification()

    const itemsList = AdminApi.Kpi.kpiTypes()
    const kpiTargets = SubAdminApi.Kpi.deptKpiTargetList()
    const [saveTarget, saveTargetResult] = SubAdminApi.Kpi.saveDeptKpiTarget()

    useEffect(() => {
        if (kpiTargets?.isSuccess) {
            const metrics = kpiTargets?.data.map((metric: any) => ({
                id: metric?.kpiType?.id,
                targetId: metric?.id,
                value: metric?.value,
                name: metric?.kpiType?.name,
            }))
            setEditedMetrics(metrics)
        }
    }, [kpiTargets])

    const addMoreList = itemsList?.data?.filter((metric: any) =>
        editedMetrics && editedMetrics?.length > 0
            ? !editedMetrics
                  ?.map((metric: any) => metric?.id)
                  ?.includes(metric?.id)
            : metric
    )

    const handleInputChange = (metricId: string, value: string) => {
        const numValue = parseInt(value) || 0

        setEditedMetrics((prev) =>
            prev.map((metric) =>
                metric.id === metricId ? { ...metric, value: numValue } : metric
            )
        )

        setHasChanges(true)
    }

    const handleRemoveMetric = (metricId: string) => {
        setEditedMetrics((prev) =>
            prev?.filter((metric) => metric.id !== metricId)
        )

        setHasChanges(true)
    }
    const handleSave = async () => {
        if (!hasChanges) return

        const res: any = await saveTarget({
            target: editedMetrics?.map((target) => ({
                value: target?.value,
                kpiType: target.id,
            })),
        })

        if (res?.data) {
            notification.success({
                title: 'Success',
                description: 'Kpi Target added successfully',
            })
        }
        // onSave(department.id, editedMetrics)
        setHasChanges(false)
    }

    const handleAddMetric = () => {
        if (!selectedMetric) return

        const addedMetrics = addMoreList?.find(
            (metric: any) => metric.id === Number(selectedMetric)
        )

        setEditedMetrics([...editedMetrics, addedMetrics])

        setSelectedMetric('')
        setHasChanges(true)
    }

    return (
        <Card>
            <ShowErrorNotifications result={saveTargetResult} />
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out`}
            >
                <div className="mx-4 p-4 rounded-lg">
                    <hr />
                    <div className="my-4">
                        {itemsList?.isError || kpiTargets.isError ? (
                            <NoData text="There is Some Technical Error, try reload the page!" />
                        ) : null}
                        <div className="grid grid-cols-2 gap-8">
                            {itemsList?.isLoading || kpiTargets.isLoading ? (
                                <LoadingAnimation size={60} />
                            ) : itemsList?.data &&
                              itemsList?.data?.length > 0 ? (
                                editedMetrics?.map((metric: any) => (
                                    <MetricInput
                                        key={metric.id}
                                        metric={metric}
                                        onValueChange={handleInputChange}
                                        onRemove={handleRemoveMetric}
                                    />
                                ))
                            ) : itemsList?.isSuccess ? (
                                <NoData text="" />
                            ) : null}

                            {addMoreList?.length > 0 && (
                                <MetricSelector
                                    removedMetrics={addMoreList}
                                    selectedMetric={selectedMetric}
                                    onMetricSelect={setSelectedMetric}
                                    onAddMetric={handleAddMetric}
                                />
                            )}
                        </div>

                        <div className="flex justify-end mt-4">
                            <SaveButton
                                hasChanges={hasChanges}
                                onSave={handleSave}
                                result={saveTargetResult}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
