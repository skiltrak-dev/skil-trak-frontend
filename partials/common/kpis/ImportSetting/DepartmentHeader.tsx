import { FaChevronUp, FaChevronDown } from 'react-icons/fa6'
import { DepartmentData, MetricField } from '@partials/common/kpis'
import { RiUserLine } from 'react-icons/ri'

export const DepartmentHeader = ({
    department,
    isOpen,
    onToggle,
    activeMetrics,
}: {
    department: any
    isOpen: boolean
    onToggle: () => void
    activeMetrics: MetricField[]
}) => (
    <div className="grid grid-cols-3 m-4">
        <div className="flex items-center justify-start">
            <div className="p-2 m-2 border border-[#1436B033] rounded-lg">
                <RiUserLine className="text-[#1436B0] text-base" />
            </div>
            <h2 className="ml-3 text-base font-medium">{department?.name}</h2>
        </div>
        <div className="flex gap-8 items-center justify-end">
            {activeMetrics.map((metric) => (
                <span key={metric.id}>{metric.value}</span>
            ))}
        </div>
        <div
            className="flex justify-end items-center cursor-pointer"
            onClick={onToggle}
        >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
    </div>
)
