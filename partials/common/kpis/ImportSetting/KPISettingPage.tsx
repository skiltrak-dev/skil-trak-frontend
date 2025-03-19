'use client'
import { useState } from 'react'
import { AdminApi } from '@queries'
import { RiUserLine } from 'react-icons/ri'
import { DepartmentItem } from './DepartmentItem'
import { DepartmentData, MetricField } from '@partials/common/kpis'
import { LoadingAnimation, NoData, TechnicalError } from '@components'

export const KPISettingPage = () => {
    const [openDepartment, setOpenDepartment] = useState<number | null>(null)

    const kpiDetList = AdminApi.Kpi.kpiDeptList()

    const initialMetrics: MetricField[] = [
        {
            id: 'appointment',
            name: 'Appointment',
            value: 15,
            color: 'text-blue-600',
            isActive: true,
        },
        {
            id: 'completed',
            name: 'Completed',
            value: 15,
            color: 'text-red-500',
            isActive: true,
        },
        {
            id: 'workplaceRequest',
            name: 'Workplace request',
            value: 15,
            color: 'text-yellow-500',
            isActive: true,
        },
        {
            id: 'workplaceAgreement',
            name: 'Agreement by workplace Generated request',
            value: 15,
            color: 'text-green-600',
            isActive: true,
        },
        {
            id: 'agreementRequest',
            name: 'Agreement by student provided workplace',
            value: 15,
            color: 'text-green-500',
            isActive: true,
        },
    ]

    const [departments, setDepartments] = useState<DepartmentData[]>([
        {
            id: 1,
            icon: <RiUserLine className="text-[#1436B0] text-base" />,
            title: 'Department of Health',
            metrics: [...initialMetrics],
        },
        {
            id: 2,
            icon: <RiUserLine className="text-[#1436B0] text-base" />,
            title: 'Department of Care',
            metrics: [...initialMetrics],
        },
        {
            id: 3,
            icon: <RiUserLine className="text-[#1436B0] text-base" />,
            title: 'Department of B2C',
            metrics: [...initialMetrics],
        },
    ])

    const toggleDepartment = (id: number) => {
        setOpenDepartment((prev) => (prev === id ? null : id))
    }

    const isDepartmentOpen = (id: number) => {
        return openDepartment === id
    }

    const handleSaveDepartment = (
        deptId: number,
        updatedMetrics: MetricField[]
    ) => {
        setDepartments((prevDepts) =>
            prevDepts.map((dept) => {
                if (dept.id === deptId) {
                    return {
                        ...dept,
                        metrics: updatedMetrics,
                    }
                }
                return dept
            })
        )
    }

    return (
        <div className="flex flex-col gap-4 m-4 py-2 rounded-lg bg-[#F8FCFF] shadow-md">
            <div>
                {kpiDetList?.isError ? (
                    <NoData text="There is some technical issue" />
                ) : null}
                {kpiDetList?.isLoading ? (
                    <LoadingAnimation size={75} />
                ) : kpiDetList?.data && kpiDetList?.data?.length > 0 ? (
                    kpiDetList?.data?.map((item: any) => (
                        <DepartmentItem
                            key={item.id}
                            department={{
                                ...item,
                                metrics: [...initialMetrics],
                            }}
                            isOpen={isDepartmentOpen(item.id)}
                            onToggle={() => toggleDepartment(item.id)}
                            onSave={handleSaveDepartment}
                        />
                    ))
                ) : kpiDetList?.isSuccess ? (
                    <NoData text="There is no departments!" />
                ) : null}
            </div>
        </div>
    )
}
