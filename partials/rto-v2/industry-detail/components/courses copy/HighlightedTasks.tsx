import { Zap, ChevronRight, CheckCircle, Mail, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@components'
import { useNotification } from '@hooks'

export interface HighlightedTask {
    id: number
    description: string
    confirmationMethod: 'industry' | 'sourcing' | 'direct'
    confirmed: boolean
    confirmedBy?: string
    confirmedAt?: string
}

interface HighlightedTasksProps {
    tasks: HighlightedTask[]
    onConfirmTask: (
        taskId: number,
        method: 'industry' | 'sourcing' | 'direct'
    ) => void
}

export function HighlightedTasks({
    tasks,
    onConfirmTask,
}: HighlightedTasksProps) {
    const [expandedTask, setExpandedTask] = useState<number | null>(null)
    const { notification } = useNotification()
    if (!tasks || tasks.length === 0) return null

    const handleConfirmTask = (
        taskId: number,
        method: 'industry' | 'sourcing' | 'direct'
    ) => {
        onConfirmTask(taskId, method)
        setExpandedTask(null)

        const methodLabel =
            method === 'industry'
                ? 'Industry Email'
                : method === 'sourcing'
                ? 'Sourcing Team'
                : 'Workplace'

        notification.success({
            title: 'Task Confirmed',
            description: `Task confirmed via ${methodLabel}`,
        })
    }

    const getConfirmationMethodLabel = (
        method: 'industry' | 'sourcing' | 'direct'
    ) => {
        switch (method) {
            case 'industry':
                return 'Confirm via Industry Email'
            case 'sourcing':
                return 'Confirm via Sourcing Team'
            case 'direct':
                return 'Confirm with Workplace'
        }
    }

    const getConfirmationMethodIcon = (
        method: 'industry' | 'sourcing' | 'direct'
    ) => {
        switch (method) {
            case 'industry':
                return Mail
            case 'sourcing':
                return Users
            case 'direct':
                return CheckCircle
        }
    }

    return (
        <div className="rounded-xl overflow-hidden shadow-sm border border-[#E2E8F0]">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#F7A619] to-[#F9B84A] px-4 py-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-white" fill="white" />
                <h4 className="font-bold text-white">Highlighted Tasks</h4>
            </div>

            {/* Tasks List */}
            <div className="bg-white">
                {tasks.map((task, index) => (
                    <div
                        key={task.id}
                        className={`${
                            index !== tasks.length - 1
                                ? 'border-b border-[#E2E8F0]'
                                : ''
                        }`}
                    >
                        {/* Task Item */}
                        <div className="p-4 hover:bg-[#FAFBFC] transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    {task.confirmed ? (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-5 h-5 rounded-full bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] flex items-center justify-center"
                                        >
                                            <CheckCircle className="w-3.5 h-3.5 text-[#065F46]" />
                                        </motion.div>
                                    ) : (
                                        <ChevronRight className="w-5 h-5 text-[#F7A619]" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p
                                        className={`text-sm ${
                                            task.confirmed
                                                ? 'text-[#64748B] line-through'
                                                : 'text-[#1A2332]'
                                        }`}
                                    >
                                        {task.description}
                                    </p>

                                    {task.confirmed ? (
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-xs text-[#065F46] font-medium">
                                                ✓ Confirmed by{' '}
                                                {task.confirmedBy}
                                            </span>
                                            {task.confirmedAt && (
                                                <span className="text-xs text-[#64748B]">
                                                    • {task.confirmedAt}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="mt-3">
                                            {expandedTask === task.id ? (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        height: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        height: 'auto',
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        height: 0,
                                                    }}
                                                    className="space-y-2"
                                                >
                                                    {/* Industry Email Confirmation */}
                                                    <Button
                                                        onClick={() =>
                                                            handleConfirmTask(
                                                                task.id,
                                                                'industry'
                                                            )
                                                        }
                                                        variant="primaryNew"
                                                        outline
                                                        className="w-full justify-start gap-2 h-auto py-2 px-3 bg-white hover:bg-[#E8F4F8] border-[#E2E8F0] text-[#044866] text-xs"
                                                    >
                                                        <Mail className="w-3.5 h-3.5" />
                                                        <span>
                                                            Confirm via Industry
                                                            Email
                                                        </span>
                                                    </Button>

                                                    {/* Sourcing Team Confirmation */}
                                                    <Button
                                                        onClick={() =>
                                                            handleConfirmTask(
                                                                task.id,
                                                                'sourcing'
                                                            )
                                                        }
                                                        variant="primaryNew"
                                                        outline
                                                        className="w-full justify-start gap-2 h-auto py-2 px-3 bg-white hover:bg-[#E8F4F8] border-[#E2E8F0] text-[#044866] text-xs"
                                                    >
                                                        <Users className="w-3.5 h-3.5" />
                                                        <span>
                                                            Confirm via Sourcing
                                                            Team
                                                        </span>
                                                    </Button>

                                                    {/* Direct Workplace Confirmation */}
                                                    <Button
                                                        onClick={() =>
                                                            handleConfirmTask(
                                                                task.id,
                                                                'direct'
                                                            )
                                                        }
                                                        variant="primaryNew"
                                                        outline
                                                        className="w-full justify-start gap-2 h-auto py-2 px-3 bg-white hover:bg-[#E8F4F8] border-[#E2E8F0] text-[#044866] text-xs"
                                                    >
                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                        <span>
                                                            Confirm with
                                                            Workplace
                                                        </span>
                                                    </Button>

                                                    {/* Cancel */}
                                                    <button
                                                        onClick={() =>
                                                            setExpandedTask(
                                                                null
                                                            )
                                                        }
                                                        className="w-full text-xs text-[#64748B] hover:text-[#1A2332] py-1 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </motion.div>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        setExpandedTask(task.id)
                                                    }
                                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-[#FEF3C7] border border-[#F7A619]/30 rounded-lg text-[#F7A619] text-xs font-medium transition-all hover:shadow-sm"
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                    <span>Confirm Task</span>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
