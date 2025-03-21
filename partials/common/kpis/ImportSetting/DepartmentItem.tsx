'use client'

import { LoadingAnimation, NoData, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { DepartmentItemProps, MetricField } from '@partials/common/kpis'
import { AdminApi } from '@queries'
import { useEffect, useState } from 'react'
import { DepartmentHeader } from './DepartmentHeader'
import { MetricInput } from './MetricInput'
import { MetricSelector } from './MetricSelector'
import { SaveButton } from './SaveButton'

export const DepartmentItem = ({
    department,
    isOpen,
    onToggle,
}: DepartmentItemProps) => {
    const [editedMetrics, setEditedMetrics] = useState<MetricField[]>([])

    const [hasChanges, setHasChanges] = useState(false)
    const [selectedMetric, setSelectedMetric] = useState('')

    const activeMetrics = editedMetrics.filter((m) => m)
    const removedMetrics = editedMetrics.filter((m) => !m.isActive)

    const itemsList = AdminApi.Kpi.kpiTypes()
    const kpiTargets = AdminApi.Kpi.kpiTargetsList(Number(department.id), {
        skip: !department || !isOpen,
    })
    const [saveTarget, saveTargetResult] = AdminApi.Kpi.addKpiTarget()

    const { notification } = useNotification()

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
        // setNewLyAddedMetrics((prev) =>
        //     prev.map((metric) =>
        //         metric.id === metricId ? { ...metric, value: numValue } : metric
        //     )
        // )

        setHasChanges(true)
    }

    const handleRemoveMetric = (metricId: string) => {
        setEditedMetrics((prev) =>
            prev?.filter((metric) => metric.id !== metricId)
        )

        setHasChanges(true)
    }

    const handleAddMetric = () => {
        if (!selectedMetric) return

        const addedMetrics = addMoreList?.find(
            (metric: any) => metric.id === Number(selectedMetric)
        )

        setEditedMetrics([...editedMetrics, addedMetrics])

        // setEditedMetrics((prev) =>
        //     prev.map((metric) =>
        //         metric.id === selectedMetric
        //             ? { ...metric, isActive: true }
        //             : metric
        //     )
        // )

        setSelectedMetric('')
        setHasChanges(true)
    }

    const handleSave = async () => {
        if (!hasChanges) return

        const res: any = await saveTarget({
            target: editedMetrics?.map((target) => ({
                value: target?.value,
                kpiType: target.id,
                department: department.id,
            })),
        })

        if (res?.data) {
            notification.success({
                title: 'Success',
                description: 'Kpi Target added successfully',
            })
        }
        // onSave(department.id, editedMetrics)
        // setHasChanges(false)
    }

    console.log({ editedMetrics })

    return (
        <div>
            <ShowErrorNotifications result={saveTargetResult} />
            <DepartmentHeader
                department={department}
                isOpen={isOpen}
                onToggle={onToggle}
                activeMetrics={editedMetrics}
            />

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="mx-4 p-4 rounded-lg">
                    <hr />
                    <div className="my-4">
                        <div className="grid grid-cols-2 gap-8">
                            {itemsList?.isLoading ? (
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

            <hr />
        </div>
    )
}
